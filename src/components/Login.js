import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../reducers/userReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useField } from "../hooks";

const Login = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const username = useField("text");
  const password = useField("password");
  const propsWithoutReset = (field) => {
    const { reset, ...others } = field;
    return others;
  };

  const login = (event) => {
    event.preventDefault();
    const credentials = {
      username: username.value,
      password: password.value,
    };

    dispatch(setLoggedUser(credentials, history));
  };

  return (
    <div>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control {...propsWithoutReset(username)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control {...propsWithoutReset(password)} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Form.Text muted>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default Login;
