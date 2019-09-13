import React, { PureComponent } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { TechnologyImpactValues as IProps } from '../utils/Models';

export default class TechnologyStackedAreaChart extends PureComponent<IProps> {
  render() {
    const data: any[] = [];
    Object.keys(this.props.technologyCombinationValues).forEach(subprocess => {
      data.push({
        subprocess,
        ...(this.props.technologyCombinationValues as any)[subprocess],
      });
    });

    return (
      <ResponsiveContainer>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            bottom: 0,
            left: 0,
            right: 30,
            top: 10,
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
