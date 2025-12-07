// pages/gantt.js
import { useEffect, useRef, useState } from 'react';
import HighchartsGantt from 'highcharts/highcharts-gantt';
import Papa from 'papaparse';
import Link from 'next/link';

export default function GanttPage() {
  const chartRef = useRef(null);
  const [seriesData, setSeriesData] = useState([]);

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
        chart: {
          backgroundColor: 'transparent',
        },
        title: {
          text: 'Project Timeline',
          style: { fontSize: '1.5rem', fontWeight: '600' },
        },
        xAxis: {
          currentDateIndicator: true,
          min: minDate,
          max: maxDate,
        },
        series: seriesData,
        credits: { enabled: false }, // remove Highcharts watermark
      });
    }
  }, [seriesData]);

  return (
    <section className="container mx-auto py-16 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 transition hover:shadow-xl">
        <div ref={chartRef} style={{ width: '100%', height: '500px' }} />
      </div>

      <div className="mt-10 text-center">
        <Link href="/" className="text-blue-600 hover:underline font-medium">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
