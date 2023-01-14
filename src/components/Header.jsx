import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="p-3"
      >
        <Container>
          <Navbar.Brand
            style={{ fontFamily: "Pacifico", fontSize: "30px" }}
            href="#home"
          >
            WebLog
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="m-auto"
              style={{
                fontFamily: "Ubuntu Condensed",
                fontSize: "25px",
                color: "black",
              }}
            >
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {user?.result?._id && (
                <>
                  <Nav.Link as={Link} to="/addBlog">
                    Add Blog
                  </Nav.Link>
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                </>
              )}
              {user?.result?._id ? (
                <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
          {user?.result?._id && (
            <div
              style={{
                fontFamily: "Pacifico",
                fontSize: "25px",
              }}
              className="d-flex align-items-center"
            >
              {`Welcome ${user?.result?.name}`}
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
