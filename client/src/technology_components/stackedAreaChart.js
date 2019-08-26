import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default class TechnologyStackedAreaChart extends PureComponent {
  render() {
    const data = [];
    Object.keys(this.props.technologyCombinationValues).forEach(subprocess => {
      data.push({
        subprocess: subprocess,
        ...this.props.technologyCombinationValues[subprocess]
      });
    });
    console.log(data);

    return (
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subprocess" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey=""
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="social"
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Area
            type="monotone"
            dataKey="economic"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="environmental"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey=""
            stackId="1"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
