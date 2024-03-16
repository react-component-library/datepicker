import { ComponentPropsWithRef, Dispatch, FC, Fragment, SetStateAction, forwardRef, useCallback } from 'react';
import { WeekDays } from '../../helpers/constants';
import { BaseCalendarProps } from '../../helpers/types';
import { formatDate } from '../../helpers/utils';
import useDayPicker from '../../hooks/useDayPicker';
import DayPickerCell from '../DayPickerCell/DayPickerCell';
import PickerHeader from '../PickerHeader/PickerHeader';

interface DayPickerProps extends BaseCalendarProps, Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    onMonthPickerSelect?: () => void;
    onYearPickerSelect?: () => void;
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
                        className={[
                            'rcl-datepicker-header-action',
                            onMonthPickerSelect ? 'rcl-datepicker-header-action-hover' : '',
                        ].join(' ')}
                        onClick={() => onMonthPickerSelect?.()}
                    >
                        {month}
                    </div>
                    <div
                        role={onYearPickerSelect ? 'button' : undefined}
                        className={[
                            'rcl-datepicker-header-action',
                            onYearPickerSelect ? 'rcl-datepicker-header-action-hover' : '',
                        ].join(' ')}
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
        return <div className="rcl-datepicker-weekday-cell">{day}</div>;
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

            <div className="rcl-datepicker-day-row">
                {WeekDays.map((day) => (
                    <Fragment key={day}>{renderDayPickerWeekDay(day)}</Fragment>
                ))}
            </div>

            <div className="rcl-datepicker-divider"></div>

            <div className="rcl-datepicker-day-row">
                {daysOnCalendar.map((date) => (
                    <Fragment key={date.toString()}>
                        {renderDayPickerCell({
                            date: date,
                            onSelect: () => selectDate(date),
                            isSelected: isSameDateAsSelected(date),
                            isCurrentMonth: isSameMonthAsView(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
});

export default DayPicker;
