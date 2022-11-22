import axios from "axios";
import { OPEN_WEATHER_API } from "../api";

export const api = axios.create({
    baseURL: OPEN_WEATHER_API,
    timeout: 15000,
    headers: {  }
});
