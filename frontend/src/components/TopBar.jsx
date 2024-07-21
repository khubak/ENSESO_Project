import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../assets/e_logo_white.svg";

const TopBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Nav className="w-100 justify-content-between align-items-center">
          <Navbar.Brand href="/">
            <img 
              src={logo}
              width="109"
              alt="Logo"
            />
          </Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Economic Operators
          </Nav.Link>
          <Nav.Link as={Link} to="/add">
            Add Economic Operator
          </Nav.Link>
          <Nav.Link as={Link} to="/logout">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopBar;
