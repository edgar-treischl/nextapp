import { useMemo } from 'react'
import { Bubble } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

import gapminder from '@/data/gapminder.json'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title)

export default function BubblePage() {
  const year = 2007

  const data = useMemo(() => {
    const filtered = gapminder.filter((d) => d.year === year)

    const colors: Record<string, string> = {
      Asia: 'rgba(239, 68, 68, 0.6)',
      Europe: 'rgba(37, 99, 235, 0.6)',
      Africa: 'rgba(16, 185, 129, 0.6)',
      Americas: 'rgba(234, 179, 8, 0.6)',
      Oceania: 'rgba(168, 85, 247, 0.6)',
    }

    // 👇 adjusted scaling so bubbles are clearly visible
    const scalePop = (pop: number) => Math.sqrt(pop) / 1200

    return {
      datasets: Object.keys(colors).map((continent) => ({
        label: continent,
        data: filtered
          .filter((d) => d.continent === continent)
          .map((d) => ({
            x: d.gdpPercap,
            y: d.lifeExp,
            r: scalePop(d.pop),
            country: d.country, // ✅ important for tooltip
          })),
        backgroundColor: colors[continent],
        borderWidth: 1,
      })),
    }
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: {
        display: true,
        text: 'Gapminder Bubble Chart (2007)',
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const d = ctx.raw

            return [
              `Country: ${d.country}`,
              `GDP per Capita: $${Math.round(d.x)}`,
              `Life Expectancy: ${d.y} yrs`,
              `Population: ${Math.round(d.r * d.r * 1200 * 1200)}`,
            ]
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'GDP per Capita',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Life Expectancy',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: true,
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1600px] mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">
          Gapminder Bubble Chart (2007)
        </h1>

        <Bubble data={data} options={options} />
      </div>
    </div>
  )
}