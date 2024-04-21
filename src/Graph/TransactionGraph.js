import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const TransactionChart = ({ transactionData }) => {
  const chartRef = useRef(null);
  const [statusTotals, setStatusTotals] = useState({});

  useEffect(() => {
    if (!chartRef.current || !transactionData) return;

    // Calculate total amount for each status
    const totals = transactionData.reduce((totals, transaction) => {
      const { status, amount } = transaction;
      // Convert amount to a number before summing
      totals[status] = (totals[status] || 0) + parseFloat(amount);
      return totals;
    }, {});

    setStatusTotals(totals);

    // Create chart
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(totals),
        datasets: [{
          label: 'Total Amount',
          data: Object.values(totals),
          backgroundColor: [
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value.toFixed(2)}₹`;
              }
            }
          }
        },
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [transactionData]);

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <canvas ref={chartRef} width={400} height={400} />
      <div>
        {Object.entries(statusTotals).map(([status, total]) => (
          <p key={status}>{status}: {total.toFixed(2)}₹</p>
        ))}
      </div>
    </div>
  );
};

export default TransactionChart;
