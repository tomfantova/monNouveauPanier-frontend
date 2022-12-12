import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    token: string | null;
    preferences: {};
    bookmarks: {
      interviews: string[];
      generalities: string[];
      products: string[];
      labels: string[];
    };
    lists: any[];
    currentList: any;
  };
};

const initialState: UserState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    token: null,
    preferences: {},
    bookmarks: {
      interviews: [],
      generalities: [],
      products: [],
      labels: [],
    },
    lists: [],
    currentList: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    connectUser: (
      state: UserState,
      action: PayloadAction<UserState["value"]>
    ) => {
      state.value = action.payload;
    },
    addCurrentList: (
      state: UserState,
      action: PayloadAction<UserState["value"]["currentList"]>
    ) => {
      state.value.currentList = action.payload;
    },
    addCategory: (state, action: PayloadAction<any>) => {
      state.value.currentList.categories.push(action.payload);
    },
    removeCategory: (state: UserState, action: PayloadAction<string>) => {
      state.value.currentList.categories =
        state.value.currentList.categories.filter(
          (catData: any) => catData.name !== action.payload
        );
    },
    removeCurrentList: (state: UserState) => {
      state.value.currentList = null;
    },
  },
});

export const {
  connectUser,
  addCurrentList,
  addCategory,
  removeCategory,
  removeCurrentList,
} = userSlice.actions;
export default userSlice.reducer;
