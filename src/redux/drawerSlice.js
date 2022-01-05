import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen: false
  },
  reducers: {
    toggleDrawer: (state) => {
        state.isOpen = !state.isOpen;
    },
    setDrawerState: (state,action) => {
      state.isOpen = action.payload;
    }
  }
});

export const { toggleDrawer, setDrawerState } = drawerSlice.actions;
export default drawerSlice.reducer;