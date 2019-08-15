import React from "react";
import "./index.css";

import FlowDiagram from './components/flowDiagram';
import TechnologyRadarChart from './components/radarChart';

export default class Technologies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technologyCombinationValues: {
        "Concentrate Management": {
          social: 40,
          environmental: 60,
          economic: 80
        },
        "Pre Treatment": {
          social: 10,
          environmental: 40,
          economic: 100
        },
        Desalination: {
          social: 40,
          environmental: 30,
          economic: 60
        },
        "Post Treatment": {
          social: 40,
          economic: 80,
          environmental: 60
        },
        Intake: {
          social: 40,
          environmental: 30,
          economic: 60
        }
      }
    };
  }

  setParentState = dataFromChild => {
    // child is currently either Map or Detail
    this.setState(dataFromChild);
  };

  render() {
    return (
      <div>
        <FlowDiagram setParentState={this.setParentState} />
        <TechnologyRadarChart
          technologyCombinationValues={this.state.technologyCombinationValues}
        />
      </div>
    );
  }
}
