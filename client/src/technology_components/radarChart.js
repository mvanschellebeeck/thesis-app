import React, { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  ResponsiveContainer
} from "recharts";

export default class TechnologyRadarChart extends PureComponent {
  render() {
    const data = [];
    console.log(this.props);
    Object.keys(this.props.technologyCombinationValues).forEach(subprocess => {
      data.push({
        subprocess: subprocess,
        ...this.props.technologyCombinationValues[subprocess]
      });
    });
    console.log(data);

    return (
        <ResponsiveContainer width="100%" height="100%">
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
