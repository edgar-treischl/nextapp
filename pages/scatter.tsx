import { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend)

export default function ScatterPage() {
  const [data, setData] = useState({
    datasets: [
      {
        label: 'Dataset 1',
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
          { x: 25, y: 35 },
          { x: 30, y: 40 },
          { x: 35, y: 45 },
        ],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Scatter Plot Example' },
    },
  }

  const codeString = `const data = {
  datasets: [{
    label: 'Dataset 1',
    data: [
      { x: 10, y: 20 },
      { x: 15, y: 25 },
      { x: 20, y: 30 },
      { x: 25, y: 35 },
      { x: 30, y: 40 },
      { x: 35, y: 45 }
    ],
    backgroundColor: 'rgba(37, 99, 235, 0.7)'
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Scatter Plot Example' }
  }
};

<Scatter data={data} options={options} />;`

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // hide message after 2s
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Chart.js Scatter Plot</h1>
        <p className="text-gray-600 mb-6">
          Interactive scatter plot example with Chart.js
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Data Distribution</h2>
            <div className="relative">
              <Scatter data={data} options={options} />
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
