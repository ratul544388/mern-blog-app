import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { user } = userSlice.actions;

export default userSlice.reducer;
