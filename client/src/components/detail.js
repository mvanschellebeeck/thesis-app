import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class Detail extends Component {

  componentDidMount() {

  }

  render() {
    const divStyle = {
      width: '40%',
      float: 'right',
      padding: '20px'
    }
    const { title, description, icon } = this.props.details;
    
    //const { title, description, icon } = this.props.details;
    const data = [{'property': 'capacity', 'value': '500GL'}, {'property': 'energy usage', 'value': '20 something'},
    {'property': 'skrr', 'value': 'dide'}];

    if (title) {
      return (
        <div style={divStyle}>
          <h1><b>{title}</b></h1>
          <p>{description}</p>
          <div>
            <ReactTable
              data={data}
              columns={[
                {
                  columns: [
                    {
                      Header: "Property",
                      accessor: "property"
                    }
                  ]
                },
                {
                  columns: [
                    {
                      Header: "Value",
                      accessor: "value"
                    }
                  ]
                }
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            <br />
            </div>  
        </div>
      );
    }
    else {
      return (<div style={divStyle}><p>Click a desalination plant for details</p></div>);
    }
  }
}
//https://docs.google.com/spreadsheets/d/1ByXhNNXjQsJmthiWwn4cfgId32rdCRY6L6rH0R-B20U/edit#gid=0
