import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)

export default function ChartsPage() {
  const [data, setData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [30, 45, 28, 80, 99, 43],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.4)',
        borderColor: 'rgba(37, 99, 235, 1)',
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [20, 35, 40, 60, 70, 50],
        fill: true,
        backgroundColor: 'rgba(239, 68, 68, 0.4)',
        borderColor: 'rgba(239, 68, 68, 1)',
        tension: 0.4,
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Revenue vs Expenses (Stacked Area Chart)',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  }

  const codeString = `const data = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30,45,28,80,99,43],
      fill: true,
      backgroundColor: 'rgba(37, 99, 235, 0.4)',
      borderColor: 'rgba(37, 99, 235, 1)',
      tension: 0.4
    },
    {
      label: 'Expenses',
      data: [20,35,40,60,70,50],
      fill: true,
      backgroundColor: 'rgba(239, 68, 68, 0.4)',
      borderColor: 'rgba(239, 68, 68, 1)',
      tension: 0.4
    }
  ]
};

const options = {
  scales: {
    x: { stacked: true },
    y: { stacked: true }
  }
};

<Line data={data} options={options} />;`

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Chart.js Stacked Area Chart
        </h1>
        <p className="text-gray-600 mb-6">
          Filled stacked line chart example
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Revenue Overview
            </h2>
            <Line data={data} options={options} />
          </div>

          {/* Code */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Example Code</h2>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
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
    </div>
  )
}