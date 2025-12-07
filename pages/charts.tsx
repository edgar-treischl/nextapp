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

// Register Chart.js components
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
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Sales Example',
      },
    },
  }

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-8 text-center">Interactive Chart.js Example</h2>
      <div className="max-w-3xl mx-auto">
        <Bar data={data} options={options} />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  )
}
