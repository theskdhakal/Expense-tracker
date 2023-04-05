import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../pages/user/userSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const handleOnLogOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser({}));
        toast.success("user logged out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="#home" className="text-warning fw-bolder">
          <i className="fa-solid fa-money-bill-1-wave "></i> Mgmt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fs-4">
            {user?.uid ? (
              <>
                <Link to="/dashboard" className="nav-link"></Link>
                <Link to="/" className="nav-link">
                  profile
                </Link>

                <Link to="/" className="nav-link">
                  <i
                    className="fa-solid fa-right-from-bracket"
                    onClick={handleOnLogOut}
                    title="Log Out"
                  >
                    logout
                  </i>
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  <i className="fa-solid fa-right-to-bracket" title="Login"></i>
                </Link>
                <Link to="/register" className="nav-link">
                  <i className="fa-solid fa-user-pen" title="Register"></i>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
