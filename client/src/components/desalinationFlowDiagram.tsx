import React, { Component } from 'react';
import '../index.css';
import mermaid from 'mermaid';

interface IProps {}

interface IState {
  graphDefinition: string;
}

export default class FlowDiagram extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    mermaid.initialize({
      startOnLoad: true,
    });

    this.state = {
      // initial graph
      graphDefinition: `graph LR
      A(1. Intake)-->B(2. Pre Treatment)
      B-->C(Desalination)
      C-->D(Post Treatment)
      C-->E(Concentrate Management)`,
    };
  }

  componentDidMount() {
    mermaid.contentLoaded();
  }

  render() {
    return (
      <div className="flowDiagramContainer">
        <div className="mermaid">{this.state.graphDefinition}</div>
      </div>
    );
  }
}
