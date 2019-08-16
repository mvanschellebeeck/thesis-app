import React from "react";
import "./index.css";

import Map from "./australia_components/map";
import Detail from "./australia_components/detail";

export default class Australia extends React.Component {
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

  constructTitle = (title) => {
    return (<div>
      <h1 className="detailTitle">
        <b>{title}</b>
      </h1>
      </div>);
  }

  render() {
    return (
      <div className="australiaContainer">
        {this.constructTitle("Desalination in Australia")}
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
