'use client'

import { useState } from 'react'
import { ResponsiveTreeMap } from '@nivo/treemap'
import Link from 'next/link'

export default function TreeMapExamplePage() {
  // TreeMap example data
  const treeMapData = {
    name: 'root',
    children: [
      { name: 'A', loc: 400 },
      { name: 'B', loc: 300 },
      { name: 'C', loc: 300 },
      { name: 'D', loc: 200 },
      { name: 'E', loc: 278 },
      { name: 'F', loc: 189 },
    ],
  }

  const codeString = `import { ResponsiveTreeMap } from '@nivo/treemap'

<ResponsiveTreeMap
  data={treeMapData}
  identity="name"
  value="loc"
  valueFormat=".02s"
  margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
  labelSkipSize={12}
  labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
  parentLabelPosition="left"
  parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
  borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
/>`.trim()

  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Nivo TreeMap</h1>
        <p className="text-gray-600 mb-6">
          Hierarchical data visualization with Nivo TreeMap
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Distribution</h2>
            <div style={{ height: 500 }}>
              <ResponsiveTreeMap
                data={treeMapData}
                identity="name"
                value="loc"
                valueFormat=".02s"
                margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                labelSkipSize={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                parentLabelPosition="left"
                parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
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
