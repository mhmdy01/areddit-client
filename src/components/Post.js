import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removePost } from "../reducers/postReducer";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import PostAuthor from "./PostAuthor";
import PostDate from "./PostDate";
import DeletePost from "./DeletePost";
import PostComments from "./PostComments";
import PostReactions from "./PostReactions";

const Post = ({ history, match }) => {
  const { id: postId } = match.params;

  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const posts = useSelector(({ posts }) => posts);
  const post = posts.find((post) => post.id === postId);
  if (!post) {
    return null;
  }

  const deletePost = () => {
    dispatch(removePost(post, history));
  };

  return (
    <div>
      <Jumbotron>
        <h2>{post.title}</h2>
        <div>
          <PostAuthor post={post} /> <PostDate post={post} />
        </div>
        <p>{post.content}</p>
        <div>
          {user.username === post.user.username && (
            <>
              <Button
                className="mr-2"
                variant="primary"
                as={Link}
                to={`/posts/${post.id}/edit`}
              >
                Edit
              </Button>
              <DeletePost post={post} deletePost={deletePost} />
            </>
          )}
        </div>
        <PostReactions post={post} />
      </Jumbotron>
      <PostComments post={post} />
    </div>
  );
};

export default Post;
