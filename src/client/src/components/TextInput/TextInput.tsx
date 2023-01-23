import { ChangeEvent, useState } from "react";
import { useDebouncedValue } from '@mantine/hooks';

type TextInputProps = {
    label?: string,
    placeholder?: string,
    value?: string | number,
    error?: string,
    required?: boolean,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    type: 'text' | 'password' | 'email' | 'number',
    rows?: boolean
};

const TextInput = (props: TextInputProps) => {
    const [isTouched, setIsTouched] = useState(false);


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isTouched) {
            setIsTouched(true);
        }

        if (props.onChange)
            props.onChange(event);

        console.log('Changed');
    };

    let hasError = props.error || (props.required && isTouched && !props.value);

    return (
        <div className="flex flex-col w-[250px]">
            <label className="m-1 text-gray-700">{props.label}</label>
            <input className={`
            form-control
            block
            w-full
            px-3
            pt-1.5
            text-base
            font-normal
            resize-none
          text-gray-700
          bg-white bg-clip-padding
            border border-solid rounded-md
            ${!hasError ? "border-blue-300" : "border-red-500 focus:border-red-500"}
            ${props.rows ? "h-16 pb-9" : 'pb-1.5'}
          focus:border-blue-600
            focus:outline-none`}
                value={props.value}
                onChange={onChangeHandler}
                placeholder={props.placeholder}
                type={props.type}
            />
            {props.error ?
                <div className="text-xs text-red-500 ml-1">{props.error}</div>
                : null
            }
            {props.required && isTouched && !props.value ?
                <div className="text-xs text-red-500 ml-1">Полето е задължително</div>
                : null
            }
        </div>
    );
};


export default TextInput;