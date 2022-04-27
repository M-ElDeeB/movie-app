import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";
import "./Navbar.css";

const Navbars = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <Navbar
      sticky="top"
      bg=""
      expand="lg"
      variant="dark"
      className=" navbar px-md-3"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="fw-bolder">
          Noxe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="align-items-center">
          {user && (
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/tvshow">
                Tv show
              </Nav.Link>
              <Nav.Link as={Link} to="/people">
                People
              </Nav.Link>
            </Nav>
          )}

          <Nav className="ms-auto my-2 my-lg-0  ">
            {user && (
              <Nav.Link as={Link} to="search">
                <i className="me-1  fa-solid fa-magnifying-glass searchIcon"></i>{" "}
                Search
              </Nav.Link>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to="Register">Register</Nav.Link>
                <Nav.Link as={Link} to="login">
                  Login
                </Nav.Link>
              </>
            )}
            {user && <Nav.Link onClick={logout}>Logout</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
