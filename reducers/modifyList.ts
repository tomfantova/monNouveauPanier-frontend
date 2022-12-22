import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModifyListState = {
  value: Boolean;
};

const initialState: ModifyListState = {
  value: false,
};

export const modifyListSlice = createSlice({
  name: "modifyList",
  initialState,
  reducers: {
    modifyTrue: (state: ModifyListState) => {
      state.value = true;
    },
    modifyFalse: (state: ModifyListState) => {
      state.value = false;
    },
  },
});

export const { modifyTrue, modifyFalse } = modifyListSlice.actions;
export default modifyListSlice.reducer;
