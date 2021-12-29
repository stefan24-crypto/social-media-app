import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: { users: [], posts: [] },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
