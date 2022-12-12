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
    currentList: any | null;
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
      action: PayloadAction<UserState["value"]>
    ) => {
      state.value.currentList = action.payload;
    },
    removeCurrentList: (state: UserState) => {
      state.value.currentList = null;
    },
  },
});

export const { connectUser, addCurrentList, removeCurrentList } =
  userSlice.actions;
export default userSlice.reducer;
