import React, {useContext, useState} from 'react';

import {MarkSeries, Hint, LineSeries, XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, ChartLabel} from 'react-vis';



export default function Graph() {
  const [hoverValue, setHoverValue] = useState(null);

  var x = 0;
  var data = [];

  while (x <= 3.5) {
    var y = 7.976898 + (2.678239 - 7.976898) / (1 + Math.pow((x / 1.942785), 9.268));
    data.push({x: x, y: y});
    x += 0.1;
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
      <div style={{fontSize: 15}}> Capacity vs. Capital Cost</div>
      <div style={{fontSize: 12, color: 'gray'}}> 2500 mg/L - 3800 mg/L</div>
      <XYPlot height={250} width={300} yDomain={[1, 9]}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis title="Capacity (ML)" />
        <LineSeries
          color='blue'
          data={data}
        />
        <MarkSeries
          color='red'
          onNearestX={(value, {index}) => setHoverValue(value)}
          data={testData}
        />
        <YAxis title="Cost (million AUD)" />
        {hoverValue &&
          <Hint value={hoverValue}>
            <div style={{fontSize: 10, color: 'gray', transform: 'translate(0px, -20px)'}}> {hoverValue.x || ''} </div>
          </Hint>

        }
      </XYPlot>
    </>

  )
}
