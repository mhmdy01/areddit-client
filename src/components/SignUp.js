import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createUser } from "../reducers/userReducer";
import { useField } from "../hooks";

const SignUp = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const username = useField("text");
  const name = useField("text");
  const password = useField("password");
  const propsWithoutReset = (field) => {
    const { reset, ...others } = field;
    return others;
  };

  const signup = (event) => {
    event.preventDefault();
    const userToAdd = {
      username: username.value,
      name: name.value,
      password: password.value,
    };

    dispatch(createUser(userToAdd, history));
  };

  return (
    <div>
      <Form onSubmit={signup}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...propsWithoutReset(username)}
            required
            minLength={3}
          />
          <Form.Text muted>Must be 3 characters or more.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control {...propsWithoutReset(name)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...propsWithoutReset(password)}
            required
            minLength={3}
          />
          <Form.Text muted>Must be 3 characters or more.</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <Form.Text muted>
          Already have an account? <Link to="/login">Log In</Link>
        </Form.Text>
      </Form>
    </div>
  );
};

export default SignUp;
