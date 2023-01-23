import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import SelectInput from "../../components/TextInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";


const roles = [
    {
        display: 'Клиент',
        value: 0
    },
    {
        display: 'Консултант',
        value: 1
    },
    {
        display: 'Куриер',
        value: 2
    },
    {
        display: 'Админ',
        value: 3
    }
];

const EditUser = () => {
    const { id } = useParams();
    const saveHandler = async () => {
        const response = await fetch('/api/users', {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                name: name,
                role: Number(role),
                address: address
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(response.ok) {
            Swal.fire('Запазен!',
                'Потребителя беше запазен.',
                'success'
            );
        }
    };

    const { data, isLoading } = useQuery(['user', id], getUserById);

    async function getUserById() {
        const response = await fetch('/api/users/' + id);
        return await response.json();
    }

    const [name, setName] = useState('');
    const [role, setRole] = useState<string | number>(0);
    const [address, setAddress] = useState('');

    useEffect(() => {
        setName(data?.firstName ?? '');
        setRole(data?.role ?? 0);
        setAddress(data?.homeAddress ?? '');
    }, [data]);

    return (
        <>
            <Navigation />
            <form className="flex flex-col justify-center items-center h-screen">
                <div className="mb-5 text-lg">Редакция на потребител</div>
                <TextInput type="text" label="Потребител" value={data?.username ?? ''} />
                <TextInput type="text" label="Име" value={name} onChange={(e) => setName(e.target.value)} />
                <SelectInput label="Роля" options={roles} value={role} onChange={(e) => setRole(e.target.value)} />
                <TextInput type="text" label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Запази</Button>
            </form>
        </>
    );
};

export default EditUser;