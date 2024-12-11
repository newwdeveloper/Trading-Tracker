import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  input: [],
};
const formSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    addInput: (state, action) => {
      state.input.push(action.payload);
    },
    editInput: (state, action) => {
      const { index, updatedData } = action.payload; //payload holds index and updated data
      if (state.input[index]) {
        state.input[index] = { ...state.input[index], ...updatedData };
      }
    },
    deleteInput: (state, action) => {
      const indexToDelete = action.payload;
      state.input = state.input.filter(
        (list, index) => index !== indexToDelete
      );
    },
  },
});

export const { addInput, editInput, deleteInput } = formSlice.actions;
export default formSlice.reducer;
