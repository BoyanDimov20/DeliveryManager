import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import TextInput from "../../components/TextInput/TextInput";


const CreateOffice = () => {

    const navigate = useNavigate();

    const [officeName, setOfficeName] = useState('');
    const [address, setAddress] = useState('');

    function saveHandler() {
        fetch('/api/office', {
            method: 'POST',
            body: JSON.stringify({
                name: officeName,
                address: address
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Успешно',
                    text: 'Офисът беше успешно регистриран',
                    timer: 1500
                }).then(() => {
                    navigate('/');
                });
            }
        });
    }

    return (
        <>
            <Navigation />
            <form className="flex flex-col mt-10 items-center h-screen">
                <div className="mb-5 text-lg">Регистрация на офис</div>
                <TextInput required type="text" label="Име на офис" value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
                <TextInput required type="text" label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Създай</Button>
            </form>
        </>
    );
};


export default CreateOffice;