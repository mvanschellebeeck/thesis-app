import React from 'react';
import '../index.css';

import FlowDiagram from '../components/desalinationFlowDiagram';
import TechnologyRadarChart from '../components/radarChart';
import TechnologyStackedAreaChart from '../components/stackedAreaChart';
import TechnologyTable from '../components/technologyTable';
import { TechnologyImpactValues, TechnologyParentState } from '../utils/Models';
import { constructTitle } from '../utils/utilFunctions';

export default class Technologies extends React.Component<
  TechnologyParentState,
  TechnologyImpactValues
> {
  state = {
    technologyCombinationValues: {
      'Concentrate Management': {
        economic: 80,
        environmental: 60,
        social: 40,
      },
      'Pre-Treatment': {
        economic: 100,
        environmental: 40,
        social: 10,
      },
      Desalination: {
        economic: 60,
        environmental: 30,
        social: 40,
      },
      'Post-Treatment': {
        economic: 80,
        environmental: 60,
        social: 40,
      },
      Intake: {
        economic: 60,
        environmental: 30,
        social: 40,
      },
    },
  };

  setParentState = (dataFromChild: TechnologyImpactValues) => {
    // child is currently either Map or Detail
    this.setState(dataFromChild);
  };

  render() {
    return (
      <div className="technologyContainer">
        {constructTitle('Selected Technologies')}
        {constructTitle('Desalination Subprocceses')}
        <TechnologyTable setParentState={this.setParentState} />
        <TechnologyRadarChart
          technologyCombinationValues={this.state.technologyCombinationValues}
        />
        {constructTitle('The Desalination Process')}
        {constructTitle('Chart 2')}
        <FlowDiagram />
        <TechnologyStackedAreaChart
          technologyCombinationValues={this.state.technologyCombinationValues}
        />
      </div>
    );
  }
}
