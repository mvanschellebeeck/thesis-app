import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../index.css'

export default class Detail extends Component {

  constructor(props) {
    super(props);
  }

  constructColumns(...cols) {
    return cols.map(col => {
        return {
            Header: col,
            accessor: col.toLowerCase()
        }
    });
  }

  componentDidMount() { }

  render() {
    const { title, description , plants } = this.props;
    const cleanPlants = [];

    Object.keys(plants).forEach( (key) => {
      cleanPlants.push({'property': key, 'value': plants[key]});
    });

    if (title) {
      return (
        <div className="detailContainer">
          <h1><b>{title}</b></h1>
          <p>{description}</p>
          <div>
            <ReactTable
              data={cleanPlants}
              columns={this.constructColumns("Property", "Value")}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />
          </div>  
        </div>
      );
    }
    else {
      return (<div className="detailContainer"><p>Click a desalination plant for details</p></div>);
    }
  }
}
