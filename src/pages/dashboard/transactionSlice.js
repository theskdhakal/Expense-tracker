import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trans: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTrans: (state, action) => {
      state.trans = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;

export const { setUser } = actions;

export default reducer;
