import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoading: true,
  userData: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSignIn: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = [];
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { userSignIn, logout, setUser } = userSlice.actions;

export const isSignedIn = (state) => state.user.token;
export const getUserData = (state) => state.user.userData;

export default userSlice.reducer;
