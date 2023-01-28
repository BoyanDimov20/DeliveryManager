import { ChangeEvent, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../../components/Button/Button";
import Navigation from "../../components/Navigation/Navigation";
import SelectInput from "../../components/TextInput/SelectInput";
import TextInput from "../../components/TextInput/TextInput";
import { DeliveryStatusOptions, DeliveryTypesOptions } from "../../enums";
import usePrice from "../../hooks/usePrice";
import { useOfficesOptions } from "../../services/officeService";


const CreatePackage = () => {

    const navigate = useNavigate();
    const officeOptions = useOfficesOptions();
    const queryClient = useQueryClient();

    const [address, setAddress] = useState('');
    const [receiverName, setReceiverName] = useState('');
    const [deliveryType, setDeliveryType] = useState(0);
    const [weight, setWeight] = useState('');
    const [officeId, setOfficeId] = useState('');
    const [receivedAtOfficeId, setReceivedAtOfficeId] = useState('');
    const calculatedPrice = usePrice(weight, deliveryType);

    async function saveHandler() {
        const response = await fetch('/api/packages', {
            method: 'POST',
            body: JSON.stringify({
                receiverName: receiverName,
                deliveryAddress: address,
                deliveryType: deliveryType,
                weight: weight,
                officeId,
                receivedAtOfficeId
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
                queryClient.invalidateQueries('packages');
                navigate('/packages');
            });
        }
    };

    useEffect(() => {
        if (officeOptions.length > 0) {
            setOfficeId(officeOptions[0].value);
            setReceivedAtOfficeId(officeOptions[0].value);
        }
    }, [officeOptions.length]);


    return (
        <>
            <Navigation />
            <form className="flex flex-col mt-10 items-center h-screen">
                <div className="mb-5 text-lg">Създаване на пратка</div>
                <TextInput required type="text" label="Име на получател" value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
                <SelectInput label="Вид доставка" options={DeliveryTypesOptions} value={deliveryType} onChange={(e) => setDeliveryType(Number(e.target.value))} />
                {deliveryType == 0 ?
                    <SelectInput label="Офис" options={officeOptions} value={officeId} onChange={(e) => setOfficeId(e.target.value)} />
                    : <TextInput required type="text" label="Адрес" value={address} onChange={(e) => setAddress(e.target.value)} />
                }
                <TextInput required type="number" label="Тегло" value={weight} onChange={(e) => setWeight(e.target.value)} />
                <TextInput type="text" label="Цена" value={calculatedPrice.toPrecision(3) + ' лв'} />
                <SelectInput label="Приета в офис" options={officeOptions} value={receivedAtOfficeId} onChange={(e) => setReceivedAtOfficeId(e.target.value)} />

                <Button className="ml-[9rem] mt-2" onClick={saveHandler}>Изпрати</Button>
            </form>
        </>
    );
};

export default CreatePackage;