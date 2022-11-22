import { City } from "../../@types/City";

interface Props {
    city: City,
    active?: boolean;
    onClick: () => void
}

function City({ city, active, onClick }: Props) {
    return (
        <div onClick={onClick} className={`${active ? 'bg-indigo-600 text-white' : 'bg-indigo-100'} px-4 py-1 rounded mr-4 cursor-pointer transition hover:bg-indigo-500 hover:text-white`}>
            <span>{city.name}</span>
        </div>
    );
}

export default City;
