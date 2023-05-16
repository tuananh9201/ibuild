import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  unAuthorized: boolean;
}

const initialState: AuthState = {
  accessToken: null,
  unAuthorized: true,
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.unAuthorized = false;
      state.accessToken = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_type");
      localStorage.removeItem("search_type");
      state.unAuthorized = true;
    },
    unAuthorized: (state) => {
      state.unAuthorized = true;
    },
  },
});

export const { login, logout, unAuthorized } = authSlice.actions;

export default authSlice.reducer;
