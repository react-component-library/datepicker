import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { getDefaultMaxDate, getDefaultMinDate, getInitialViewDate, getMonthsOnCalendar } from '../helpers/utils';
import { useControlledState } from '@react-component-library/utils/hooks';

interface UseMonthPickerProps {
    value: Date;
    onChange: (date: Date) => void;
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    minDate?: Date;
    maxDate?: Date;
}

const useMonthPicker = (props: UseMonthPickerProps) => {
    const {
        value: controlledValue,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate = getDefaultMinDate(),
        maxDate = getDefaultMaxDate(),
    } = props;

    const [value, setValue] = useControlledState({
        initialState: null,
        value: controlledValue,
        setValue: onChange ? (date) => onChange(date as Date) : undefined,
    });

    const [preSelectionDate, setPreSelectionDate] = useControlledState({
        initialState: getInitialViewDate(value, maxDate),
        value: controlledPreSelectionDate,
        setValue: controlledSetPreSelectionDate,
    });

    const monthsOnCalendar = useMemo(() => {
        return getMonthsOnCalendar(preSelectionDate.getFullYear());
    }, [preSelectionDate]);

    const prevDisabled = useMemo(() => {
        return preSelectionDate.getFullYear() <= minDate.getFullYear();
    }, [minDate, preSelectionDate]);

    const nextDisabled = useMemo(() => {
        return preSelectionDate.getFullYear() >= maxDate.getFullYear();
    }, [maxDate, preSelectionDate]);

    const isSameYearAndMonthAsSelected = useCallback(
        (date: Date) => {
            if (!value) return false;

            return date.getMonth() === value.getMonth() && date.getFullYear() === value.getFullYear();
        },
        [value]
    );

    const isLessThanMinDate = useCallback(
        (date: Date) => {
            return preSelectionDate.getFullYear() <= minDate.getFullYear() && date.getMonth() < minDate.getMonth();
        },
        [minDate, preSelectionDate]
    );

    const isGreaterThanMaxDate = useCallback(
        (date: Date) => {
            return preSelectionDate.getFullYear() >= maxDate.getFullYear() && date.getMonth() > maxDate.getMonth();
        },
        [maxDate, preSelectionDate]
    );

    const decrementYear = useCallback(() => {
        if (prevDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setFullYear(newDate.getFullYear() - 1);

            return newDate;
        });
    }, [prevDisabled, setPreSelectionDate]);

    const incrementYear = useCallback(() => {
        if (nextDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setFullYear(newDate.getFullYear() + 1);

            return newDate;
        });
    }, [nextDisabled, setPreSelectionDate]);

    const selectMonth = useCallback(
        (date: Date) => {
            if (isGreaterThanMaxDate(date) || isLessThanMinDate(date)) {
                return;
            }

            setPreSelectionDate((prevDate) => {
                const newDate = new Date(prevDate);

                newDate.setMonth(date.getMonth());
                newDate.setFullYear(date.getFullYear());

                return newDate;
            });

            setValue(date);

            onChange?.(date);
        },
        [isGreaterThanMaxDate, isLessThanMinDate, onChange, setPreSelectionDate, setValue]
    );

    return {
        monthsOnCalendar,
        prevDisabled,
        nextDisabled,
        decrementYear,
        incrementYear,
        selectMonth,
        preSelectionDate,
        isSameYearAndMonthAsSelected,
        isGreaterThanMaxDate,
        isLessThanMinDate,
    };
};

export default useMonthPicker;
