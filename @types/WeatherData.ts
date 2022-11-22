interface WeatherInfo {
    description: string,
    icon: string,
    main: string,
}

export interface WeatherData {
    dt: number;
    dt_txt: string;
    weather: WeatherInfo[],
    wind: {
        deg: number;
        gust: number;
        speed: number;
    },
    main: {
        humidity: number;
        temp: number;
    }
}
