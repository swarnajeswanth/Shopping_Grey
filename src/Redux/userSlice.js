import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      // console.log(action.payload);
      state.authUser = action.payload;
      // state.email = action.payload.email;
      // const match = state.email.match(/^([^@]+)@/);
      // if (match) {
      //   state.authUser = match[1];
    },
    logout: (state) => {
      state.authUser = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
