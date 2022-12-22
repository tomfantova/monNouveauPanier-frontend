import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrentListState = {
  value: any;
};

const initialState: CurrentListState = {
  value: null,
};

export const currentListSlice = createSlice({
  name: "currentList",
  initialState,
  reducers: {
    addCurrentList: (
      state: CurrentListState,
      action: PayloadAction<CurrentListState["value"]["categories"]>
    ) => {
      state.value = action.payload;
    },
    addCategory: (state, action: PayloadAction<any>) => {
      state.value.categories.push(action.payload);
    },
    removeCategory: (state: CurrentListState, action: PayloadAction<string>) => {
      state.value.categories = state.value.categories.filter(
        (catData: any) => catData.name !== action.payload
      );
    },
    removeCurrentList: (state: CurrentListState) => {
      state.value = null;
    },
    addArticles: (state, action: PayloadAction<any>) => {
      const targetIndex: number = state.value.categories
        .map((e: any) => e.name)
        .indexOf(action.payload.categoryName);
      state.value.categories[targetIndex].items = action.payload.items;
    },
  },
});

export const {
  addCurrentList,
  addCategory,
  removeCategory,
  removeCurrentList,
  addArticles,
} = currentListSlice.actions;
export default currentListSlice.reducer;
