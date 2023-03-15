import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand to="#home">
          <i class="fa-solid fa-dollar-sign"></i>
          <i class="fa-solid fa-money-bill"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-2 gap-2">
            <Link to="/">
              <i className="fa-solid fa-right-to-bracket " title="Login"></i>
            </Link>
            <Link to="/register">
              <i className="fa-solid fa-user-pen" title="Register"></i>
            </Link>
            <Link to="#register">
              <i className="fa-solid fa-right-from-bracket" title="Log Out"></i>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
