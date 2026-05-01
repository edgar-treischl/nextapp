// pages/gantt.tsx
import { useEffect, useRef, useState } from "react";
import HighchartsGantt, { SeriesGanttOptions } from "highcharts/highcharts-gantt";
import Papa from "papaparse";
import Link from "next/link";

interface Task {
  name: string;
  start: number;
  end: number;
}

export default function GanttPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [seriesData, setSeriesData] = useState<SeriesGanttOptions[]>([]);

  // Use environment variable for base path (works in dev & export)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const csvUrl = `${basePath}/data/tasks.csv`;

  // Load CSV data
  useEffect(() => {
    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`CSV not found at ${csvUrl}`);
        return res.text();
      })
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true }).data as any[];

        const tasks: Task[] = parsed
          .filter((row) => row.task && row.start && row.end)
          .map((row) => ({
            name: row.task,
            start: new Date(row.start).getTime(),
            end: new Date(row.end).getTime(),
          }));

        setSeriesData([{ type: "gantt", name: "Project 1", data: tasks }]);
      })
      .catch((err) => console.error("Failed to load CSV:", err));
  }, [csvUrl]);

  // Render Gantt chart
  useEffect(() => {
    if (!chartRef.current || !seriesData.length) return;

    const allDates = seriesData[0].data?.flatMap((d: any) => [d.start, d.end]) || [];
    if (!allDates.length) return;

    const today = Date.now();
    const sixMonthsAhead = today + 90 * 24 * 60 * 60 * 1000*2;

    HighchartsGantt.ganttChart(chartRef.current, {
      chart: { backgroundColor: "transparent" },
      title: { text: "Project Timeline" },
      yAxis: { uniqueNames: true },
      xAxis: { currentDateIndicator: false, min: today, max: sixMonthsAhead },
      navigator: { enabled: true },
      scrollbar: { enabled: true },
      series: seriesData,
      tooltip: {
        pointFormatter() {
          const point = this as Highcharts.Point & { start: number; end: number };
          return `<span>${point.name}</span>: <b>${new Date(
            point.start
          ).toLocaleDateString()} → ${new Date(point.end).toLocaleDateString()}</b>`;
        },
      },
      credits: { enabled: false },
    });
  }, [seriesData]);

  const codeExample = `import HighchartsGantt from "highcharts/highcharts-gantt";
import Papa from "papaparse";

// Load and parse CSV data
fetch("/data/tasks.csv")
  .then(res => res.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { header: true }).data;
    const tasks = parsed
      .filter(row => row.task && row.start && row.end)
      .map(row => ({
        name: row.task,
        start: new Date(row.start).getTime(),
        end: new Date(row.end).getTime(),
      }));
    
    HighchartsGantt.ganttChart(chartRef.current, {
      title: { text: "Project Timeline" },
      series: [{ type: "gantt", name: "Project 1", data: tasks }]
    });
  });`;

  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Highcharts Gantt</h1>
        <p className="text-gray-600 mb-6">
          Project timeline visualization with Highcharts Gantt
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Chart Section - Takes up 2/3 of the space */}
          <div className="xl:col-span-2 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Project Timeline</h2>
            <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
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
              <code>{codeExample}</code>
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
  );
}
