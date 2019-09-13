import React from 'react';
import '../index.css';

import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <LinkContainer to="/">
          <Navbar.Brand>WaterWorx</Navbar.Brand>
        </LinkContainer>
        <Nav className="mr-auto">
          <LinkContainer to="/technologies">
            <Nav.Link>Technologies</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/australia">
            <Nav.Link>Regional Analysis</Nav.Link>
          </LinkContainer>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
}
