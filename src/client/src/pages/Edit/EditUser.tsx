import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import TextInput from "../../components/TextInput/TextInput";

const EditUser = () => {
    const { id } = useParams();
    const saveHandler = () => {

    };

    const { data, isLoading } = useQuery('users', getUserById);

    async function getUserById() {
        const response = await fetch('/api/users/' + id);
        return await response.json();
    }

    return (
        <>
            <Navigation />
            <form className="flex flex-col justify-center items-center h-screen">
                <div className="mb-5 text-lg">Редакция на потребител</div>
                <TextInput type="text" label="Потребител" value={data?.username ?? ''} />
                <TextInput type="text" label="Име" value={data?.firstName ?? ''} />
                <TextInput type="text" label="Роля" value={data?.role ?? ''} />
                <TextInput type="text" label="Адрес" value={data?.homeAddress ?? ''} />
                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Запази</Button>
            </form>
        </>
    );
};

export default EditUser;