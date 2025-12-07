import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import Link from 'next/link'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ChartsPage() {
  const [data, setData] = useState({
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Monthly Sales Example' },
    },
  }

  const codeString = `const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'Sales',
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: 'rgba(37, 99, 235, 0.7)'
  }]
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Monthly Sales Example' }
  }
};

<Bar data={data} options={options} />;`

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) // hide message after 2s
  }

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">Interactive Chart.js Example</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Chart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <Bar data={data} options={options} />
        </div>

        {/* Right: Code with copy button */}
        <div className="relative bg-white p-6 rounded-xl shadow hover:shadow-lg transition overflow-x-auto">
          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
          >
            Copy
          </button>

          {/* Temporary copied message */}
          {copied && (
            <span className="absolute top-4 right-20 bg-green-500 text-white px-3 py-1 rounded text-sm animate-fade">
              Copied!
            </span>
          )}

          <h3 className="text-xl font-semibold mb-4">Code Example</h3>
          <pre className="text-sm text-gray-800">
            <code>{codeString}</code>
          </pre>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>

      {/* Tailwind custom animation */}
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
