import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegisterState {
  step: number;
  title: string;
}
const steps: RegisterState[] = [
  {
    step: 1,
    title: "Tạo tài khoản",
  },
  { step: 2, title: "Nhập mã xác nhận" },
  { step: 3, title: "Tạo tài khoản thành công" },
];

const initialState: RegisterState = {
  step: 1,
  title: "Tạo tài khoản",
};
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<number>) => {
      const st = steps.find((t) => t.step === action.payload);
      if (st) {
        state.step = action.payload;
        state.title = st.title;
      }
    },
  },
});

export const { changeStep } = registerSlice.actions;

export default registerSlice.reducer;
