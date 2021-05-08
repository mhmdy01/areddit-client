import loginService from "../services/login";
import userService from "../services/users";
import { setNotification } from "./notificationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};
export default userReducer;

export const setUser = (user) => {
  return {
    type: "SET_USER",
    payload: user,
  };
};

export const setLoggedUser = (credentials, history) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials);
      dispatch(setUser(loggedUser));
      dispatch(
        setNotification({
          type: "success",
          msg: `${loggedUser.username} logged in`,
        })
      );
      history.push("/");
    } catch (error) {
      console.log({ ...error });
      const errorMsg = error.response
        ? error.response.data
          ? error.response.data.error
          : error.message
        : error.message;
      dispatch(
        setNotification({
          type: "error",
          msg: errorMsg,
        })
      );
    }
  };
};

export const createUser = (userToAdd, history) => {
  return async (dispatch) => {
    try {
      const createdUser = await userService.create(userToAdd);
      dispatch(
        setNotification({
          type: "success",
          msg: `created user: ${createdUser.username}... redirect to login`,
        })
      );
      history.push("/login");
    } catch (error) {
      console.log({ ...error });
      const errorMsg = error.response
        ? error.response.data
          ? error.response.data.error
          : error.message
        : error.message;
      dispatch(
        setNotification({
          type: "error",
          msg: errorMsg,
        })
      );
    }
  };
};
