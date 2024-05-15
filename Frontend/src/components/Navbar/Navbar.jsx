import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import styles from "./Navbar.module.css"; // Ensure the CSS module is correctly linked

const NavbarComponent = ({ onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"> {/* bg-dark and variant-dark for black background and white text */}
      <Navbar.Brand href="#home" className="ms-5 text-white">
        <span className={styles.navbarHeader}>Farmer's Portal</span> {/* Text is already white due to variant-dark */}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Button onClick={onLogout} variant="outline-light" className="me-5"> {/* outline-light for white outline button */}
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
