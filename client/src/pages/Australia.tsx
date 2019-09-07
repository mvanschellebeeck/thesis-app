import React from 'react';
import '../index.css';
import { constructTitle } from '../utils/utilFunctions';

import Map from '../components/map';
import Detail from '../components/plantDetailTable';

import { MapState, PlantSummary } from '../utils/Models';

export default class Australia extends React.Component<{}, MapState> {
  state = {
    plants: {},
    currentlySelectedPlant: {
      title: '',
      description: '',
    },
  };

  updateCurrentPlant = (current_plant: PlantSummary) => {
    let state = Object.assign({}, this.state);
    state.currentlySelectedPlant = current_plant;
    this.setState(state);
  };

  updatePlantData = (plant_data: any) => {
    let state = Object.assign({}, this.state);
    state.plants = plant_data;
    this.setState(state);
  };

  render() {
    return (
      <div className="australiaContainer">
        {constructTitle('Desalination in Australia')}
        <Detail
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
        <Map
          updateCurrentPlant={this.updateCurrentPlant}
          updatePlantData={this.updatePlantData}
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
      </div>
    );
  }
}
