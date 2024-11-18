import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLearn: true,
};

const nonPersistedSlice = createSlice({
  name: "NonPersistedSlice",
  initialState,
  reducers: {
    // setIsLearn: (state) => {
    //   state.isLearn = true;
    // },
    // setIsEarn: (state) => {
    //   state.isLearn = false;
    // },
  },
});

export const {
  // setIsLearn,
  //  setIsEarn
} = nonPersistedSlice.actions;
export const selectNonPersistedValue = (state) => state.nonPersistedSlice.value;
export default nonPersistedSlice.reducer;
