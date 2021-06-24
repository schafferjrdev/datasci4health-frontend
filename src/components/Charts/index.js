import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const Charts = ({ name, data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis name="Anos" dataKey="year">
          <Label value="Anos" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          label={{ value: "Ocorrências", angle: -90, position: "insideLeft" }}
          domain={[0, Math.max(...data.map((d) => d.total))]}
          type="number"
        />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar
          name={`Total de nascidos com ${name}`}
          dataKey="total"
          fill="#800026"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Charts;
