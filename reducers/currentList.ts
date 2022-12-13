import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: any;
};

const initialState: UserState = {
  value: null,
};

export const currentListSlice = createSlice({
  name: "currentList",
  initialState,
  reducers: {
    addCurrentList: (
      state: UserState,
      action: PayloadAction<UserState["value"]["categories"]>
    ) => {
      state.value = action.payload;
    },
    addCategory: (state, action: PayloadAction<any>) => {
      state.value.categories.push(action.payload);
    },
    removeCategory: (state: UserState, action: PayloadAction<string>) => {
      state.value.categories = state.value.categories.filter(
        (catData: any) => catData.name !== action.payload
      );
    },
    removeCurrentList: (state: UserState) => {
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
