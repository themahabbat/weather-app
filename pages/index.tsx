import Head from 'next/head'
import { useCallback, useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { City as ICity } from '../@types/City'
import City from '../components/City'
import { RootState, useAppDispatch } from '../store'
import Calendar from 'react-calendar'
import { setActiveCity } from '../store/slices/weather'
import { api } from '../utils/api'
import { OPEN_WEATHER_MAP_API_KEY } from '../api'
import { WeatherData } from '../@types/WeatherData'
import WeatherDetail from '../components/WeatherDetail'
import moment from 'moment'
import { filterList } from '../helpers/weather'


export default function Home() {
    const dispatch = useAppDispatch()
    const { cities, activeCity } = useSelector((state: RootState) => state.weather)
    const [date, setDate] = useState<Date>(new Date())
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [weather, setWeather] = useState<WeatherData[]>([])

    useEffect(() => {
        import("@lottiefiles/lottie-player");
    }, [])

    const fetchWeather = useCallback(async () => {
        try {
            if (activeCity === null) return
            setLoading(true)

            const { lat, lng } = activeCity
            const response = await api.get(`?lat=${lat}&lon=${lng}&units=metric&appid=${OPEN_WEATHER_MAP_API_KEY}`)

            const { data, status } = response

            if (status === 200) {
                const today = moment(date).format('YYYY-MM-DD')
                const filteredData = filterList(data.list, today)

                setWeather(filteredData)
            }
            else {
                setError("Error retrieving weather data")
            }
        } catch (error) {
            setError("Something went wrong")
        }
        finally {
            setLoading(false)
        }
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

    const renderWeatherDetails = useMemo(() => weather.map((weather: WeatherData) => <WeatherDetail key={weather.dt} detail={weather} />), [weather])

    const renderLoading = useMemo(() => {
        if (typeof window !== undefined) return (
            <div className='w-full h-96 flex items-center justify-center p-8'>
                <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_kljxfos1.json" background="transparent" speed="1" className="w-96 h-96" loop autoplay></lottie-player>
            </div>
        )
    }, [])

    const renderData = useMemo(() => (
        <div className='flex items-start justify-between'>
            <div className="flex flex-col w-1/2 h-[460px] overflow-y-scroll pr-4">
                {renderWeatherDetails}
            </div>
            <Calendar onChange={onChangeDate} />
        </div>
    ), [onChangeDate, renderWeatherDetails])

    const renderError = useMemo(() => (
        <div className='w-1/4 bg-indigo-600 px-10 py-4 rounded shadow-lg absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
            <span className='text-white font-semibold text-xl'>{error}</span>
            <button onClick={() => setError(null)} className='w-fit bg-white text-indigo-600 py-1 px-4 rounded mt-4 transition hover:opacity-80'>Close</button>
        </div>
    ), [error])

    return (
        <div className='antialiased bg-gray-100 h-screen'>
            <Head>
                <title>Weather App</title>
            </Head>

            {error !== null && renderError}

            <div className='p-20 flex h-screen flex-col'>
                <span className='text-5xl font-semibold text-indigo-600'>Weather Forecast</span>

                <div className='flex items-center my-4'>
                    {renderCities}
                </div>
                {loading ? renderLoading : renderData}
            </div>

        </div>
    )
}
