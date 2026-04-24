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
    <section className="container mx-auto px-6 py-20">
      <h2 className="mb-12 text-center text-4xl font-bold">Stacked Facet Bar</h2>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
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

        <div className="relative overflow-x-auto rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
          <button
            onClick={copyToClipboard}
            className="absolute right-4 top-4 rounded bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
          >
            Copy
          </button>
          {copied ? (
            <span className="absolute right-20 top-4 rounded bg-green-500 px-3 py-1 text-sm text-white animate-fade">
              Copied!
            </span>
          ) : null}

          <h3 className="mb-4 text-xl font-semibold">Code Example (Nivo)</h3>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            <code>{codeString}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      <style jsx>{`
        @keyframes fade {
          0% { opacity: 0; transform: translateY(-5px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-5px); }
        }
        .animate-fade {
          animation: fade 2s ease-in-out forwards;
        }
      `}</style>
    </section>
  )
}
