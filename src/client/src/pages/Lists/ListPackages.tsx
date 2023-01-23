import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

    return (
        <>
            <Navigation />
            {isLoading ? null : <Table isEditable={identity.isAdmin} createLabel="Създай пратка" createHandler={createPackage} title="Списък с пратки" labels={data.labels} data={data.data} updateHandler={editPackage} deleteHandler={deletePackage} />}
        </>
    );
};

export default ListPackages;