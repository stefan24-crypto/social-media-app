import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models";
import { Post } from "../models";

interface state {
  users: User[] | [];
  posts: Post[] | [];
}

const initialState: state = {
  users: [],
  posts: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
