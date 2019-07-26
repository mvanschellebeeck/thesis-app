import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import Map from "./components/map";
import Detail from "./components/detail";
import "./index.css";

export default class App extends React.Component {
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

  componentDidMount() {}

  render() {
    return (
      <div>
        <Map
          setParentState={this.setParentState}
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
        <Detail
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
