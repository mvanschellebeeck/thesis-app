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
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">WaterWorx</Navbar.Brand>
          <Nav className="mr-auto">

            <NavDropdown title="Desalination" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                Regional Analysis
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Technologies
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Water Use Reduction" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                topic 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                topic 2
              </NavDropdown.Item>
            </NavDropdown>
            
            <Nav.Link href="#pricing">Rainwater Harvesting</Nav.Link>
            <Nav.Link href="#pricing">Greywater Re-Use</Nav.Link>
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
