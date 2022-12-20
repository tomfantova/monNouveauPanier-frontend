import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AllGuidesState = {
  value: any[],
};

const initialState: AllGuidesState = {
  value: [],
};

export const allGuidesSlice = createSlice({
  name: "allGuides",
  initialState,
  reducers: {
    updateAllGuides: (state: AllGuidesState, action: PayloadAction<any>) => {
      if (JSON.stringify(state.value) !== JSON.stringify(action.payload)) {
        console.log('entered true')
        state.value = action.payload
      }
    },
  },
});

export const { updateAllGuides } = allGuidesSlice.actions;
export default allGuidesSlice.reducer;
