import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("access_token");
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
