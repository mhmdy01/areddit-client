import postService from "../services/posts";
import { setNotification } from "./notificationReducer";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_POSTS":
      return action.payload;
    case "ADD_POST":
      return [...state, action.payload];
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.payload.id);
    case "EDIT_POST":
      const updatedPost = action.payload;
      return state.map((blog) =>
        blog.id === updatedPost.id ? updatedPost : blog
      );
    case "ADD_COMMENT":
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    case "ADD_REACTION":
      return state.map((post) =>
        post.id === action.payload.id ? action.payload : post
      );
    default:
      return state;
  }
};
export default postReducer;

export const initPosts = () => {
  return async (dispatch) => {
    try {
      const fetchedPosts = await postService.readAll();
      dispatch({
        type: "INIT_POSTS",
        payload: fetchedPosts,
      });
    } catch (error) {
      console.log({ ...error });
    }
  };
};

export const addPost = (postToAdd, history) => {
  return async (dispatch) => {
    try {
      const createdPost = await postService.create(postToAdd);
      dispatch({
        type: "ADD_POST",
        payload: createdPost,
      });
      history.push("/");
    } catch (error) {
      console.log({ ...error });
    }
  };
};

export const removePost = (postToDelete, history) => {
  return async (dispatch) => {
    try {
      await postService.remove(postToDelete);
      dispatch({
        type: "REMOVE_POST",
        payload: postToDelete,
      });
      history.push("/");
    } catch (error) {
      console.log({ ...error });
      let errorMsg = error.response
        ? error.response.data
          ? error.response.data.error
          : error.message
        : error.message;
      if (error.response.status === 404) {
        errorMsg = `error: post (${postToDelete.title.slice(
          0,
          50
        )}) doesn't exist on server`;
        dispatch({
          type: "REMOVE_POST",
          payload: postToDelete,
        });
        history.push("/");
      }
      dispatch(
        setNotification({
          type: "error",
          msg: errorMsg,
        })
      );
    }
  };
};

export const editPost = (changedPost, history) => {
  return async (dispatch) => {
    try {
      const updatedPost = await postService.update(changedPost);
      dispatch({
        type: "EDIT_POST",
        payload: updatedPost,
      });
      history.push(`/posts/${updatedPost.id}`);
    } catch (error) {
      console.log({ ...error });
    }
  };
};

export const addComment = (postToUpdate, comment) => {
  return async (dispatch) => {
    try {
      const updatedPost = await postService.comment(postToUpdate.id, {
        content: comment,
      });
      dispatch({
        type: "ADD_COMMENT",
        payload: updatedPost,
      });
    } catch (error) {
      console.log({ ...error });
    }
  };
};

export const addReaction = (postToUpdate, reaction) => {
  const changedReactions = {
    ...postToUpdate.reactions,
    [reaction]: postToUpdate.reactions[reaction] + 1,
  };
  return async (dispatch) => {
    try {
      // console.log(
      //   "adding reaction",
      //   postToUpdate.reactions,
      //   reaction,
      //   changedReactions
      // );
      // return;
      const updatedPost = await postService.react(
        postToUpdate.id,
        changedReactions
      );
      dispatch({
        type: "ADD_REACTION",
        payload: updatedPost,
      });
    } catch (error) {
      console.log({ ...error });
    }
  };
};
