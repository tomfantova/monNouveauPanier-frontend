import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: any;
};

const initialState: UserState = {
  value: null,
};

export const executedListSlice = createSlice({
  name: "executedList",
  initialState,
  reducers: {
    addExecutedList: (
      state: UserState,
      action: PayloadAction<UserState["value"]["categories"]>
    ) => {
      state.value = action.payload;
    },
    removeExecutedList: (state: UserState) => {
      state.value = null;
    },
    changeArticleStatus: (state, action: PayloadAction<any>) => {
      const targetIndex: number = state.value.categories
        .map((e: any) => e.name)
        .indexOf(action.payload.categoryName);
      const targetIndex2: number = state.value.categories[targetIndex].items
        .map((e: any) => e.name)
        .indexOf(action.payload.articleName);
      state.value.categories[targetIndex].items[targetIndex2].active =
        !state.value.categories[targetIndex].items[targetIndex2].active;
    },
  },
});

export const { addExecutedList, removeExecutedList, changeArticleStatus } =
  executedListSlice.actions;
export default executedListSlice.reducer;
