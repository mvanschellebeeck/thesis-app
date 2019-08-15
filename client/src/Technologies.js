import React from "react";
import "./index.css";

import FlowDiagram from "./technology_components/flowDiagram";
import TechnologyTable from "./technology_components/technologyTable";
import TechnologyRadarChart from "./technology_components/radarChart";

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
      <div className="technologyContainer">
        <TechnologyTable setParentState={this.setParentState} />
        <TechnologyRadarChart className="technologyChart" 
          technologyCombinationValues={this.state.technologyCombinationValues}
        />
        <FlowDiagram setParentState={this.setParentState} />
      </div>
    );
  }
}
