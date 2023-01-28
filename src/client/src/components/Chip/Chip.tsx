import { MouseEvent, useState } from "react";

type ChipProps = {
    value: string | number,
    label: string,
    onClick?: (isEnabled : boolean) => void
};

const Chip = ({ label, value, onClick }: ChipProps) => {

    const [isEnabled, setIsEnabled] = useState(false);

    function clickHandler(event: MouseEvent<HTMLSpanElement>) {
        setIsEnabled(prev => {
            
            if (onClick)
            onClick(!prev)

            return !prev;
        });

        
    }
    return (
        <span onClick={clickHandler} className={`px-4 py-2 rounded-full border ${isEnabled ? "bg-blue-600" : "border-gray-300"} ${isEnabled ? "text-white" : "text-gray-500"} font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}>
            {label}
        </span>
    );
}

export default Chip;