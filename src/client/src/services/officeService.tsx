import { useQuery } from "react-query";


function getOffices() {

    return fetch('/api/office')
        .then(x => x.json())
        .catch(() => { });

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