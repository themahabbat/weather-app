import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../../@types/City";
import { cities } from "../../constants/cities";

export interface WeatherState {
    cities: City[],
    activeCity: City | null;
}

const initialState: WeatherState = {
    cities: cities,
    activeCity: null
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setActiveCity(state: WeatherState, action: PayloadAction<City>) {
            state.activeCity = action.payload
        }
    },
});

export const { setActiveCity } = weatherSlice.actions;

export default weatherSlice.reducer;
