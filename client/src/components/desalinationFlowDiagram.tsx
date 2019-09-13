import mermaid from 'mermaid';
import React, { Component } from 'react';
import '../index.css';

interface IState {
  graphDefinition: string;
}

export default class FlowDiagram extends Component<{}, IState> {
  constructor(props: {}) {
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
