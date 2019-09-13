import axios from 'axios';
import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../index.css';

import { ButtonToolbar, Dropdown, DropdownButton } from 'react-bootstrap';

import {
  Subprocess,
  SubprocessButtonState,
  SubprocessWithType,
  TechnologyImpactValues,
  TechnologyParentState,
} from '../utils/Models';

export default class TechnologyTable extends Component<
  TechnologyParentState,
  SubprocessButtonState
> {
  state = {} as SubprocessButtonState;

  componentDidMount() {
    axios.get('/mongodb/technologyTypes').then(plants => {
      const data = plants.data[0];
      delete data._id;
      this.setState(data as SubprocessButtonState);
    });
  }

  getRandomInts = () => {
    // 0 - 100
    return {
      economic: Math.floor(Math.random() * 100),
      environmental: Math.floor(Math.random() * 100),
      social: Math.floor(Math.random() * 100),
    };
  };

  handleClick = (e: any) => {
    // generate random for now
    const stateChange: TechnologyImpactValues = {
      technologyCombinationValues: {
        'Concentrate Management': this.getRandomInts(),
        Intake: this.getRandomInts(),
        'Pre-Treatment': this.getRandomInts(),
        Desalination: this.getRandomInts(),
        'Post-Treatment': this.getRandomInts(),
      },
    };

    this.props.setParentState(stateChange);

    // this is hacky, id and type aren't data fields
    const { id, type } = e.target;
    const state = this.state;
    state[id as Subprocess].currentType = type;
    this.setState(state);
  };

  _createColumns(...cols: string[]) {
    return cols.map(col => {
      return {
        Header: col,
        accessor: col.toLowerCase(),
      };
    });
  }

  _getSubprocessesWithType(): SubprocessWithType[] {
    const result: SubprocessWithType[] = [];
    Object.keys(this.state).forEach(subprocess => {
      result.push({
        subprocess: subprocess as Subprocess,
        type: this.state[subprocess as Subprocess].currentType,
      });
    });
    return result;
  }

  _getButtonDropdowns() {
    return (
      <div className="buttonToolbar">
        <ButtonToolbar>
          {Object.keys(this.state).map(subprocess => (
            <DropdownButton
              title={subprocess}
              variant={this.state[subprocess as Subprocess].button}
              id={`mydropdown-${subprocess}`}
              key={subprocess}
              size="sm"
            >
              {this.state[subprocess as Subprocess].types.map(
                subprocessType => (
                  <Dropdown.Item
                    onClick={this.handleClick}
                    type={subprocessType}
                    id={subprocess}
                  >
                    {subprocessType}
                  </Dropdown.Item>
                ),
              )}
            </DropdownButton>
          ))}
        </ButtonToolbar>
      </div>
    );
  }

  _getTable() {
    const subprocessWithType: SubprocessWithType[] = this._getSubprocessesWithType();
    return (
      <ReactTable
        data={subprocessWithType}
        columns={this._createColumns('Subprocess', 'Type')}
        defaultPageSize={5}
        className="-striped -highlight technologyTable"
        showPageSizeOptions={false}
        showPagination={false}
      />
    );
  }

  render() {
    return (
      <div>
        <div>
          {this._getButtonDropdowns()}
          {this._getTable()}
          <br />
        </div>
      </div>
    );
  }
}
