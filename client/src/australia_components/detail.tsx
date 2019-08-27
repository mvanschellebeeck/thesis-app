import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "../index.css";

import { constructTitle } from '../utils/utilFunctions';

interface IProps {
  all_plants
  current_plant
}

export default class Detail extends Component<IProps> {
  createColumns(...cols) {
    return cols.map(col => {
      return {
        Header: col,
        accessor: col.toLowerCase()
      };
    });
  }

  emptyTable() {
    return (
      <div>
        <p>Click a desalination plant for details</p>
      </div>
    );
  }

  fillTable(current_plant) {
    const { all_plants } = this.props;
    const plant = all_plants[current_plant.title];
    const plant_with_properties = [];
    Object.keys(plant).forEach(property => {
      plant_with_properties.push({
        property: property,
        value: plant[property]
      });
    });
    //console.log(plant_with_properties)

    return (
      <div>
        {constructTitle(current_plant.title)}
        <p>{current_plant.description}</p>
        <div>
          <ReactTable
            data={plant_with_properties}
            columns={this.createColumns("Property", "Value")}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }

  componentDidMount() {}

  render() {
    const { current_plant } = this.props;
    const detail = current_plant.title
      ? this.fillTable(current_plant)
      : this.emptyTable();

    return <div className="detailContainer">{detail}</div>;
  }
}
