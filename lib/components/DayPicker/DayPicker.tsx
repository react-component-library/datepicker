import { ComponentPropsWithRef, Dispatch, FC, SetStateAction, forwardRef, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import { WeekDays } from '../../helpers/constants';
import { formatDate } from '../../helpers/utils';
import useDayPicker from '../../hooks/useDayPicker';
import DayPickerCell from '../DayPickerCell/DayPickerCell';
import PickerHeader from '../PickerHeader/PickerHeader';

interface DayPickerProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    value: Date;
    onChange: (date: Date) => void;
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    onMonthPickerSelect?: () => void;
    onYearPickerSelect?: () => void;
    minDate?: Date;
    maxDate?: Date;
}

const DayPicker: FC<DayPickerProps> = forwardRef((props, ref) => {
    const {
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        onMonthPickerSelect,
        onYearPickerSelect,
        minDate,
        maxDate,
        ...rest
    } = props;

    const {
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
    } = useDayPicker({
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate,
        maxDate,
    });

    const renderDayPickerHeader = useCallback(
        (options: {
            month: string;
            year: number;
            prevDisabled: boolean;
            nextDisabled: boolean;
            decrementMonth: () => void;
            incrementMonth: () => void;
        }) => {
            const { month, year, prevDisabled, nextDisabled, decrementMonth, incrementMonth } = options;

            return (
                <PickerHeader
                    isPrevDisabled={prevDisabled}
                    onPrevClick={decrementMonth}
                    isNextDisabled={nextDisabled}
                    onNextClick={incrementMonth}
                >
                    <div
                        role={onMonthPickerSelect ? 'button' : undefined}
                        className={twMerge(
                            'flex items-center justify-center h-6 px-3 rounded-md',
                            onMonthPickerSelect ? 'hover:bg-blue-100' : ''
                        )}
                        onClick={() => onMonthPickerSelect?.()}
                    >
                        {month}
                    </div>
                    <div
                        role={onYearPickerSelect ? 'button' : undefined}
                        className={twMerge(
                            'flex items-center justify-center h-6 px-3 rounded-md',
                            onYearPickerSelect ? 'hover:bg-blue-100' : ''
                        )}
                        onClick={() => onYearPickerSelect?.()}
                    >
                        {year}
                    </div>
                </PickerHeader>
            );
        },
        [onMonthPickerSelect, onYearPickerSelect]
    );

    const renderDayPickerWeekDay = useCallback((day: string) => {
        return (
            <div className="flex items-center justify-center text-xs font-medium text-gray-400 py-3 border-b border-gray-100">
                {day}
            </div>
        );
    }, []);

    const renderDayPickerCell = useCallback(
        (options: {
            date: Date;
            onSelect: () => void;
            isSelected: boolean;
            isCurrentMonth: boolean;
            isDisabled: boolean;
        }) => {
            return <DayPickerCell {...options} />;
        },
        []
    );

    return (
        <div {...rest} ref={ref}>
            {renderDayPickerHeader({
                month: formatDate(preSelectionDate, 'MMMM'),
                year: preSelectionDate.getFullYear(),
                prevDisabled: prevDisabled,
                nextDisabled: nextDisabled,
                decrementMonth: decrementMonth,
                incrementMonth: incrementMonth,
            })}

            <div className="grid grid-cols-7 mt-2">
                {WeekDays.map((day) => (
                    <div key={day} className="col-span-1">
                        {renderDayPickerWeekDay(day)}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 mt-2">
                {daysOnCalendar.map((date) => (
                    <div key={date.toString()} className="col-span-1">
                        {renderDayPickerCell({
                            date: date,
                            onSelect: () => selectDate(date),
                            isSelected: isSameDateAsSelected(date),
                            isCurrentMonth: isSameMonthAsView(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default DayPicker;
