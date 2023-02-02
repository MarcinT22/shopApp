import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("token");

    return token !== null ? token : null;
  } catch (e) {
    console.log(e);
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (e) {
    // remove error
  }
};

const initialState = {
  token: getToken(),
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
      removeToken();
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
