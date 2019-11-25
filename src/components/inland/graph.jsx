import React, {useContext, useState} from 'react';

import {MarkSeries, Hint, LineSeries, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, ChartLabel} from 'react-vis';


const costFunction = (x) => {
  return ((Math.pow(10, 3.52 + 0.82 * Math.log10(x))) / 1000000) * 7;
}

export default function Graph({capacity}) {
  const [hoverValue, setHoverValue] = useState(null);

  var x = 0;
  var y;
  var data = [];

  while (x <= 3500) {
    y = costFunction(x);
    data.push({x: x, y: y});
    x += 1;
  }

  const testData = [
    {x: 0.4, y: 3.375},
    {x: 1.2, y: 2},
    {x: 2, y: 5.85},
    {x: 2.5, y: 8.03},
    {x: 3.5, y: 8},
  ];

  return (
    <>
      <div style={{fontSize: 15, marginLeft: 5}}> Design Capacity vs. Capital Cost</div>
      <XYPlot height={250} width={300} yDomain={[0, 20]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="Design Capacity (kL)" />
        <LineSeries
          color='blue'
          data={data}
        />
        <MarkSeries
          color='red'
          //onNearestX={(value, {index}) => setHoverValue(value)}
          data={[{x: capacity, y: costFunction(capacity)}]}
        />
        <YAxis title="Cost (million AUD)" />
      </XYPlot>
    </>

  )
}
