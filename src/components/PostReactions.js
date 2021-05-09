import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { addReaction } from "../reducers/postReducer";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const PostReactions = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        variant="light"
        key={name}
        className="mt-2 mr-2"
        onClick={() => {
          dispatch(addReaction(post, name));
        }}
      >
        {emoji}
        <Badge variant="light">{post.reactions[name]}</Badge>
      </Button>
    );
  });

  return <div>{reactionButtons}</div>;
};

export default PostReactions;
