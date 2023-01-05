import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    date: Date | null;
    token: string | null;
    preferences: {
      type: number | null;
      dietetique: number | null;
      bilan: number | null;
      ethique: number | null;
      local: number | null;
      agriculture: number | null;
    };
    bookmarks: any[];
    lists: any[];
  };
};

const initialState: UserState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    date: null,
    token: null,
    preferences: {
      type: null,
      dietetique: null,
      bilan: null,
      ethique: null,
      local: null,
      agriculture: null,
    },
    bookmarks: [],
    lists: [],
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
    logoutUser: (state: UserState) => {
      state.value = initialState.value;
    },
    addList: (state, action: PayloadAction<any>) => {
      state.value.lists.push(action.payload);
    },
    changeListStatus: (state, action: PayloadAction<any>) => {
      const targetIndex: number = state.value.lists
        .map((e: any) => e.id)
        .indexOf(action.payload.id);
      state.value.lists[targetIndex].active =
        !state.value.lists[targetIndex].active;
      state.value.lists[targetIndex].date = action.payload.date;
    },
    deleteList: (state, action: PayloadAction<any>) => {
      state.value.lists = state.value.lists.filter(
        (e) => e.id !== action.payload
      );
    },
    addBookmark: (state, action: PayloadAction<any>) => {
      state.value.bookmarks.push(action.payload);
    },
    deleteBookmark: (state, action: PayloadAction<any>) => {
      state.value.bookmarks = state.value.bookmarks.filter(
        (e) => e !== action.payload
      );
    },
  },
});

export const {
  connectUser,
  logoutUser,
  addList,
  changeListStatus,
  deleteList,
  addBookmark,
  deleteBookmark,
} = userSlice.actions;
export default userSlice.reducer;
