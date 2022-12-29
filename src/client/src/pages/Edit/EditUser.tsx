import Button from "../../components/Button/Button";
import TextInput from "../../components/TextInput/TextInput";

const EditUser = () => {

    const saveHandler = () => {

    };

    return (
        <form className="flex flex-col justify-center items-center h-screen">
            <div className="mb-5 text-lg">Редакция на потребител</div>
            <TextInput type="text" label="Потребител" />
            <TextInput type="text" label="Име" />
            <TextInput type="text" label="Роля" />
            <TextInput type="text" label="Адрес" />
            <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Запази</Button>
        </form>
    );
};

export default EditUser;