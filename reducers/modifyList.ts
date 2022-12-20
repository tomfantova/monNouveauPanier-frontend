import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: Boolean;
};

const initialState: UserState = {
  value: false,
};

export const modifyListSlice = createSlice({
  name: "modifyList",
  initialState,
  reducers: {
    modifyTrue: (state: UserState) => {
      state.value = true;
    },
    modifyFalse: (state: UserState) => {
      state.value = false;
    },
  },
});

export const { modifyTrue, modifyFalse } = modifyListSlice.actions;
export default modifyListSlice.reducer;
