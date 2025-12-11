'use client'

import { useState } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import Link from 'next/link'

export default function NivoInteractiveChart() {
  const data = [
    { month: 'January', sales: 12 },
    { month: 'February', sales: 19 },
    { month: 'March', sales: 3 },
    { month: 'April', sales: 5 },
    { month: 'May', sales: 2 },
    { month: 'June', sales: 3 },
  ]

  // Track hovered bar
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null)

  const chartCode = `// Example code not including hover logic
<ResponsiveBar
  data={data}
  keys={['sales']}
  indexBy="month"
  colors={({ data }) => '#3B82F6'}
  tooltip={({ id, value, indexValue }) => \`\${id} in \${indexValue}: \${value}\`}
/>`.trim()

  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(chartCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Interactive Nivo Bar Chart with Hover
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Chart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div style={{ height: 400 }}>
            <ResponsiveBar
              data={data}
              keys={['sales']}
              indexBy="month"
              margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
              padding={0.2}
              colors={({ id, data: d }) =>
                hoveredMonth === d.month ? '#052784ff' : '#3B82F6' // darker on hover
              }
              borderRadius={3}
              enableLabel={true}
              /*labelTextColor={{ from: 'color', modifiers: [['brighter', 3]] }} // or white */
              labelTextColor="#fff"
              animate={true}
              motionConfig="gentle"
              onMouseEnter={(bar) => setHoveredMonth(bar.data.month)}
              onMouseLeave={() => setHoveredMonth(null)}
              tooltip={({ id, value, indexValue }) => (
                <div
                  style={{
                    padding: '6px 12px',
                    background: '#fff',
                    color: '#000',
                    borderRadius: 4,
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',        
                  }}
                >
                  {id} in {indexValue}: {value}
                </div>
              )}
              axisBottom={{
                tickRotation: -30,
                legend: 'Month',
                legendOffset: 40,
              }}
              axisLeft={{
                legend: 'Sales',
                legendOffset: -50,
              }}
              theme={{
                axis: {
                  ticks: { text: { fontSize: 12 } },
                  legend: { text: { fontSize: 14 } },
                },
              }}
            />
          </div>
        </div>

        {/* Code panel */}
        <div className="relative bg-white p-6 rounded-xl shadow hover:shadow-lg transition overflow-x-auto">
          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
          >
            Copy
          </button>
          {copied && (
            <span className="absolute top-4 right-20 bg-green-500 text-white px-3 py-1 rounded text-sm animate-fade">
              Copied!
            </span>
          )}
          <h3 className="text-xl font-semibold mb-4">Code Example (Nivo)</h3>
          <pre className="text-sm text-gray-800 whitespace-pre">
            <code>{chartCode}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Tailwind fade animation */}
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
