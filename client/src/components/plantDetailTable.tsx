import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../index.css';
import { MapProps as DetailProps, PlantSummary } from '../utils/Models';
import { constructTitle } from '../utils/utilFunctions';

interface IPlantWithProperties {
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

  fillTable(currentPlant: PlantSummary) {
    const { all_plants } = this.props;
    const plant = all_plants[currentPlant.title];
    const plantWithProperties: IPlantWithProperties[] = [];
    Object.keys(plant).forEach(property => {
      plantWithProperties.push({
        property,
        value: plant[property],
      });
    });

    return (
      <div>
        {constructTitle(currentPlant.title)}
        <p>{currentPlant.description}</p>
        <div>
          <ReactTable
            data={plantWithProperties}
            columns={this._createColumns('Property', 'Value')}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }

  render() {
    const { current_plant } = this.props;
    const detail = current_plant.title
      ? this.fillTable(current_plant)
      : this._emptyTable();

    return <div className="detailContainer">{detail}</div>;
  }
}
