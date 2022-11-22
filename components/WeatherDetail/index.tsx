import moment from 'moment';
import Image from 'next/image'

import { WeatherData } from "../../@types/WeatherData";

interface Props {
    detail: WeatherData
}

function WeatherDetail({ detail }: Props) {
    const { dt, dt_txt, main, wind, weather } = detail

    const imgSource = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    const date = moment(dt * 1000).format('MMMM DD')

    return (
        <div className='bg-indigo-200 w-full shadow rounded flex items-center mb-4'>
            <Image
                src={imgSource}
                alt="weather icon"
                width={100}
                height={100}
            />

            <div className="flex flex-col ml-6">
                <div className='mb-1 flex items-center'>
                    <div className='text-xl mr-8 w-40 font-semibold'>{date}</div>
                    <span className='text-2xl text-indigo-800 font-bold'>{main.temp} ℃</span>
                </div>
                <div className="flex items-center">
                    <span className='text-lg mr-4'>{weather[0].main}</span>
                    <span className="mx-4">Wind: {wind.speed}</span>
                    <span className="mx-4">Humidity: {main.humidity}</span>
                </div>
            </div>
        </div>
    );
}

export default WeatherDetail;
