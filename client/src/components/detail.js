import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

export default class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {

  }

  fetchDummy(title) {
    const d = { plant: title };
    fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(d)
    }).then(res => res.json())
      .then(m => this.setState({ data: m.properties}))
  }

  render() {
    const divStyle = {
      width: '40%',
      float: 'right',
      padding: '20px'
    }

    const { title, description } = this.props;

    if (title) {
      this.fetchDummy(title);
      return (
        <div style={divStyle}>
          <h1><b>{title}</b></h1>
          <p>{description}</p>
          <div>
            <ReactTable
              data={this.state.data}
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
