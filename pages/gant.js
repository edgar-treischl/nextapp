// pages/gantt.js
import { useEffect, useRef, useState } from 'react';
import HighchartsGantt from 'highcharts/highcharts-gantt';
import Link from 'next/link';

export default function GanttPage() {
  const chartRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Gantt series data
  const seriesData = [
    {
      name: 'Project 1',
      data: [
        { name: 'Task 1', start: Date.UTC(2023, 0, 1), end: Date.UTC(2023, 2, 1) },
        { name: 'Task 2', start: Date.UTC(2023, 2, 2), end: Date.UTC(2023, 5, 1) },
        { name: 'Task 3', start: Date.UTC(2023, 5, 2), end: Date.UTC(2023, 8, 1) },
      ],
    },
  ];

  const chartOptions = {
    title: { text: 'Project Timeline' },
    xAxis: {
      currentDateIndicator: true,
      min: Date.UTC(2023, 0, 1),
      max: Date.UTC(2023, 11, 31),
      tickInterval: 1000 * 60 * 60 * 24 * 30, // ~1 month
    },
    series: seriesData,
  };

  useEffect(() => {
    if (chartRef.current) {
      HighchartsGantt.ganttChart(chartRef.current, chartOptions);
    }
  }, []);

  const codeString = `import HighchartsGantt from 'highcharts/highcharts-gantt';

HighchartsGantt.ganttChart('container', ${JSON.stringify(chartOptions, null, 2)});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">
        Interactive Highcharts Gantt Example
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Gantt Chart */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </div>

        {/* Right: Code with copy button */}
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
  );
}
