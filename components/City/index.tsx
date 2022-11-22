import { useSelector } from "react-redux";
import { City } from "../../@types/City";
import { RootState } from "../../store";

interface Props {
    city: City,
    onClick: () => void
}

function City({ city, onClick }: Props) {
    const { activeCity } = useSelector((state: RootState) => state.weather)

    const active = activeCity?.name === city.name

    return (
        <div onClick={onClick} className={`${active ? 'bg-indigo-600 text-white' : 'bg-indigo-200'} shadow px-6 py-2 text-xl rounded mr-4 cursor-pointer transition hover:bg-indigo-500 hover:text-white`}>
            <span>{city.name}</span>
        </div>
    );
}

export default City;
