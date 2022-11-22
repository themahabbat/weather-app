import Head from 'next/head'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { City as ICity } from '../@types/City'
import City from '../components/City'
import { RootState, useAppDispatch } from '../store'
import Calendar from 'react-calendar'
import { setActiveCity } from '../store/slices/weather'

// - icon for that day
// - temperature
// - wind
// - humidity

export default function Home() {
    const dispatch = useAppDispatch()
    const { cities, activeCity } = useSelector((state: RootState) => state.weather)
    const [date, setDate] = useState<Date>(new Date())


    const fetchWeather = useCallback(() => {
        console.log(activeCity, date)
    }, [activeCity, date])

    const onChangeDate = useCallback((value: Date) => {
        setDate(value)
    }, [])

    const onClickCity = useCallback((city: ICity) => {
        dispatch(setActiveCity(city))
    }, [dispatch])

    useEffect(() => {
        fetchWeather()
    }, [activeCity, fetchWeather])


    const renderCities = useMemo(() => cities.map((city: ICity, idx: number) => (
        <City key={idx}
            city={city}
            onClick={() => onClickCity(city)} />
    )), [cities, onClickCity])

    return (
        <div className='antialiased'>
            <Head>
                <title>Weather App</title>
            </Head>

            <div className='p-20 flex flex-col'>
                <span className='text-5xl font-semibold text-indigo-600'>Weather Forecast</span>

                <div className='flex items-center my-4'>
                    {renderCities}
                </div>

                <div className='flex items-center justify-around'>

                    <div className="flex flex-col">

                        <div className='flex items-center my-4'>
                            <i className='fa-solid fa-cloud text-6xl'></i>

                            <div className="flex flex-col ml-6">
                                <span className='font-bold text-3xl mb-1'>15 ℃</span>
                                <span className='itext-lg'>Cloudy</span>
                            </div>
                        </div>

                        <div className='flex items-center my-4'>
                            <i className='fa-solid fa-sun text-6xl'></i>

                            <div className="flex flex-col ml-6">
                                <span className='font-bold text-3xl mb-1'>15 ℃</span>
                                <span className='itext-lg'>Cloudy</span>
                            </div>
                        </div>

                    </div>
                    <Calendar onChange={onChangeDate} />

                </div>

            </div>

        </div>
    )
}
