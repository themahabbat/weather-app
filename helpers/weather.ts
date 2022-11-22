import { WeatherData } from "../@types/WeatherData";

export const filterList = (data: WeatherData[], filterDate: string) => data.filter((data: WeatherData) => data.dt_txt.includes(filterDate))
