import React from 'react';
import {Pie} from 'react-chartjs-2';
import {purple, red, blue, teal, green, grey} from '@material-ui/core/colors'
import '../plantModal.css';

// default opex costs 
const costs = [0.16, 0.10, 0.03, 0.07, 0.23];

const colours = [purple, grey, blue, teal, green, red];
const mainColours = colours.map(x => x[500]);
const hoverColours = colours.map(x => x[900]);

export default function PlantChart({width, height, title, unitPrice}) {
  const data = {
    labels: [
      'Maintenance',
      'Labor',
      'Membrane Exchange',
      'Chemical',
      'Energy',
      'Capital Costs'
    ],
    datasets: [{
      data: [...costs, unitPrice],
      backgroundColor: mainColours,
      hoverBackgroundColor: hoverColours
    }]
  };

  return <div id="pie_map">
    <Pie data={data} width={width} height={height} label={(name) => 'Text: ' + name} options={{
      title: {
        display: true,
        text: title + ' ($/kL)'
      }
    }} />
  </div>
}
