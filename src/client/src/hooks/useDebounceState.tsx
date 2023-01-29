import { Dispatch, SetStateAction, useState } from "react";


function useDebounceState<T>(defaultValue: T | (() => T)): [T, T, Dispatch<SetStateAction<T>>] {

    const [state, setState] = useState(defaultValue);
    const [debouncedState, setDebouncedState] = useState(defaultValue);

    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    function changeState(action: SetStateAction<T>) {
        setState(action);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(() => {
            return setTimeout(() => {
                setDebouncedState(action);
                setTimeoutId(null);
            }, 5000);
        });

    }

    return [state, debouncedState, changeState];
};

export default useDebounceState;