import { useState } from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default function ChartsPage() {
  const [data, setData] = useState({
    labels: [
      'Strength',
      'Skill',
      'Speed',
      'Endurance',
      'Agility',
      'Flexibility',
    ],
    datasets: [
      {
        label: 'Player A',
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
      },
      {
        label: 'Player B',
        data: [28, 48, 40, 19, 96, 27],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Player Skill Comparison',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
      },
    },
  }

  const codeString = `const data = {
  labels: ['Strength','Skill','Speed','Endurance','Agility','Flexibility'],
  datasets: [
    {
      label: 'Player A',
      data: [65, 59, 90, 81, 56, 55],
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      borderColor: 'rgba(37, 99, 235, 1)'
    },
    {
      label: 'Player B',
      data: [28, 48, 40, 19, 96, 27],
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      borderColor: 'rgba(239, 68, 68, 1)'
    }
  ]
};

<Radar data={data} />;`

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
          Chart.js Radar Chart
        </h1>
        <p className="text-gray-600 mb-6">
          Radar charts are great for comparing multiple variables across different categories. In this example, we compare the skills of two players across six attributes. You can customize the data and options to fit your specific use case.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Skill Comparison
            </h2>
            <Radar data={data} options={options} />
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