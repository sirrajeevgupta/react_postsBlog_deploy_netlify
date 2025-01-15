import { configureStore } from "@reduxjs/toolkit";
import countReducer from "../features/counter/counterSlice";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    counter: countReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
