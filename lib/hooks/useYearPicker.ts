import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { getDefaultMaxDate, getDefaultMinDate, getInitialViewDate, getYearsOnCalendar } from '../helpers/utils';
import useControlledState from './useControlledState';

const YEAR_CELL_COUNT = 12;

interface UseYearPickerProps {
    value: Date;
    onChange: (date: Date) => void;
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    minDate?: Date;
    maxDate?: Date;
}

const useYearPicker = (props: UseYearPickerProps) => {
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

    const yearsOnCalendar = useMemo(() => {
        return getYearsOnCalendar(preSelectionDate.getFullYear(), YEAR_CELL_COUNT);
    }, [preSelectionDate]);

    const prevDisabled = useMemo(() => {
        return yearsOnCalendar[0].getFullYear() <= minDate.getFullYear();
    }, [minDate, yearsOnCalendar]);

    const nextDisabled = useMemo(() => {
        return yearsOnCalendar[yearsOnCalendar.length - 1].getFullYear() >= maxDate.getFullYear();
    }, [maxDate, yearsOnCalendar]);

    const isSameYearAsSelected = useCallback(
        (date: Date) => {
            if (!value) return false;

            return date.getFullYear() === value.getFullYear();
        },
        [value]
    );

    const isLessThanMinDate = useCallback(
        (date: Date) => {
            return date.getFullYear() < minDate.getFullYear();
        },
        [minDate]
    );

    const isGreaterThanMaxDate = useCallback(
        (date: Date) => {
            return date.getFullYear() > maxDate.getFullYear();
        },
        [maxDate]
    );

    const showPreviousYears = useCallback(() => {
        if (prevDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setFullYear(newDate.getFullYear() - YEAR_CELL_COUNT);

            return newDate;
        });
    }, [prevDisabled, setPreSelectionDate]);

    const showNextYears = useCallback(() => {
        if (nextDisabled) {
            return;
        }

        setPreSelectionDate((prevDate) => {
            const newDate = new Date(prevDate);

            newDate.setDate(1);
            newDate.setFullYear(newDate.getFullYear() + YEAR_CELL_COUNT);

            return newDate;
        });
    }, [nextDisabled, setPreSelectionDate]);

    const selectYear = useCallback(
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

            onChange(date);
        },
        [isGreaterThanMaxDate, isLessThanMinDate, onChange, setPreSelectionDate]
    );

    return {
        yearsOnCalendar,
        prevDisabled,
        nextDisabled,
        showPreviousYears,
        showNextYears,
        selectYear,
        isSameYearAsSelected,
        isGreaterThanMaxDate,
        isLessThanMinDate,
    };
};

export default useYearPicker;
