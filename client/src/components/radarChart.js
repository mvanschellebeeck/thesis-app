import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';

// const data = [

//   {
//     subprocess: 'Concentrate Management',
//     social: 40,
//     environmental: 30,
//     economic: 60
//   },
//   {
//     subprocess: 'Pre Treatment',
//     social: 10,
//     environmental: 40,
//     economic: 100
//   },
//   {
//     subprocess: 'Desalination',
//     social: 40,
//     environmental: 30,
//     economic: 60
//   },
//   {
//     subprocess: 'Post Treatment',
//     social: 40,
//     environmental: 30,
//     economic: 60
//   },
//   {
//     subprocess: 'Intake',
//     social: 40,
//     environmental: 60,
//     economic: 80
//   },

// ];

export default class TechnologyRadarChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/6ebcxbx4/';

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
      <RadarChart className="technologyRadarContainer" cx={250} cy={250} outerRadius={150} width={500} height={500} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subprocess" />
      <PolarRadiusAxis angle={30} domain={[0, 50]} />
      <Radar name="Economic Impact" dataKey="economic" stroke="#fff112" fill="#fff112" fillOpacity={0.6} />
      <Radar name="Social Impact" dataKey="social" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="Environmental Impact" dataKey="environmental" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <Legend iconSize={20}/>
      </RadarChart>
    );
  }
}
