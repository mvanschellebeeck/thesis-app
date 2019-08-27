import React from "react";
import "./index.css";

import { constructTitle } from './utils/utilFunctions';
import FlowDiagram from "./technology_components/flowDiagram";
import TechnologyTable from "./technology_components/technologyTable";
import TechnologyRadarChart from "./technology_components/radarChart";
import TechnologyStackedAreaChart from "./technology_components/stackedAreaChart";

type Subprocess = "Intake" | "Pre-Treatment" | "Desalination"
                    | "Post-Treatment" | "Concentrate Management";
                     
interface ImpactModel {
  social: number,
  environmental: number,
  economic: number
}

interface IState  {
  technologyCombinationValues : {
    [key in Subprocess]: ImpactModel
  }
}

interface IProps {} 

export default class Technologies extends React.Component<IProps, IState> {
  constructor(props : IProps) {
    super(props);
    this.state = {
      technologyCombinationValues: {
        "Concentrate Management": {
          social: 40,
          environmental: 60,
          economic: 80
        },
        "Pre-Treatment": {
          social: 10,
          environmental: 40,
          economic: 100
        },
        "Desalination": {
          social: 40,
          environmental: 30,
          economic: 60
        },
        "Post-Treatment": {
          social: 40,
          economic: 80,
          environmental: 60
        },
        "Intake": {
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
        {constructTitle("Selected Technologies")}
        {constructTitle("Desalination Subprocceses")}
        <TechnologyTable setParentState={this.setParentState} />
        <TechnologyRadarChart
          technologyCombinationValues={this.state.technologyCombinationValues}
        />
        {constructTitle("The Desalination Process")}
        {constructTitle("Chart 2")}
        <FlowDiagram setParentState={this.setParentState} />
        <TechnologyStackedAreaChart technologyCombinationValues={this.state.technologyCombinationValues} />
      </div>
    );
  }
}
