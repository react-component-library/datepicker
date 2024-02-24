import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import useControlledState from './useControlledState';
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
}

const useDayPicker = (props: UseDayPickerProps) => {
    const {
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate = getDefaultMinDate(),
        maxDate = getDefaultMaxDate(),
    } = props;

    const [preSelectionDate, setPreSelectionDate] = useControlledState({
        initialState: getInitialViewDate(value, maxDate),
        value: controlledPreSelectionDate,
        setValue: controlledSetPreSelectionDate,
    });

    const daysOnCalendar = useMemo(() => {
        return getDaysOnCalendar(preSelectionDate.getFullYear(), preSelectionDate.getMonth());
    }, [preSelectionDate]);

    const prevDisabled = useMemo(() => {
        return isLessThanDate(preSelectionDate, minDate);
    }, [minDate, preSelectionDate]);

    const nextDisabled = useMemo(() => {
        return isGreaterThanDate(preSelectionDate, maxDate);
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

            onChange(date);
        },
        [isGreaterThanMaxDate, isLessThanMinDate, isSameMonthAsView, onChange, setPreSelectionDate]
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
