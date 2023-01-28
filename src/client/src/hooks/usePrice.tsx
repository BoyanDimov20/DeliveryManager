import { useEffect, useState } from "react";


const usePrice = (weight: string, deliveryType: number) => {

    const [price, setPrice] = useState(0);

    useEffect(() => {
        let priceByWeight = Number(weight) * 3.5;
        // 0 -> To Office | 1 -> To Address | 2 -> To Address Express
        switch (deliveryType) {
            case 0:
                priceByWeight += 2;
                break;
            case 1:
                priceByWeight += 8;
                break;
            case 2:
                priceByWeight += 15;
                break;
            default:
                break;
        }
        setPrice(priceByWeight);
    }, [weight, deliveryType]);

    return price;
}


export default usePrice;