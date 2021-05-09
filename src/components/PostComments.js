import React from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addComment } from "../reducers/postReducer";
import { useField } from "../hooks";

const NewComment = ({ post }) => {
  const dispatch = useDispatch();

  const comment = useField("text");
  const propsWithoutReset = (field) => {
    const { reset, ...others } = field;
    return others;
  };

  const createComment = (event) => {
    event.preventDefault();
    dispatch(addComment(post, comment.value));
    comment.reset();
  };

  return (
    <div>
      <Form inline onSubmit={createComment}>
        <Form.Control
          className="mb-2 mr-sm-2"
          {...propsWithoutReset(comment)}
          placeholder="type your comment"
          required
        />
        <Button variant="secondary">comment</Button>
      </Form>
    </div>
  );
};

const Comments = ({ post }) => {
  return (
    <div>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment.date}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

const PostComments = ({ post }) => {
  return (
    <div>
      <h3>Leave a comment</h3>
      <NewComment post={post} />
      <Comments post={post} />
    </div>
  );
};

export default PostComments;
