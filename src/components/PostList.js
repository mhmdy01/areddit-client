import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import PostReactions from "./PostReactions";

const PostList = () => {
  const posts = useSelector(({ posts }) => {
    // sort by date (newest first)
    return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  });

  return (
    <div>
      <div>
        {posts.map((post) => (
          <Card key={post.id}>
            <Card.Body>
              <Card.Title>{post.title.slice(0, 50)}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <PostAuthor post={post} /> <PostDate post={post} />
              </Card.Subtitle>
              <Card.Text>{post.content.slice(0, 50)}</Card.Text>
              <PostReactions post={post} />
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" as={Link} to={`/posts/${post.id}`}>
                Read more
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostList;
