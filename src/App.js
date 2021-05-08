import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Notifications from "./components/Notifications";
import NavMenu from "./components/NavMenu";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import Post from "./components/Post";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import User from "./components/User";
import Profile from "./components/Profile";
import { initPosts } from "./reducers/postReducer";
import { setUser } from "./reducers/userReducer";
import postService from "./services/posts";
import userService from "./services/users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getCachedUser = () => {
      const cachedUserJSON = window.localStorage.getItem("loggedUser");
      if (cachedUserJSON) {
        const cachedUser = JSON.parse(cachedUserJSON);
        dispatch(setUser(cachedUser));
      }
    };
    getCachedUser();
  }, [dispatch]);

  useEffect(() => {
    const setCachedUser = () => {
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    };
    setCachedUser();

    if (!user) {
      return;
    }
    userService.setAuthorizationHeader(user.token);
    postService.setAuthorizationHeader(user.token);
    dispatch(initPosts());
  }, [user, dispatch]);

  return (
    <div className="container-fluid">
      <Router>
        <Notifications />
        <NavMenu />
        <Switch>
          <Route exact path="/">
            {user === null ? <Welcome /> : <Home />}
          </Route>
          <Route exact path="/login">
            {user !== null ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/signup">
            {user !== null ? <Redirect to="/" /> : <SignUp />}
          </Route>
          <Route exact path="/profile">
            {user === null ? <Redirect to="/" /> : <Profile />}
          </Route>
          <Route exact path="/users/:id">
            {user === null ? <Redirect to="/" /> : <User />}
          </Route>
          <Route exact path="/create">
            {user === null ? <Redirect to="/" /> : <NewPost />}
          </Route>
          {/* TODO: limit access to routes below (ie. same as routes above) */}
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/posts/:id/edit" component={EditPost} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
