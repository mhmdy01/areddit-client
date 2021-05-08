import React from "react";
import { Link } from "react-router-dom";

const PostAuthor = ({ post }) => {
  return (
    <span>
      posted by{" "}
      <Link to={`/users/${post.user.id}`}>
        {post.user.name || post.user.username}
      </Link>
    </span>
  );
};

export default PostAuthor;
