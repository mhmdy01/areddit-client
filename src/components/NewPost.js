import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { addPost } from "../reducers/postReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useField } from "../hooks";

const NewPost = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const title = useField("text");
  const content = useField("text");

  const createPost = (event) => {
    event.preventDefault();
    const postToAdd = {
      title: title.value,
      content: content.value,
    };
    dispatch(addPost(postToAdd, history));
    // title.reset();
    // content.reset();
  };

  const propsWithoutReset = (field) => {
    const { reset, ...others } = field;
    return others;
  };

  const canSave =
    title.value &&
    content.value &&
    title.value.length >= 3 &&
    content.value.length >= 3;

  return (
    <div>
      <h2>Add New Post</h2>
      <Form onSubmit={createPost}>
        <Form.Group>
          <Form.Control
            className="mb-2 mr-sm-2"
            {...propsWithoutReset(title)}
            placeholder="title"
            required
            minLength={3}
          />
          <Form.Text className="text-muted">3 characters or more</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            className="mb-2 mr-sm-2"
            rows={3}
            {...propsWithoutReset(content)}
            placeholder="content"
            required
            minLength={3}
          />
          <Form.Text className="text-muted">3 characters or more</Form.Text>
        </Form.Group>

        <Button type="submit" className="mb-2 mr-2" disabled={!canSave}>
          Add
        </Button>
        <Button variant="danger" className="mb-2 mr-2" as={Link} to="/">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default NewPost;
