import { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts/highcharts-gantt";
import Papa from "papaparse";
import Link from "next/link";
import type { SeriesGanttOptions } from "highcharts/highcharts-gantt";

export default function GanttPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [seriesData, setSeriesData] = useState<SeriesGanttOptions[]>([]);

  useEffect(() => {
    fetch("/data/tasks.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true }).data as any[];
        const currentYear = new Date().getFullYear();

        // Map CSV rows to Gantt points
        const tasks = parsed
          .filter((row) => row.task && row.start && row.end)
          .map((row) => ({
            name: row.task,
            start: new Date(row.start).getTime(),
            end: new Date(row.end).getTime(),
          }))
          .filter((task) => new Date(task.start).getFullYear() >= currentYear);

        // Cast to 'any' to satisfy TypeScript
        setSeriesData([{ type: "gantt", name: "Project 1", data: tasks as any }]);
      })
      .catch((err) => console.error("Failed to load CSV:", err));
  }, []);

  useEffect(() => {
    if (!chartRef.current || !seriesData.length) return;

    const today = Date.now();
    const threeMonthsAhead = today + 90 * 24 * 60 * 60 * 1000*2;

    Highcharts.ganttChart(chartRef.current, {
      chart: { backgroundColor: "transparent" },
      title: { text: "Project Timeline" },
      yAxis: { uniqueNames: true },
      xAxis: { min: today, max: threeMonthsAhead, currentDateIndicator: false },
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
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
