import React, { Component } from "react";
import "../index.css";
import mermaid from "mermaid";

export default class FlowDiagram extends Component {
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
      C-->E(Concentrate Management)`,

      subprocesses: {
        Intake: {
          types: ["Intake-type1", "Intake-type2", "Intake-type3"],
          button: "primary",
          currentType: "type1"
        },
        "Pre Treatment": {
          types: [
            "Pre Treatment-type1",
            "Pre Treatment-type2",
            "Pre Treatment-type3"
          ],
          button: "secondary",
          currentType: "type1"
        },
        Desalination: {
          types: [
            "Desalination-type1",
            "Desalination-type2",
            "Desalination-type3"
          ],
          button: "success",
          currentType: "type1"
        },
        "Post Treatment": {
          types: [
            "Post Treatment-type1",
            "Post Treatment-type2",
            "Post Treatment-type3"
          ],
          button: "warning",
          currentType: "type1"
        },
        "Concentrate Management": {
          types: [
            "Concentrate Management-type1",
            "Concentrate Management-type2",
            "Concentrate Management-type3"
          ],
          button: "danger",
          currentType: "type1"
        }
      }
    };
  }

  componentDidMount() {
    mermaid.contentLoaded();
  }

  render() {
    return (
      <div>
        <div className="mermaid">{this.state.graphDefinition}</div>
      </div>
    );
  }
}
