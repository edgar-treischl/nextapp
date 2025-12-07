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

    const minDate = Math.min(...allDates) - 24 * 60 * 60 * 1000; // 1 day padding
    const maxDate = Math.max(...allDates) + 24 * 60 * 60 * 1000;

    HighchartsGantt.ganttChart(chartRef.current, {
      chart: { backgroundColor: "transparent" },
      title: { text: "Project Timeline" },
      yAxis: { uniqueNames: true },
      xAxis: { min: minDate, max: maxDate, currentDateIndicator: true },
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

  return (
    <section className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div ref={chartRef} style={{ width: "100%", height: "500px" }} />
      </div>

      <div className="mt-10 text-center">
        <Link href={`${basePath}/`} className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
