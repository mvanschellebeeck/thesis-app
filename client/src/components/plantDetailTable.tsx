import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../index.css';

import { constructTitle } from '../utils/utilFunctions';
import { MapProps as DetailProps, PlantSummary } from '../utils/Models';

interface plantWithProperties {
  property: string;
  value: any;
}

export default class Detail extends Component<DetailProps> {
  _createColumns(...cols: string[]) {
    return cols.map(col => {
      return {
        Header: col,
        accessor: col.toLowerCase(),
      };
    });
  }

  _emptyTable() {
    return (
      <div>
        <p>Click a desalination plant for details</p>
      </div>
    );
  }

  fillTable(current_plant: PlantSummary) {
    const { all_plants } = this.props;
    const plant = all_plants[current_plant.title];
    const plant_with_properties: plantWithProperties[] = [];
    Object.keys(plant).forEach(property => {
      plant_with_properties.push({
        property: property,
        value: plant[property],
      });
    });

    return (
      <div>
        {constructTitle(current_plant.title)}
        <p>{current_plant.description}</p>
        <div>
          <ReactTable
            data={plant_with_properties}
            columns={this._createColumns('Property', 'Value')}
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
      : this._emptyTable();

    return <div className="detailContainer">{detail}</div>;
  }
}
