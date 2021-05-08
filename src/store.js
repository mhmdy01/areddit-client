import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import postReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
  posts: postReducer,
  user: userReducer,
  notifications: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
// debugging
// console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

export default store;
