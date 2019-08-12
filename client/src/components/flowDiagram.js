import React, { Component } from "react";
import "../index.css";
import mermaid, { mermaidAPI } from "mermaid";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

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
      A(Intake)-->B(Pre Treatment)
      B-->C(Desalination)
      C-->D(Post Treatment)
      C-->E(Concentrate Management)`,

      subprocesses: {
        'Intake': {
          types: ['Intake-type1', 'Intake-type2', 'Intake-type3'],
          button: "primary",
          currentType: 'intake-1'
        },
        'Pre Treatment': {
          types: ['Pre Treatment-type1', 'Pre Treatment-type2', 'Pre Treatment-type3'],
          button: "secondary",
          currentType: 'pre-1'
        },
        'Desalination': { 
          types: ['Desalination-type1', 'Desalination-type2'],
          button: "success",
          currentType: 'desal-1'
        },
        'Post Treatment': { 
          types: ['Post Treatment-type1', 'Post Treatment-type2', 'Post Treatment-type3'],
          button: "warning",
          currentType: 'post-1'
        },
        'Concentrate Management': { 
          types: ['Concentrate Management-type1', 'Concentrate Management-type2', 'Concentrate Management-type3'],
          button: "danger",
          currentType: 'conc-1'
        }
      } 
    };


  }

  handleClick(e) {
    const text = e.target.innerText;
    const subprocess = text.split("-")[0];
    const type = text.split("-")[1];
    const state = this.state;
    state.subprocesses[subprocess].currentType = type;

    
    // update graph
    const graph = this.state.graphDefinition;
    const newGraph = graph.replace(subprocess, subprocess + ': ' + type);
    state.graphDefinition = newGraph;

    this.setState(state);
    //console.log(this.state);
  }

  componentDidMount() {}

  render() {

    return (      
      <div>
        <ButtonToolbar>
          {Object.keys(this.state.subprocesses).map(
            subprocess => (
              <DropdownButton
                title={subprocess}
                variant={this.state.subprocesses[subprocess].button}
                id={`mydropdown-${subprocess}`}
                key={subprocess}
                size="sm"
              >
                {this.state.subprocesses[subprocess].types.map(
                  subprocessType => (
                    <Dropdown.Item onClick={this.handleClick.bind(this)}>
                      {subprocessType}
                    </Dropdown.Item>
                  )
                )}
              </DropdownButton> 
            )
          )}
        </ButtonToolbar>
        <div className="mermaid">
          {this.state.graphDefinition}
        </div>
        ;
      </div>
    );
  }
}
