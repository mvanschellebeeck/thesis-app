import React, { Component } from "react";
import "../index.css";
import mermaid from 'mermaid';


export default class FlowDiagram extends Component {

  componentDidMount() {
    const output = document.getElementById("myOutput");
    mermaid.initialize( { startOnLoad: true });

    var graphDefinition = `graph TB
    a-->b
    b-->a`;

    mermaid.render('theGraph', graphDefinition, (svgCode) => {
      output.innerHTML = svgCode;
    });
  }

  render() {
    return <div className="flowDiagramContainer" id="myOutput"></div>;
  }
}
