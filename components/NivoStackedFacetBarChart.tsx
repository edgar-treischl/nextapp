'use client'

import { ResponsiveBar, type BarCustomLayerProps, type BarDatum } from '@nivo/bar'

export type CompetencyDistributionDatum = {
  bereich: string
  teilpop: string
  stufe: string
  value: number
  label?: string
}

type FacetRow = BarDatum & {
  teilpop: string
}

type NivoStackedFacetBarChartProps = {
  data: CompetencyDistributionDatum[]
  stufeOrder: string[]
  colors: Record<string, string>
  labelColors?: Record<string, string>
  title: string
  subtitle?: string
  caption?: string
  minLabelValue?: number
  legendReverse?: boolean
}

const percentFormatter = new Intl.NumberFormat('de-DE', {
  style: 'percent',
  maximumFractionDigits: 0,
})

const defaultLabelColor = '#111827'

function formatPercent(value: number) {
  return percentFormatter.format(value)
}

function buildFacetRows(
  data: CompetencyDistributionDatum[],
  stufeOrder: string[],
  labelColors: Record<string, string>,
  minLabelValue: number
) {
  const groupedByBereich = new Map<string, Map<string, CompetencyDistributionDatum[]>>()

  data.forEach((entry) => {
    const byTeilpop = groupedByBereich.get(entry.bereich) ?? new Map<string, CompetencyDistributionDatum[]>()
    const entries = byTeilpop.get(entry.teilpop) ?? []

    entries.push(entry)
    byTeilpop.set(entry.teilpop, entries)
    groupedByBereich.set(entry.bereich, byTeilpop)
  })

  return Array.from(groupedByBereich.entries()).map(([bereich, byTeilpop]) => {
    const rows: FacetRow[] = Array.from(byTeilpop.entries()).map(([teilpop, entries]) => {
      const total = entries.reduce((sum, entry) => sum + entry.value, 0)
      const row: FacetRow = { teilpop }

      stufeOrder.forEach((stufe) => {
        const entry = entries.find((candidate) => candidate.stufe === stufe)
        const share = entry && total > 0 ? entry.value / total : 0

        row[stufe] = share
        row[`__label_${stufe}`] =
          entry && share >= minLabelValue ? entry.label ?? formatPercent(share) : ''
        row[`__textColor_${stufe}`] = labelColors[stufe] ?? defaultLabelColor
      })

      return row
    })

    return { bereich, rows }
  })
}

function SegmentLabels({ bars }: BarCustomLayerProps<FacetRow>) {
  return (
    <g aria-hidden="true">
      {bars.map((bar) => {
        const key = String(bar.data.id)
        const row = bar.data.data
        const label = String(row[`__label_${key}`] ?? '')

        if (!label || bar.width < 34 || bar.height < 18) {
          return null
        }

        return (
          <text
            key={bar.key}
            x={bar.x + bar.width / 2}
            y={bar.y + bar.height / 2}
            fill={String(row[`__textColor_${key}`] ?? defaultLabelColor)}
            fontSize={11}
            fontWeight={600}
            textAnchor="middle"
            dominantBaseline="central"
            pointerEvents="none"
          >
            {label}
          </text>
        )
      })}
    </g>
  )
}

export default function NivoStackedFacetBarChart({
  data,
  stufeOrder,
  colors,
  labelColors = {},
  title,
  subtitle,
  caption,
  minLabelValue = 0.07,
  legendReverse = true,
}: NivoStackedFacetBarChartProps) {
  const facets = buildFacetRows(data, stufeOrder, labelColors, minLabelValue)
  const legendItems = legendReverse ? [...stufeOrder].reverse() : stufeOrder

  return (
    <section className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-gray-600">{subtitle}</p> : null}
      </header>

      <div className="space-y-8">
        {facets.map(({ bereich, rows }, facetIndex) => (
          <div key={bereich}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {bereich}
            </h3>
            <div style={{ height: Math.max(160, rows.length * 72) }}>
              <ResponsiveBar<FacetRow>
                data={rows}
                keys={stufeOrder}
                indexBy="teilpop"
                layout="horizontal"
                groupMode="stacked"
                valueScale={{ type: 'linear', min: 0, max: 1 }}
                indexScale={{ type: 'band', round: true }}
                margin={{ top: 8, right: 16, bottom: 52, left: 160 }}
                padding={0.28}
                innerPadding={0}
                colors={({ id }) => colors[String(id)] ?? '#9ca3af'}
                borderColor={{ from: 'color', modifiers: [['darker', 0.18]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickValues: [0, 0.25, 0.5, 0.75, 1],
                  format: (value) => formatPercent(Number(value)),
                  legend: facetIndex === facets.length - 1 ? 'Anteil in %' : undefined,
                  legendPosition: 'middle',
                  legendOffset: 38,
                }}
                axisLeft={{
                  tickSize: 0,
                  tickPadding: 12,
                }}
                enableGridX
                enableGridY={false}
                enableLabel={false}
                animate={false}
                layers={['grid', 'axes', 'bars', SegmentLabels]}
                tooltip={({ color, id, indexValue, value }) => (
                  <div className="rounded border border-gray-200 bg-white px-3 py-2 text-sm shadow">
                    <div className="font-semibold text-gray-900">{indexValue}</div>
                    <div className="mt-1 flex items-center gap-2 text-gray-700">
                      <span
                        className="inline-block h-3 w-3 rounded-sm"
                        style={{ backgroundColor: color }}
                      />
                      <span>
                        {String(id)}: {formatPercent(Number(value ?? 0))}
                      </span>
                    </div>
                  </div>
                )}
                theme={{
                  axis: {
                    ticks: { text: { fontSize: 12, fill: '#374151' } },
                    legend: { text: { fontSize: 13, fill: '#111827' } },
                  },
                  grid: {
                    line: { stroke: '#d1d5db', strokeDasharray: '4 4' },
                  },
                }}
                role="img"
                ariaLabel={`${title} - ${bereich}`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-700">
        {legendItems.map((stufe) => (
          <div key={stufe} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: colors[stufe] ?? '#9ca3af' }}
            />
            <span>{stufe}</span>
          </div>
        ))}
      </div>

      {caption ? (
        <p className="mt-6 whitespace-pre-line text-xs leading-5 text-gray-500">{caption}</p>
      ) : null}
    </section>
  )
}
