import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface state {
  curUser: User | null;
}
const initialState: state = {
  curUser: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser(state, action) {
      state.curUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
