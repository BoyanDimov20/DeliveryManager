import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import SelectInput from "../../components/TextInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";
import { DeliveryTypesOptions, DeliveryStatusOptions } from "../../enums";



const EditPackage = () => {
    const { id } = useParams();
    const [senderName, setSenderName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(0);
    const [receiverName, setReceiverName] = useState('');
    const [deliveryType, setDeliveryType] = useState(0);

    const { data } = useQuery(['package', id], getPackage);

    async function saveHandler() {
        const response = await fetch('/api/packages', {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                senderName: senderName,
                address: address,
                status: status,
                receiverName: receiverName,
                deliveryType: deliveryType
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire('Запазено!',
                'Пратка беше запазена.',
                'success'
            );
        }
    };

    async function getPackage() {
        const response = await fetch('/api/packages/' + id);
        return await response.json();
    }

    useEffect(() => {
        setSenderName(data?.senderName ?? '');
        setAddress(data?.deliveryAddress ?? '');
        setStatus(data?.status ?? 0);
        setReceiverName(data?.receiverName ?? '');
        setDeliveryType(data?.deliveryType ?? 0);
    }, [data])

    return (
        <>
            <Navigation />
            <form className="flex flex-col mt-10 items-center h-screen">
                <div className="mb-5 text-lg">Редакция на пратка</div>
                <TextInput type="text" label="Име на изпращач" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
                <TextInput type="text" label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
                <SelectInput label="Статус" options={DeliveryStatusOptions} value={status} onChange={(e) => setStatus(Number(e.target.value))} />
                <TextInput type="text" label="Име на получател" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                <SelectInput label="Вид доставка" options={DeliveryTypesOptions} value={deliveryType} onChange={(e) => setDeliveryType(Number(e.target.value))} />
                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Запази</Button>
            </form>
        </>
    );
};



export default EditPackage;