import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import userService from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);

  const userId = useParams().id;

  useEffect(() => {
    // return;
    const fetchUser = async () => {
      const fetchedUser = await userService.read(userId);
      setUser(fetchedUser);
    };
    try {
      fetchUser();
    } catch (error) {
      console.log({ ...error });
    }
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name || user.username}</h2>
      <h3>posts</h3>
      <ListGroup>
        {user.posts.map((post) => (
          <ListGroup.Item key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
