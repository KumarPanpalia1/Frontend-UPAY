import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function LineChart({ data }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || !ref.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Donations',
            data: data.donations,
            borderColor: '#1D9E75',
            backgroundColor: 'rgba(29,158,117,.08)',
            tension: 0.4, fill: true, pointRadius: 3,
          },
          {
            label: 'Expenses',
            data: data.expenses,
            borderColor: '#D85A30',
            backgroundColor: 'rgba(216,90,48,.06)',
            tension: 0.4, fill: true, pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => '₹' + ctx.raw.toLocaleString('en-IN') } },
        },
        scales: {
          x: { grid: { display: false } },
          y: { ticks: { callback: v => '₹' + (v / 1000).toFixed(0) + 'k' } },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [data]);

  return (
    <div style={{ position: 'relative', height: '220px' }}>
      <canvas ref={ref} />
    </div>
  );
}