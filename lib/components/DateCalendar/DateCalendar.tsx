import { ComponentPropsWithRef, FC, forwardRef, useCallback, useState } from 'react';
import { PickerType } from '../../helpers/enums';
import { getDefaultMaxDate, getDefaultMinDate, getInitialViewDate } from '../../helpers/utils';
import DayPicker from '../DayPicker/DayPicker';
import MonthPicker from '../MonthPicker/MonthPicker';
import YearPicker from '../YearPicker/YearPicker';

interface DateCalendarProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    value: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

const DateCalendar: FC<DateCalendarProps> = forwardRef((props, ref) => {
    const { value, onChange, minDate = getDefaultMinDate(), maxDate = getDefaultMaxDate(), ...rest } = props;

    const [preSelectionDate, setPreSelectionDate] = useState(getInitialViewDate(value, maxDate));

    const [picker, setPicker] = useState(PickerType.DAY);

    const handleDayChange = useCallback(
        (date: Date) => {
            onChange(date);
        },
        [onChange]
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
