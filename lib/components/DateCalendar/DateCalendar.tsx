import { ComponentPropsWithRef, FC, forwardRef, useCallback, useState } from 'react';
import { PickerType } from '../../helpers/enums';
import { getDefaultMaxDate, getDefaultMinDate, getInitialViewDate } from '../../helpers/utils';
import DayPicker from '../DayPicker/DayPicker';
import MonthPicker from '../MonthPicker/MonthPicker';
import YearPicker from '../YearPicker/YearPicker';
import { BaseCalendarProps } from '../../helpers/types';
import useControlledState from '../../hooks/useControlledState';

interface DateCalendarProps extends BaseCalendarProps, Omit<ComponentPropsWithRef<'div'>, 'onChange'> {}

const DateCalendar: FC<DateCalendarProps> = forwardRef((props, ref) => {
    const {
        value: controlledValue,
        onChange,
        minDate = getDefaultMinDate(),
        maxDate = getDefaultMaxDate(),
        ...rest
    } = props;

    const [value, setValue] = useControlledState({
        initialState: null,
        value: controlledValue,
        setValue: onChange ? (date) => onChange(date as Date) : undefined,
    });

    const [preSelectionDate, setPreSelectionDate] = useState(getInitialViewDate(value, maxDate));

    const [picker, setPicker] = useState(PickerType.DAY);

    const handleDayChange = useCallback(
        (date: Date) => {
            setValue(date);

            onChange?.(date);
        },
        [onChange, setValue]
    );

    const handleMonthChange = useCallback((date: Date) => {
        setPreSelectionDate(date);

        setPicker(PickerType.DAY);
    }, []);

    const handleYearChange = useCallback((date: Date) => {
        setPreSelectionDate(date);

        setPicker(PickerType.MONTH);
    }, []);

    const handleMonthPickerSelect = useCallback(() => {
        setPicker(PickerType.MONTH);
    }, []);

    const handleYearPickerSelect = useCallback(() => {
        setPicker(PickerType.YEAR);
    }, []);

    return (
        <div {...rest} ref={ref}>
            {picker === PickerType.DAY && (
                <DayPicker
                    value={value}
                    onChange={handleDayChange}
                    preSelectionDate={preSelectionDate}
                    setPreSelectionDate={setPreSelectionDate}
                    onMonthPickerSelect={handleMonthPickerSelect}
                    onYearPickerSelect={handleYearPickerSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            )}

            {picker === PickerType.MONTH && (
                <MonthPicker
                    value={value}
                    onChange={handleMonthChange}
                    preSelectionDate={preSelectionDate}
                    setPreSelectionDate={setPreSelectionDate}
                    onYearPickerSelect={handleYearPickerSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            )}

            {picker === PickerType.YEAR && (
                <YearPicker
                    value={value}
                    onChange={handleYearChange}
                    preSelectionDate={preSelectionDate}
                    setPreSelectionDate={setPreSelectionDate}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            )}
        </div>
    );
});

export default DateCalendar;
