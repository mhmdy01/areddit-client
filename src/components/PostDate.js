import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";

const PostDate = ({ post }) => {
  const createdAtAgo = formatDistanceToNow(parseISO(post.createdAt));
  const lastModifiedAgo = formatDistanceToNow(parseISO(post.lastModified));

  return (
    <span title={`${post.createdAt}`}>
      <em>
        {createdAtAgo} ago (last modified: {lastModifiedAgo} ago)
      </em>
    </span>
  );
};

export default PostDate;
