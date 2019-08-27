import React, { Component } from "react";
import "../index.css";
import mermaid from "mermaid";

interface IProps {
  setParentState
}

interface IState {
  graphDefinition
}

export default class FlowDiagram extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    mermaid.initialize({
      mermaid: {
        startOnLoad: true
      }
    });

    this.state = {
      // initial graph
      graphDefinition: `graph LR
      A(1. Intake)-->B(2. Pre Treatment)
      B-->C(Desalination)
      C-->D(Post Treatment)
      C-->E(Concentrate Management)`
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
