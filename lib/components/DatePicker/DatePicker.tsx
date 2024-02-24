import { ComponentPropsWithoutRef, FC, ReactNode, useCallback, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { UseFloatingElementProps } from '../../helpers/types';
import { formatDate } from '../../helpers/utils';
import useControlledState from '../../hooks/useControlledState';
import useFloatingElement from '../../hooks/useFloatingElement';
import Calendar from '../DateCalendar/DateCalendar';

// value
// onChange
// format
// excludeDates
// includeDates
// minDate
// maxDate
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

interface DatePickerProps {
    value?: Date;
    onChange?: (date: Date) => void;
    format?: string;
    minDate?: Date;
    maxDate?: Date;
    calendarProps?: CalendarProps;
    inputProps?: InputProps;
    renderInput?: (inputProps: InputProps) => ReactNode;
}
const DatePicker: FC<DatePickerProps> = (props) => {
    const {
        value: controlledValue,
        onChange,
        format,
        minDate,
        maxDate,
        calendarProps = {},
        inputProps = {},
        renderInput,
    } = props;

    const [value, setValue] = useControlledState({
        initialState: null,
        value: controlledValue !== undefined ? controlledValue : undefined,
        setValue: (date) => onChange?.(date as Date),
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
            setValue?.(date);

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
                    className={twMerge('w-[320px] bg-white shadow-2xl p-4 rounded-xl', calendarProps.className)}
                    style={{ ...context.floatingStyles }}
                    value={value}
                    onChange={handleChange}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            )}
        </>
    );
};

DatePicker.defaultProps = {
    format: 'DD MMM, YYYY',
};

export default DatePicker;
