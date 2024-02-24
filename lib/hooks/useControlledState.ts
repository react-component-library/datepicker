import { Dispatch, SetStateAction, useState } from 'react';

const useControlledState = <T>(options: {
    initialState: T;
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
}): [T, Dispatch<SetStateAction<T>>] => {
    const { initialState, value: controlledValue, setValue: setControlledValue } = options;

    const [unControlledValue, setUnControlledValue] = useState(initialState);

    const value = controlledValue !== undefined ? controlledValue : unControlledValue;
    const setValue = controlledValue !== undefined ? setControlledValue : setUnControlledValue;

    return [value, setValue];
};

export default useControlledState;
