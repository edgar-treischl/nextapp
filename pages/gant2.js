// pages/gantt.js
import { useEffect, useRef, useState } from 'react';
import HighchartsGantt from 'highcharts/highcharts-gantt';
import Papa from 'papaparse';
import Link from 'next/link';

export default function GanttPage() {
  const chartRef = useRef(null);
  const [seriesData, setSeriesData] = useState([]);
  const [copied, setCopied] = useState(false);

  // Load CSV data
  useEffect(() => {
    fetch('/data/tasks.csv')
      .then(res => res.text())
      .then(csvText => {
        const parsed = Papa.parse(csvText, { header: true }).data;
        const tasks = parsed.map(row => ({
          name: row.task,
          start: new Date(row.start).getTime(),
          end: new Date(row.end).getTime(),
        }));
        setSeriesData([{ name: 'Project 1', data: tasks }]);
      });
  }, []);

  // Render chart when data is ready
  useEffect(() => {
    if (chartRef.current && seriesData.length) {
      const allDates = seriesData[0].data.flatMap(d => [d.start, d.end]);
      const minDate = Math.min(...allDates) - 24 * 60 * 60 * 1000; // 1 day padding
      const maxDate = Math.max(...allDates) + 24 * 60 * 60 * 1000;

      HighchartsGantt.ganttChart(chartRef.current, {
        title: { text: 'Project Timeline' },
        xAxis: {
          currentDateIndicator: true,
          min: minDate,
          max: maxDate,
        },
        series: seriesData,
      });
    }
  }, [seriesData]);

  const codeString = `import HighchartsGantt from 'highcharts/highcharts-gantt';
import tasks from './tasks.csv'; // load your CSV

// Convert CSV to Highcharts series
const seriesData = tasks.map(row => ({
  name: row.task,
  start: new Date(row.start).getTime(),
  end: new Date(row.end).getTime(),
}));

HighchartsGantt.ganttChart('container', {
  title: { text: 'Project Timeline' },
  xAxis: { currentDateIndicator: true },
  series: [{ name: 'Project 1', data: seriesData }]
});`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">Interactive Highcharts Gantt Example</h2>

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
