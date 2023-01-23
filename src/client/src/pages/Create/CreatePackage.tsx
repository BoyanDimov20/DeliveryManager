import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import SelectInput from "../../components/TextInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";
import { DeliveryStatusOptions, DeliveryTypesOptions } from "../../enums";


const CreatePackage = () => {

    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [deliveryType, setDeliveryType] = useState(0);
    const [weight, setWeight] = useState('');

    async function saveHandler() {
        const response = await fetch('/api/packages', {
            method: 'POST',
            body: JSON.stringify({
                receiverName: receiverName,
                deliveryAddress: address,
                deliveryType: deliveryType,
                weight: weight,
                officeId: ''
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                title: 'Изпратена!',
                text: 'Пратка беше изпратена за обработка.',
                icon: 'success',
                timer: 2000
            }).then(() => {
                navigate('/packages');
            });
        }
    };


    return (
        <>
            <Navigation />
            <form className="flex flex-col justify-center items-center h-screen">
                <div className="mb-5 text-lg">Създаване на пратка</div>
                <TextInput required type="text" label="Име на получател" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                <SelectInput label="Вид доставка" options={DeliveryTypesOptions} value={deliveryType} onChange={(e) => setDeliveryType(Number(e.target.value))} />
                <TextInput required type="text" label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
                <TextInput required type="number" label="Тегло" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Изпрати</Button>
            </form>
        </>
    );
};

export default CreatePackage;