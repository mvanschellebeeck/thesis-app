import React, { PureComponent } from 'react';
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import { TechnologyImpactValues } from '../utils/Models';

export default class TechnologyRadarChart extends PureComponent<
  TechnologyImpactValues
> {
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
        <RadarChart outerRadius={150} data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subprocess" />
          <PolarRadiusAxis angle={30} domain={[0, 50]} />
          <Radar
            name="Economic Impact"
            dataKey="economic"
            stroke="#fff112"
            fill="#fff112"
            fillOpacity={0.6}
          />
          <Radar
            name="Social Impact"
            dataKey="social"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Radar
            name="Environmental Impact"
            dataKey="environmental"
            stroke="#82ca9d"
            fill="#82ca9d"
            fillOpacity={0.6}
          />
          <Legend iconSize={20} />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
