import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import styles from "./Navbar.module.css"; // Ensure the CSS module is correctly linked

const NavbarComponent = ({ onLogout }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" className="ms-5">
        <span className={styles.navbarHeader}>Farmer's Portals</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {" "}
          {/* Updated to ms-auto to push to the right */}
          <Button onClick={onLogout} variant="outline-danger" className="me-5">
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
