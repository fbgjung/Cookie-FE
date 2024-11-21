import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartContainer = styled.div`
  margin-top: 40px;
  background-color: #ffffff;
  padding: 20px;
  margin-right: 5%;
  border-radius: 16px;
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;

  margin-bottom: 20px;
`;

const GenreChart = () => {
  const data = [
    { name: "로맨스", points: 300 },
    { name: "액션", points: 500 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "SF", points: 200 },
    { name: "코미디", points: 150 },
    { name: "드라마", points: 400 },
  ];

  return (
    <ChartContainer>
      <ChartTitle>장르별 포인트</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Bar dataKey="points" fill="#04012d" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default GenreChart;
