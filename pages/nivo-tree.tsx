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
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">Nivo TreeMap Example</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: TreeMap plot */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div style={{ height: 400 }}>
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

        {/* Right: Code block with copy button */}
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
          <h3 className="text-xl font-semibold mb-4">Code Example</h3>
          <pre className="text-sm text-gray-800 whitespace-pre">
            <code>{codeString}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Tailwind custom fade animation */}
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
