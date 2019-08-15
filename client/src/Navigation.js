import React from "react";
import "./index.css";
import { LinkContainer } from "react-router-bootstrap";

import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">WaterWorx</Navbar.Brand>
        <Nav className="mr-auto">
          <NavDropdown title="Desalination" id="basic-nav-dropdown">
            <LinkContainer to="/australia">
              <NavDropdown.Item>Regional Analysis</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/technologies">
              <NavDropdown.Item>Technologies</NavDropdown.Item>
            </LinkContainer>
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
