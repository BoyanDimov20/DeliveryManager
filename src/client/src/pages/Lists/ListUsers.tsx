import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../../components/Navigation/Navigation";
import Table from "../../components/Table/Table";

const ListUsers = () => {

    const { data, isLoading } = useQuery('users', getUsers);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    async function getUsers() {
        const response = await fetch('/api/users');
        return await response.json();
    }

    function editUser(userId: string) {
        navigate('/editUser/' + userId);
    }

    async function deleteUser(id: string) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            queryClient.invalidateQueries('users');
            Swal.fire({
                title: 'Изтрит!',
                text: 'Потребителя беше изтрит.',
                icon: 'success',
                timer: 2000
            });
        }
    }

    return (
        <>
            <Navigation />
            {isLoading ? null : <Table isEditable={true} title="Списък с пoтребители" labels={data.labels} data={data.data} updateHandler={editUser} deleteHandler={deleteUser} />}
        </>
    );
};

export default ListUsers;