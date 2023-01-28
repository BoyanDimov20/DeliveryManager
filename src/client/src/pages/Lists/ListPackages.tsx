import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Chip from "../../components/Chip/Chip";
import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";
import { useIdentity } from "../../services/authService";


const ListPackages = () => {

    const { data, isLoading } = useQuery('packages', getPackages);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const identity = useIdentity();

    async function getPackages() {
        const response = await fetch('/api/packages');

        return await response.json();
    }

    function editPackage(packageId: string) {
        navigate('/editPackage/' + packageId);
    }

    async function deletePackage(id: string) {

        const response = await fetch(`/api/packages/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            queryClient.invalidateQueries('packages');
            Swal.fire({
                title: 'Изтрита!',
                text: 'Пратка беше изтрита.',
                icon: 'success',
                timer: 2000
            });
        }

    }

    function createPackage() {
        navigate('/createPackage');
    }

    const [filter, setFilter] = useState([] as string[]);

    const clickFilter = (isEnabled: boolean, value: string) => {
        setFilter((prev) => {

            if (isEnabled) {
                return [...prev, value];
            }

            return prev.filter(x => x != value);
        });
    };

    const filters = {
        chips: [
            <Chip key={"За обработка"} label="За обработка" value="Обработва се" onClick={(isEnabled) => clickFilter(isEnabled, "Обработва се")} />,
            <Chip key="За доставка" label="За доставка" value="За доставка" onClick={(isEnabled) => clickFilter(isEnabled, "За доставка")} />,
            <Chip key="В куриер" label="В куриер" value="В куриер" onClick={(isEnabled) => clickFilter(isEnabled, "В куриер")} />,
            <Chip key="Получена" label="Получена" value="Получена" onClick={(isEnabled) => clickFilter(isEnabled, "Получена")} />
        ],
        filterFunction: (data: any) => {
            return data.filter((x: any) => filter.some(y => x['status' as keyof typeof x] == y) || filter.length == 0);
        }
    }

    return (
        <>
            <Navigation />
            {isLoading ? null : <Table Chips={filters.chips} isEditable={identity?.isAdmin} createLabel="Създай пратка" createHandler={createPackage} title="Списък с пратки" labels={data.labels} data={filters.filterFunction(data.data)} updateHandler={editPackage} deleteHandler={deletePackage} />}
        </>
    );
};

export default ListPackages;