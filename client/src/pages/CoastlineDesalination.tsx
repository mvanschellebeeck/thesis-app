import React from 'react';
import '../index.css';
import { constructTitle } from '../utils/utilFunctions';

import Map from '../components/map';
import Detail from '../components/plantDetailTable';

// import groupedButtons from '../components/groupedButtons';
import { MapState, PlantSummary } from '../utils/Models';
import GroupedButton from '../components/groupedButtons';

export default class CoastlineDesalination extends React.Component<{}, MapState> {
  state = {
    currentlySelectedPlant: {
      description: '',
      title: '',
    },
    plants: {},
  };

  updateCurrentPlant = (currentPlant: PlantSummary) => {
    this.setState({
      currentlySelectedPlant: currentPlant,
    });
  };

  updatePlantData = (plantData: any) => {
    this.setState({
      plants: plantData,
    });
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
