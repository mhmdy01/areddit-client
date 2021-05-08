import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editPost } from "../reducers/postReducer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NewPost = ({ match, history }) => {
  const { id: postId } = match.params;

  const dispatch = useDispatch();
  const postToUpdate = useSelector(({ posts }) => {
    return posts.find((post) => post.id === postId);
  });

  const [title, setTitle] = useState(postToUpdate.title);
  const [content, setContent] = useState(postToUpdate.content);
  const updateTitle = (event) => {
    setTitle(event.target.value);
  };
  const updateContent = (event) => {
    setContent(event.target.value);
  };

  if (!postToUpdate) {
    return <h1>NO POSTS WERE FOUND</h1>;
  }

  const updatePost = (event) => {
    event.preventDefault();
    const changedPost = {
      ...postToUpdate,
      title: title,
      content: content,
    };
    dispatch(editPost(changedPost, history));
  };

  const canSave = title && content && title.length >= 3 && content.length >= 3;

  return (
    <div>
      <h2>Edit Post</h2>
      <Form onSubmit={updatePost}>
        <Form.Group>
          <Form.Control
            className="mb-2 mr-sm-2"
            value={title}
            onChange={updateTitle}
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
            value={content}
            onChange={updateContent}
            placeholder="content"
            required
            minLength={3}
          />
          <Form.Text className="text-muted">3 characters or more</Form.Text>
        </Form.Group>

        <Button type="submit" className="mb-2 mr-2" disabled={!canSave}>
          Save
        </Button>
        <Button
          variant="danger"
          className="mb-2 mr-2"
          as={Link}
          to={`/posts/${postToUpdate.id}`}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default NewPost;
