import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    password: string | null;
    preferences: {
      type: number | null,
      dietetique: number | null,
      bilan: number | null,
      ethique: number | null,
      local: number | null,
      agriculture: number | null,
    }
  };
};

const initialState: UserState = {
  value: {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    preferences: {
      type: null,
      dietetique: null,
      bilan: null,
      ethique: null,
      local: null,
      agriculture: null,
    }
  },
};

export const userSlice = createSlice({
  name: "signUpProcess",
  initialState,
  reducers: {
    addUserInfos: (state: UserState, action: PayloadAction<any>) => {
      state.value.firstname = action.payload.firstname;
      state.value.lastname = action.payload.lastname;
      state.value.email = action.payload.email;
      state.value.password = action.payload.password;
    },
    addUserPreference: (state: UserState, action: PayloadAction<any>) => {
      state.value.preferences.type = action.payload.type;
    },
    addUserType: (state: UserState, action: PayloadAction<any>) => {
      state.value.preferences.dietetique = action.payload.dietetique;
      state.value.preferences.bilan = action.payload.bilan;
      state.value.preferences.ethique = action.payload.ethique;
      state.value.preferences.local = action.payload.local;
      state.value.preferences.agriculture = action.payload.agriculture;
    },
    reset: (state: UserState) => {
      state.value = initialState.value
    },
  },
});

export const { addUserInfos, addUserPreference, addUserType, reset } =
  userSlice.actions;
export default userSlice.reducer;