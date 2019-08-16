import React, { Component } from "react";
import "../index.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

import { Dropdown, DropdownButton, ButtonToolbar } from "react-bootstrap";

export default class TechnologyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  getRandomInts = () => {
    // 0 - 100
    return {
      social: Math.floor(Math.random() * 100),
      environmental: Math.floor(Math.random() * 100),
      economic: Math.floor(Math.random() * 100)
    };
  };

  handleClick(e) {
    // generate random for now
    const state_change = {
      technologyCombinationValues: {
        "Concentrate Management": this.getRandomInts(),
        Intake: this.getRandomInts(),
        "Pre Treatment": this.getRandomInts(),
        Desalination: this.getRandomInts(),
        "Post Treatment": this.getRandomInts()
      }
    };

    this.props.setParentState(state_change);

    const text = e.target.innerText;
    const subprocess = text.split("-")[0];
    const type = text.split("-")[1];
    const state = this.state;
    state.subprocesses[subprocess].currentType = type;

    this.setState(state);
  }

  createColumns(...cols) {
    return cols.map(col => {
      return {
        Header: col,
        accessor: col.toLowerCase()
      };
    });
  }

  render() {
    const plant_with_properties = [];
    Object.keys(this.state.subprocesses).forEach(subprocess => {
      plant_with_properties.push({
        subprocess: subprocess,
        type: this.state.subprocesses[subprocess].currentType
      });
    });
    console.log(plant_with_properties);

    return (
      <div>
        {/* Table */}
        <div>
          <div className="buttonToolbar">
            <ButtonToolbar>
              {Object.keys(this.state.subprocesses).map(subprocess => (
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
              ))}
            </ButtonToolbar>
          </div>
          <ReactTable
            data={plant_with_properties}
            columns={this.createColumns("Subprocess", "Type")}
            defaultPageSize={5}
            className="-striped -highlight technologyTable"
            showPageSizeOptions={false}
            showPagination={false}
          />
          <br />
        </div>
      </div>
    );
  }
}
