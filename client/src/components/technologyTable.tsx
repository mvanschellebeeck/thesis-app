import React, { Component } from 'react';
import '../index.css';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

import {
  Subprocess,
  SubprocessButtonState,
  SubprocessWithType,
  TechnologyParentState,
  TechnologyImpactValues,
} from '../utils/Models';

import { Dropdown, DropdownButton, ButtonToolbar } from 'react-bootstrap';

export default class TechnologyTable extends Component<
  TechnologyParentState,
  SubprocessButtonState
> {
  state = {
    Intake: {
      types: ['Sub-surface', 'Open-ocean', 'Offshore'],
      button: 'primary',
      currentType: 'Sub-surface',
    },
    'Pre-Treatment': {
      types: [
        'Sand Filtration & Candle Filtration',
        'Ultra Filtration & Micro Filtration',
        'Coagulation & Flocculation',
      ],
      button: 'secondary',
      currentType: 'Sand Filtration & Candle Filtration',
    },
    Desalination: {
      types: [
        'Reverse Osmosis (RO)',
        'Multiple-Effect Distillation (MED)',
        'Multi-stage Flash Distillation (MSF)',
        'Electrodialysis (ED)',
      ],
      button: 'success',
      currentType: 'Reverse Osmosis (RO)',
    },
    'Post-Treatment': {
      types: ['Permeate disinfection', 'Chloramine', 'Irradiation'],
      button: 'warning',
      currentType: 'Permeate disinfection',
    },
    'Concentrate Management': {
      types: [
        'Submarine Outfalls',
        'Evaporation Ponds',
        'Halophyte Irrigation',
      ],
      button: 'danger',
      currentType: 'Submarine Outfalls',
    },
  };

  _getRandomInts = () => {
    // 0 - 100
    return {
      social: Math.floor(Math.random() * 100),
      environmental: Math.floor(Math.random() * 100),
      economic: Math.floor(Math.random() * 100),
    };
  };

  _handleClick = (e: any) => {
    // generate random for now
    const state_change: TechnologyImpactValues = {
      technologyCombinationValues: {
        'Concentrate Management': this._getRandomInts(),
        Intake: this._getRandomInts(),
        'Pre-Treatment': this._getRandomInts(),
        Desalination: this._getRandomInts(),
        'Post-Treatment': this._getRandomInts(),
      },
    };

    this.props.setParentState(state_change);

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

  render() {
    const subprocess_with_type: SubprocessWithType[] = this._getSubprocessesWithType();

    return (
      <div>
        <div>
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
                        onClick={this._handleClick}
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
          <ReactTable
            data={subprocess_with_type}
            columns={this._createColumns('Subprocess', 'Type')}
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
