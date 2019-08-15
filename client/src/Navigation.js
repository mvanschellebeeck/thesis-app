import React from "react";
import "./index.css";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">WaterWorx</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Desalination" id="basic-nav-dropdown">
            <NavDropdown.Item href="#t1">Regional Analysis</NavDropdown.Item>
            <NavDropdown.Item href="#t2">Technologies</NavDropdown.Item>
          </NavDropdown>

          {/* <NavDropdown
              title="Water Use Reduction"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#t3">topic 1</NavDropdown.Item>
              <NavDropdown.Item href="#t4">topic 2</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="#t5">Rainwater Harvesting</Nav.Link>
            <Nav.Link href="#t6">Greywater Reuse</Nav.Link> */}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default Navigation;
