import { Dispatch, SetStateAction, useMemo, useState } from 'react';

const useControlledState = <T>(options: {
    initialState: T;
    value: T;
    setValue: Dispatch<SetStateAction<T>>;
}): [T, Dispatch<SetStateAction<T>>] => {
    const { initialState, value: controlledValue, setValue: setControlledValue } = options;

    const isControlledMode = useMemo(() => {
        return controlledValue !== undefined && setControlledValue !== undefined;
    }, [controlledValue, setControlledValue]);

    const [unControlledValue, setUnControlledValue] = useState(initialState);

    const value = isControlledMode ? controlledValue : unControlledValue;
    const setValue = isControlledMode ? setControlledValue : setUnControlledValue;

    return [value, setValue];
};

export default useControlledState;
