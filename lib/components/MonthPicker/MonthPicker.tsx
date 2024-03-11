import { ComponentPropsWithRef, Dispatch, FC, SetStateAction, forwardRef, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import useMonthPicker from '../../hooks/useMonthPicker';
import MonthPickerCell from '../MonthPickerCell/MonthPickerCell';
import PickerHeader from '../PickerHeader/PickerHeader';
import { BaseCalendarProps } from '../../helpers/types';

interface MonthPickerProps extends BaseCalendarProps, Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    onYearPickerSelect?: () => void;
}

const MonthPicker: FC<MonthPickerProps> = forwardRef((props, ref) => {
    const {
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        onYearPickerSelect,
        minDate,
        maxDate,
        ...rest
    } = props;

    const {
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
    } = useMonthPicker({
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate,
        maxDate,
    });

    const renderMonthPickerHeader = useCallback(
        (options: {
            year: number;
            prevDisabled: boolean;
            nextDisabled: boolean;
            decrementYear: () => void;
            incrementYear: () => void;
        }) => {
            const { year, prevDisabled, nextDisabled, decrementYear, incrementYear } = options;

            return (
                <PickerHeader
                    isPrevDisabled={prevDisabled}
                    onPrevClick={decrementYear}
                    isNextDisabled={nextDisabled}
                    onNextClick={incrementYear}
                >
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
        [onYearPickerSelect]
    );

    const renderMonthPickerCell = useCallback(
        (options: { date: Date; onSelect: () => void; isSelected: boolean; isDisabled: boolean }) => {
            return <MonthPickerCell {...options} />;
        },
        []
    );

    return (
        <div {...rest} ref={ref}>
            {renderMonthPickerHeader({
                year: preSelectionDate.getFullYear(),
                prevDisabled: prevDisabled,
                nextDisabled: nextDisabled,
                decrementYear: decrementYear,
                incrementYear: incrementYear,
            })}

            <div className="grid grid-cols-3 gap-2 mt-4">
                {monthsOnCalendar.map((date) => (
                    <div key={date.toString()} className="col-span-1">
                        {renderMonthPickerCell({
                            date: date,
                            onSelect: () => selectMonth(date),
                            isSelected: isSameYearAndMonthAsSelected(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default MonthPicker;
