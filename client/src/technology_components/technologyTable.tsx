import React, { Component } from "react";
import "../index.css";

import ReactTable from "react-table";
import "react-table/react-table.css";

type Subprocess = "Intake" | "Pre-Treatment" | "Desalination"
                    | "Post-Treatment" | "Concentrate Management";
                     
interface ImpactModel {
  social: number,
  environmental: number,
  economic: number
}

interface ISubprocessValues  {
  technologyCombinationValues : {
    [key in Subprocess]: ImpactModel
  }
}

interface IState {
  subprocesses : {
    [key in Subprocess]: {
      types: string[],
      button: string,
      currentType: string
    }
  }
}

interface IProps {
  setParentState(data: ISubprocessValues): any;
} 


import { Dropdown, DropdownButton, ButtonToolbar } from "react-bootstrap";

export default class TechnologyTable extends Component<IProps, IState> {
  constructor(props : IProps) {
    super(props);
    this.state = {
      subprocesses: {
        "Intake": {
          types: ["Sub-surface", "Open-ocean", "Offshore"],
          button: "primary",
          currentType: "Sub-surface"
        },
        "Pre-Treatment": {
          types: [
            "Sand Filtration & Candle Filtration",
            "Ultra Filtration & Micro Filtration",
            "Coagulation & Flocculation"
          ],
          button: "secondary",
          currentType: "Sand Filtration & Candle Filtration"
        },
        "Desalination": {
          types: [
            "Reverse Osmosis (RO)",
            "Multiple-Effect Distillation (MED)",
            "Multi-stage Flash Distillation (MSF)",
            "Electrodialysis (ED)"
          ],
          button: "success",
          currentType: "Reverse Osmosis (RO)"
        },
        "Post-Treatment": {
          types: [
            "Permeate disinfection",
            "Chloramine",
            "Irradiation"
          ],
          button: "warning",
          currentType: "Permeate disinfection"
        },
        "Concentrate Management": {
          types: [
            "Submarine Outfalls",
            "Evaporation Ponds",
            "Halophyte Irrigation"
          ],
          button: "danger",
          currentType: "Submarine Outfalls"
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
        "Intake": this.getRandomInts(),
        "Pre-Treatment": this.getRandomInts(),
        "Desalination": this.getRandomInts(),
        "Post-Treatment": this.getRandomInts()
      }
    };

    this.props.setParentState(state_change);

    // this is hacky, id and type aren't data fields 
    const { id, type } = e.target;
    const state = this.state;
    state.subprocesses[id].currentType = type;
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
    // console.log(plant_with_properties);

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
                      <Dropdown.Item onClick={this.handleClick.bind(this)} type={subprocessType} id={subprocess}>
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
