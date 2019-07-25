import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../index.css'

export default class Detail extends Component {

  constructor(props) {
    super(props);
  }

  createColumns(...cols) {
    return cols.map(col => {
        return {
            Header: col,
            accessor: col.toLowerCase()
        }
    });
  }

  emptyTable() {
    return (
        <div>
            <p>Click a desalination plant for details</p>
        </div>
    );
  }

  fillTable(title) {
    const { description , plants } = this.props;
    const cleanPlants = [];

    Object.keys(plants).forEach( (key) => {
      cleanPlants.push({'property': key, 'value': plants[key]});
    });

    return (
        <div>
            <h1><b>{title}</b></h1>
            <p>{description}</p>
            <div>
                <ReactTable
                    data={cleanPlants}
                    columns={this.createColumns("Property", "Value")}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                <br />
            </div>
        </div>
    );
  }

  componentDidMount() { }

  render() {
    const { title } = this.props;

    const detail = title
    ? this.fillTable(title)
    : this.emptyTable();

    return (
        <div className="detailContainer">
            {detail}
        </div>
    );
  }
}
