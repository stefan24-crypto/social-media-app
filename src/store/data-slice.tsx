import { createSlice } from "@reduxjs/toolkit";
import { DM, User } from "../models";
import { Post } from "../models";
import { DUMMY_DMS } from "../dummy";

interface state {
  users: User[] | [];
  posts: Post[] | [];
  dms: DM[] | [];
}

const initialState: state = {
  users: [],
  posts: [],
  dms: DUMMY_DMS,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setDms(state, action) {
      state.posts = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
