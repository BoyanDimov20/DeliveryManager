import { ChangeEvent } from "react";


type SelectInputProps = {
    options: Array<{ display: string, value: string | number }>,
    label: string,
    value: string | number,
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void
};

const SelectInput = (props: SelectInputProps) => {


    const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        props.onChange(event);
    }

    return (
        <div className="flex flex-col w-[250px]">
            <label className="m-1 text-gray-700">{props.label}</label>
            <select value={props.value} onChange={changeHandler} id="countries" className="
            bg-white dark:bg-gray-700
            border border-blue-300 dark:border-gray-600
            text-gray-900 text-sm rounded-lg dark:placeholder-gray-400 dark:text-white
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                {props.options.map(x =>
                    <option key={x.value} value={x.value}>{x.display}</option>
                )}
            </select>
        </div>
    );
};

export default SelectInput;