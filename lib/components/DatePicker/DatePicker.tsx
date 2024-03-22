import { ComponentPropsWithoutRef, FC, ReactNode, useCallback, useMemo } from 'react';
import { BaseDateCalendarProps, UseFloatingElementProps } from '../../helpers/types';
import { formatDate } from '../../helpers/utils';
import { useControlledState } from '@react-component-library/utils';
import useFloatingElement from '../../hooks/useFloatingElement';
import Calendar from '../DateCalendar/DateCalendar';

// TODO
//// value
//// onChange
//// format
//// minDate
//// maxDate
//// fixedRows
// excludeDates
// includeDates
// highlightDates
// closeOnSelect
// defaultValue
// onOpen
// onClose
// onMonthChange
// onYearChange
// openTo - 'day' | 'month' | 'year'

interface InputProps extends ComponentPropsWithoutRef<'input'> {}

interface CalendarProps extends UseFloatingElementProps {
    className?: string;
}

interface DatePickerProps extends BaseDateCalendarProps {
    calendarProps?: CalendarProps;
    inputProps?: InputProps;
    renderInput?: (inputProps: InputProps) => ReactNode;
    format?: string;
    fixedRows?: boolean;
}
const DatePicker: FC<DatePickerProps> = (props) => {
    const {
        value: controlledValue,
        onChange,
        minDate,
        maxDate,
        calendarProps = {},
        inputProps = {},
        renderInput,
        format,
        fixedRows,
    } = props;

    const [value, setValue] = useControlledState({
        initialState: null,
        value: controlledValue,
        setValue: onChange ? (date) => onChange(date as Date) : undefined,
    });

    const { context, refs, getReferenceProps, getFloatingProps } = useFloatingElement<HTMLInputElement>(calendarProps);

    const referenceInputProps = useMemo(() => {
        return {
            ...inputProps,
            ...getReferenceProps(),
            ref: refs.setReference,
            value: value ? formatDate(value, format) : '',
            onChange: () => {},
            type: 'text',
            autoComplete: 'off',
        };
    }, [format, getReferenceProps, inputProps, refs.setReference, value]);

    const handleChange = useCallback(
        (date: Date) => {
            setValue(date);

            onChange?.(date);

            context.onOpenChange(false);
        },
        [context, onChange, setValue]
    );

    return (
        <>
            {renderInput ? renderInput(referenceInputProps) : <input {...referenceInputProps} />}

            {context.open && (
                <Calendar
                    {...getFloatingProps()}
                    ref={refs.setFloating}
                    className={['rcl-datepicker-calendar', calendarProps.className].join(' ')}
                    style={{ ...context.floatingStyles }}
                    value={value}
                    onChange={handleChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    fixedRows={fixedRows}
                />
            )}
        </>
    );
};

DatePicker.defaultProps = {
    format: 'DD MMM, YYYY',
};

export default DatePicker;
