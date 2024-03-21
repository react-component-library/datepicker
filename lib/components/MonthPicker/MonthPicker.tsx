import { ComponentPropsWithRef, FC, Fragment, forwardRef, useCallback } from 'react';
import { BaseMonthPickerProps } from '../../helpers/types';
import useMonthPicker from '../../hooks/useMonthPicker';
import MonthPickerCell from '../MonthPickerCell/MonthPickerCell';
import PickerHeader from '../PickerHeader/PickerHeader';

interface MonthPickerProps extends BaseMonthPickerProps, Omit<ComponentPropsWithRef<'div'>, 'onChange'> {}

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

            <div className="rcl-datepicker-month-row">
                {monthsOnCalendar.map((date) => (
                    <Fragment key={date.toString()}>
                        {renderMonthPickerCell({
                            date: date,
                            onSelect: () => selectMonth(date),
                            isSelected: isSameYearAndMonthAsSelected(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
});

export default MonthPicker;
