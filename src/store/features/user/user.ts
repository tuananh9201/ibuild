import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { User } from "src/lib/types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});
export const { fetchCurrentUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentUser = (state: RootState) => state.user;

export default userSlice.reducer;
