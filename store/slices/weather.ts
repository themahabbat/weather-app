import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface WeatherState {
}

// Initial state
const initialState: WeatherState = {
};

// Actual Slice
export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    // setAuthState(state, action) {
    //   state.authState = action.payload;
    // },
  },
});

export const {  } = weatherSlice.actions;

export default weatherSlice.reducer;
