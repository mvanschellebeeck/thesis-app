import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';


import Map from "./components/map";
import Detail from "./components/detail";
import FlowDiagram from "./components/flowDiagram";
import TechnologyRadarChart from "./components/radarChart";
import "./index.css";

export default class App extends React.Component {
  constructor(props) {  

    super(props);
    this.state = {
      plants: {},
      currentlySelectedPlant: {},
      technologyCombinationValues: {
        'Concentrate Management': {
          social: 40, 
          environmental: 60, 
          economic: 80
        },
        'Pre Treatment': {
          social: 10,
          environmental: 40,
          economic: 100
        },
        'Desalination': {
          social: 40,
          environmental: 30, 
          economic: 60
        },
        'Post Treatment': { 
          social: 40, 
          economic: 80, 
          environmental: 60
        },
        'Intake': {
          social: 40,
          environmental: 30,
          economic: 60
        }
      }
    };
  }

  setParentState = dataFromChild => {
    // child is currently either Map or Detail
    this.setState(dataFromChild);
  };

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {/* <div id="output"></div> */}
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">WaterWorx</Navbar.Brand>
          <Nav className="mr-auto">
            <NavDropdown title="Desalination" id="basic-nav-dropdown">
              <NavDropdown.Item href="#t1">
                Regional Analysis
              </NavDropdown.Item>
              <NavDropdown.Item href="#t2">Technologies</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Water Use Reduction"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#t3">topic 1</NavDropdown.Item>
              <NavDropdown.Item href="#t4">topic 2</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#t5">Rainwater Harvesting</Nav.Link>
            <Nav.Link href="#t6">Greywater Reuse</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        {/* <Map
          setParentState={this.setParentState}
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        /> */}
        {/* <Detail
          current_plant={this.state.currentlySelectedPlant}
          all_plants={this.state.plants}
        /> */}
        <FlowDiagram setParentState={this.setParentState}/>
        <TechnologyRadarChart technologyCombinationValues={this.state.technologyCombinationValues}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
