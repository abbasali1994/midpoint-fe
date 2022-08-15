import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: false,
  reducers: {
    setUser: (state, action) => action.payload
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export const userAccount = (state) => state.user 

export default userSlice.reducer;
