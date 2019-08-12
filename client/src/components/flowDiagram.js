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
      A(Intake)-->B(Pre-Treatment)
      B-->C(Desalination)
      C-->D(Post-Treatment)
      C-->E(Concentrate Management)`,
      subprocesses: {
        'Intake': {
          types: ['intake-1', 'intake-2', 'intake-3'],
          button: "primary"
        },
        'Pre-Treatment': {
          types: ['pre-1', 'pre-2', 'pre-3'],
          button: "secondary"
        },
        'Desalination': { 
          types: ['desal-1', 'desal-2'],
          button: "success",
        },
        'Post-Treatment': { 
          types: ['post-1', 'post-2', 'post-3'],
          button: "warning"
        },
        'Concentrate Management': { 
          types: ['conc-1', 'conc-2', 'conc-3'],
          button: "danger"
        }
      } 
    };


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
                    <Dropdown.Item>{subprocessType}</Dropdown.Item>
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
