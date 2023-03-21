import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user";
import authReducer from "./features/auth/auth";
import registerReducer from "./features/auth/register";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  register: registerReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
