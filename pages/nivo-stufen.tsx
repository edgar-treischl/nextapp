'use client'

import Link from 'next/link'
import { useState } from 'react'
import NivoStackedFacetBarChart, {
  type CompetencyDistributionDatum,
} from '@/components/NivoStackedFacetBarChart'

const stufeOrder = [
  'Stufe Ia',
  'Stufe Ib',
  'Stufe II',
  'Stufe III',
  'Stufe IV',
  'Stufe V',
  'Stufe VI',
  'Stufe VII',
]

const colors = {
  'Stufe Ia': '#01665e',
  'Stufe Ib': '#35978f',
  'Stufe II': '#80cdc1',
  'Stufe III': '#c7eae5',
  'Stufe IV': '#f6e8c3',
  'Stufe V': '#dfc27d',
  'Stufe VI': '#bf812d',
  'Stufe VII': '#8c510a',
}

const labelColors = {
  'Stufe Ia': '#ffffff',
  'Stufe Ib': '#ffffff',
  'Stufe II': '#ffffff',
  'Stufe III': '#737373',
  'Stufe IV': '#737373',
  'Stufe V': '#ffffff',
  'Stufe VI': '#ffffff',
  'Stufe VII': '#ffffff',
}

const data: CompetencyDistributionDatum[] = [
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe Ia', value: 4 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe Ib', value: 7 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe II', value: 12 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe III', value: 18 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe IV', value: 20 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe V', value: 16 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe VI', value: 13 },
  { bereich: 'Schulart', teilpop: 'Alle Schulen', stufe: 'Stufe VII', value: 10 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe Ia', value: 1 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe Ib', value: 3 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe II', value: 7 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe III', value: 12 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe IV', value: 18 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe V', value: 20 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe VI', value: 21 },
  { bereich: 'Schulart', teilpop: 'Gymnasium', stufe: 'Stufe VII', value: 18 },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe Ia',
    value: 9,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe Ib',
    value: 14,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe II',
    value: 18,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe III',
    value: 19,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe IV',
    value: 16,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe V',
    value: 12,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe VI',
    value: 8,
  },
  {
    bereich: 'Schulart',
    teilpop: 'Nichtgymnasiale Schularten',
    stufe: 'Stufe VII',
    value: 4,
  }
]

const codeString = `import NivoStackedFacetBarChart from '@/components/NivoStackedFacetBarChart'

<NivoStackedFacetBarChart
  data={data}
  stufeOrder={stufeOrder}
  colors={colors}
  labelColors={labelColors}
  minLabelValue={0.07}
  title="Abbildung X"
  subtitle="Kompetenzstufenverteilung XX"
  caption={'Anmerkung: Werte kleiner 7 % werden in der Grafik nicht ausgewiesen.\\nQuelle:'}
/>`

export default function NivoStufenPage() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nivo Stacked Bar Chart</h1>
        <p className="text-gray-600 mb-6">
          Stacked facet bar chart showing competency distribution
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2">
            <NivoStackedFacetBarChart
              data={data}
              stufeOrder={stufeOrder}
              colors={colors}
              labelColors={labelColors}
              minLabelValue={0.07}
              title="Fake Kompetenzstufenverteilung"
              caption={
                'Anmerkung: Werte kleiner 7 % werden in der Grafik nicht ausgewiesen.\nQuelle: '
              }
            />
          </div>

          {/* Code Section - Takes up 1/3 of the space */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Example Code</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-xs">
              <code>{codeString}</code>
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .bg-white {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
