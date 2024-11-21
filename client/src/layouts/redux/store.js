import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Update the path if needed

const store = configureStore({
  reducer: {
    user: userReducer, // Add more slices here as needed
  },
});

export default store;
