import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegisterStep {
  step: number;
  title: string;
}

interface RegisterState {
  steps: RegisterStep[];
  showResendButton: boolean;
  currentStep: RegisterStep;
  expires: number;
}
const initialState: RegisterState = {
  steps: [
    {
      step: 1,
      title: "Tạo tài khoản",
    },
    { step: 2, title: "Nhập mã xác nhận" },
    { step: 3, title: "Tạo tài khoản thành công" },
    { step: 4, title: "Số lần xác thực đã quá giới hạn" },
  ],
  showResendButton: false,
  currentStep: {
    step: 1,
    title: "Tạo tài khoản",
  },
  expires: 0,
};
export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    changeStep: (state, action: PayloadAction<number>) => {
      const st = initialState.steps.find((t) => t.step === action.payload);
      if (st) state.currentStep = st;
    },
    showResendButton: (state, action: PayloadAction<boolean>) => {
      state.showResendButton = action.payload;
    },
    changeExpire: (state, action: PayloadAction<number>) => {
      state.expires = action.payload;
    },
    reset: (state) => {
      state.currentStep = initialState.currentStep;
      state.showResendButton = false;
    },
  },
});

export const { changeStep, showResendButton, changeExpire, reset } =
  registerSlice.actions;

export default registerSlice.reducer;
