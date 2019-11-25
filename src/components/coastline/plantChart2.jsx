import React from 'react';
import {Pie} from 'react-chartjs-2';
import {purple, red, blue, teal, green, grey} from '@material-ui/core/colors'
import '../plantModal.css';

// default opex costs 
const costs = [0.16, 0.10, 0.03, 0.07, 0.23];

const colours = [purple, grey, blue, teal, green, red];
const mainColours = colours.map(x => x[500]);
const hoverColours = colours.map(x => x[900]);

export default function PlantChart2({width, height, title, targetSWRO, embodied_emissions}) {

  const data = {
    labels: [
      'Power (pumps)',
      'CL2 Pre-treatment',
      'FeCI3 Pre-treatment',
      'Anti-Scalant',
      'HCI Pre-treatment',
      'Na0H Second-pass Treatment',
      'Nylon Membranes'
    ],
    datasets: [{
      data: [
        (0.0357 * targetSWRO).toFixed(0),
        (0.1481 * targetSWRO).toFixed(0),
        (0.0398 * targetSWRO).toFixed(0),
        (0.0548 * targetSWRO).toFixed(0),
        (0.0375 * targetSWRO).toFixed(0),
        (0.2270 * targetSWRO).toFixed(0),
        (0.0255 * targetSWRO).toFixed(0)
      ],
      backgroundColor: mainColours,
      hoverBackgroundColor: hoverColours
    }]
  };

  return <div id="pie_map2">
    <Pie data={data} width={width} height={height} label={(name) => 'Text: ' + name} options={{
      title: {
        display: true,
        text: title + ' (kg C02e)'
      }
    }} />
  </div>
}
