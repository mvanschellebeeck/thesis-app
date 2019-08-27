import React from "react";
import "./index.css";
import { constructTitle } from './utils/utilFunctions';

import Map from "./australia_components/map";
import Detail from "./australia_components/detail";

interface IState {
  plants: any,
  currentlySelectedPlant: any
}
interface IProps {}

export default class Australia extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      plants: {},
      currentlySelectedPlant: {}
    };
  }

  setParentState = dataFromChild => {
    // child is currently either Map or Detail
    this.setState(dataFromChild);
  };


  render() {
    return (
      <div className="australiaContainer">
        {constructTitle("Desalination in Australia")}
        <Detail
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
        <Map
          setParentState={this.setParentState}
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
      </div>
    );
  }
}
