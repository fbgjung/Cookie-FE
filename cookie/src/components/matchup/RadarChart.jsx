const RadarChart = ({ labels, data, backgroundColor, borderColor }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "포인트1",
        data,
        backgroundColor,
        borderColor,
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: borderColor,
        pointHoverBackgroundColor: borderColor,
        pointHoverBorderColor: "#fff",
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: "transparent" },
        grid: { color: "#8b4513" },
        ticks: {
          color: "#8b4513",
        },
        pointLabels: {
          color: "#8b4513", 
          font: { size: 12 },
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
    },
    plugins: {
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "250px", height: "250px" }}>
      <Radar data={chartData} options={options} />
    </div>
  );
};

RadarChart.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default RadarChart;
