import { useQuery } from "react-query";


async function getOffices() {

    const response = await fetch('/api/office');

    return await response.json();
}

type OfficeProps = {
    id: string,
    name: string,
    address: string
};

export const useOffices = () => {

    const { data } = useQuery('offices', getOffices, {
        staleTime: 60000
    });


    return data as OfficeProps[];
};

export const useOfficesOptions = () => {
    const data = useOffices() ?? [];

    return data.map(x => {
        return {
            display: `${x.name} (${x.address})`,
            value: x.id
        }
    });
};