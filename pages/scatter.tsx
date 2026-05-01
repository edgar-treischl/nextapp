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

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend)

// helper to generate realistic-ish clustered data
const generateCluster = (count: number, xBase: number, yBase: number) => {
  return Array.from({ length: count }, () => ({
    x: xBase + Math.random() * 20 - 10,
    y: yBase + Math.random() * 20 - 10,
  }))
}

export default function ScatterPage() {
  const [data, setData] = useState({
    datasets: [
      {
        label: 'Group A',
        data: generateCluster(25, 40, 60),
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
        pointRadius: 5,
      },
      {
        label: 'Group B',
        data: generateCluster(25, 70, 40),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        pointRadius: 5,
      },
      {
        label: 'Outliers',
        data: [
          { x: 20, y: 90 },
          { x: 90, y: 10 },
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.9)',
        pointRadius: 7,
      },
    ],
  })

  // ✅ Now we actually use setData
  const regenerateData = () => {
    setData({
      datasets: [
        {
          label: 'Group A',
          data: generateCluster(25, 40, 60),
          backgroundColor: 'rgba(37, 99, 235, 0.7)',
          pointRadius: 5,
        },
        {
          label: 'Group B',
          data: generateCluster(25, 70, 40),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          pointRadius: 5,
        },
        {
          label: 'Outliers',
          data: [
            { x: Math.random() * 100, y: Math.random() * 100 },
            { x: Math.random() * 100, y: Math.random() * 100 },
          ],
          backgroundColor: 'rgba(16, 185, 129, 0.9)',
          pointRadius: 7,
        },
      ],
    })
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Groups A & B with Outliers',
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'X Metric' },
      },
      y: {
        title: { display: true, text: 'Y Metric' },
      },
    },
  }

  const codeString = `// regenerate data dynamically
const regenerateData = () => {
  setData({
    datasets: [
      {
        label: 'Group A',
        data: generateCluster(25, 40, 60)
      },
      {
        label: 'Group B',
        data: generateCluster(25, 70, 40)
      }
    ]
  });
};`

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
          Chart.js Scatter Plot
        </h1>
        <p className="text-gray-600 mb-6">
          Scatter plots are perfect for visualizing the relationship between two variables. In this example, we have two groups of data points with some outliers. Click the button below to see how the data changes dynamically!
        </p>

        {/* ✅ New button */}
        <button
          onClick={regenerateData}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Regenerate Data
        </button>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Data Distribution
            </h2>
            <Scatter data={data} options={options} />
          </div>

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