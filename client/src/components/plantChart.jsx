import React from 'react';
import { Pie } from 'react-chartjs-2';
import { purple, red, blue, teal, green } from '@material-ui/core/colors'
import '../plantModal.css';

const kL = 1230000;
const perKL = [0.11, 0.10, 0.03, 0.07, 0.40];
const costs = perKL.map(x => Math.round(x * kL));

const colours = [purple, red, blue, teal, green];
const mainColours = colours.map(x => x[500]);
const hoverColours = colours.map(x => x[900]);

const data = {
    labels: [
        'Maintenance',
        'Labor',
        'Membrane Exchange',
        'Chemical',
        'Energy'
    ],
    datasets: [{
        data: costs,
        backgroundColor: mainColours, 
        hoverBackgroundColor: hoverColours
    }]
};
export default function PlantChart({ width, height, title }) {
    return <div id="pie_map">
    <Pie data={data} width={width} height={height} options={{
        title: {
            display: true,
            text: title
        }
    }} />
    </div>
}