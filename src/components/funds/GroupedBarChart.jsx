// src/components/funds/GroupedBarChart.jsx
export default function GroupedBarChart({ funds }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!funds?.length || !ref.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: funds.map(f => f.name),
        datasets: [
          {
            label: 'Allocated',
            data: funds.map(f => f.allocated),
            backgroundColor: '#B5D4F4',
            borderRadius: 3,
            barPercentage: 0.7,
          },
          {
            label: 'Spent',
            data: funds.map(f => f.spent),
            backgroundColor: '#185FA5',
            borderRadius: 3,
            barPercentage: 0.7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx =>
                ctx.dataset.label + ': ₹' + ctx.raw.toLocaleString('en-IN'),
            },
          },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, maxRotation: 0 } },
          y: {
            grid: { color: 'rgba(128,128,128,.08)' },
            ticks: {
              font: { size: 10 },
              callback: v => '₹' + (v / 1000).toFixed(0) + 'k',
            },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [funds]);

  return (
    <div style={{ position: 'relative', height: 220 }}>
      <canvas ref={ref} />
    </div>
  );
}