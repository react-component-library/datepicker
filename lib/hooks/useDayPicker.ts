import { useControlledState } from '@react-component-library/utils';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import {
    getDaysOnCalendar,
    getDefaultMaxDate,
    getDefaultMinDate,
    getInitialViewDate,
    isGreaterThanDate,
    isLessThanDate,
    isSameDate,
} from '../helpers/utils';

interface UseDayPickerProps {
    value: Date;
    onChange: (date: Date) => void;
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    minDate?: Date;
    maxDate?: Date;
    fixedRows?: boolean;
}

const useDayPicker = (props: UseDayPickerProps) => {
    const {
        value: controlledValue,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate = getDefaultMinDate(),
        maxDate = getDefaultMaxDate(),
        fixedRows = false,
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

    const daysOnCalendar = useMemo(() => {
        return getDaysOnCalendar(preSelectionDate.getFullYear(), preSelectionDate.getMonth(), { fixedRows });
    }, [fixedRows, preSelectionDate]);

    const prevDisabled = useMemo(() => {
        return (
            preSelectionDate.getFullYear() <= minDate.getFullYear() && preSelectionDate.getMonth() <= minDate.getMonth()
        );
    }, [minDate, preSelectionDate]);

    const nextDisabled = useMemo(() => {
        return (
            preSelectionDate.getFullYear() >= maxDate.getFullYear() && preSelectionDate.getMonth() >= maxDate.getMonth()
        );
    }, [maxDate, preSelectionDate]);

    const isSameDateAsSelected = useCallback(
        (date: Date) => {
            return isSameDate(date, value);
        },
        [value]
    );

    const isSameMonthAsView = useCallback(
        (date: Date) => {
            return date.getMonth() === preSelectionDate.getMonth();
        },
        [preSelectionDate]
    );

    const isLessThanMinDate = useCallback(
        (date: Date) => {
            return isLessThanDate(date, minDate);
        },
        [minDate]
    );

    const isGreaterThanMaxDate = useCallback(
        (date: Date) => {
            return isGreaterThanDate(date, maxDate);
        },
        [maxDate]
    );

    const decrementMonth = useCallback(() => {
        if (prevDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() - 1);

            return newDate;
        });
    }, [prevDisabled, setPreSelectionDate]);

    const incrementMonth = useCallback(() => {
        if (nextDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setMonth(newDate.getMonth() + 1);

            return newDate;
        });
    }, [nextDisabled, setPreSelectionDate]);

    const selectDate = useCallback(
        (date: Date) => {
            if (isGreaterThanMaxDate(date) || isLessThanMinDate(date)) {
                return;
            }

            if (!isSameMonthAsView(date)) {
                setPreSelectionDate((prevDate) => {
                    const newDate = new Date(prevDate);

                    newDate.setMonth(date.getMonth());
                    newDate.setFullYear(date.getFullYear());

                    return newDate;
                });
            }

            setValue(date);

            onChange?.(date);
        },
        [isGreaterThanMaxDate, isLessThanMinDate, isSameMonthAsView, onChange, setPreSelectionDate, setValue]
    );

    return {
        daysOnCalendar,
        prevDisabled,
        nextDisabled,
        decrementMonth,
        incrementMonth,
        selectDate,
        preSelectionDate,
        isSameDateAsSelected,
        isGreaterThanMaxDate,
        isLessThanMinDate,
        isSameMonthAsView,
    };
};

export default useDayPicker;
