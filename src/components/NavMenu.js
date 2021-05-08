import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { setUser } from "../reducers/userReducer";

const NavMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const history = useHistory();

  const logOut = () => {
    console.log("loggin out");
    dispatch(setUser(null));
    // dispatch({
    //   type: "INIT_BLOGS",
    //   payload: [],
    // });
    history.push("/");
  };

  return (
    <div>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        collapseOnSelect
        className="ps-3 pe-3"
      >
        <Navbar.Brand as={Link} to="/">
          Areddit
        </Navbar.Brand>
        <Nav className="mr-auto">
          {user !== null && (
            <Nav.Link as={Link} to="/create">
              New Post
            </Nav.Link>
          )}
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ml-auto">
            {user === null && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}

            {user !== null && (
              <Navbar.Text>
                Welcome: <Link to="/profile">{user.username}</Link>{" "}
                <Button variant="primary" size="sm" onClick={logOut}>
                  Log out
                </Button>
              </Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavMenu;
