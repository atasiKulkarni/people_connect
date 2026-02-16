import { createSlice } from '@reduxjs/toolkit';

const exampleSlice = createSlice({
  name: 'example',
  initialState: {},
  reducers: {
    exampleReducer: (state, action) => {
      // Reducer logic here
    },
  },
});

export const { exampleReducer } = exampleSlice.actions;
export default exampleSlice.reducer;
