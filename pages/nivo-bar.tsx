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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nivo Bar Chart</h1>
        <p className="text-gray-600 mb-6">
          Interactive bar chart with hover effects using Nivo
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Monthly Sales Data</h2>
            <div style={{ height: 500 }}>
              <ResponsiveBar
                data={data}
                keys={['sales']}
                indexBy="month"
                margin={{ top: 50, right: 40, bottom: 60, left: 60 }}
                padding={0.2}
                colors={({ id, data: d }) =>
                  hoveredMonth === d.month ? '#052784ff' : '#3B82F6'
                }
                borderRadius={3}
                enableLabel={true}
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
              <code>{chartCode}</code>
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
