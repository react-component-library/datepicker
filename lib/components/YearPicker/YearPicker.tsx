import { ComponentPropsWithRef, FC, Fragment, forwardRef, useCallback } from 'react';
import { BaseYearPickerProps } from '../../helpers/types';
import useYearPicker from '../../hooks/useYearPicker';
import PickerHeader from '../PickerHeader/PickerHeader';
import YearPickerCell from '../YearPickerCell/YearPickerCell';

interface YearPickerProps extends BaseYearPickerProps, Omit<ComponentPropsWithRef<'div'>, 'onChange'> {}

const YearPicker: FC<YearPickerProps> = forwardRef((props, ref) => {
    const {
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate,
        maxDate,
        ...rest
    } = props;

    const {
        yearsOnCalendar,
        prevDisabled,
        nextDisabled,
        showPreviousYears,
        showNextYears,
        selectYear,
        isSameYearAsSelected,
        isGreaterThanMaxDate,
        isLessThanMinDate,
    } = useYearPicker({
        value,
        onChange,
        preSelectionDate: controlledPreSelectionDate,
        setPreSelectionDate: controlledSetPreSelectionDate,
        minDate,
        maxDate,
    });

    const renderYearPickerHeader = useCallback(
        (options: {
            startYear: number;
            endYear: number;
            prevDisabled: boolean;
            nextDisabled: boolean;
            showPreviousYears: () => void;
            showNextYears: () => void;
        }) => {
            const { startYear, endYear, prevDisabled, nextDisabled, showPreviousYears, showNextYears } = options;

            return (
                <PickerHeader
                    isPrevDisabled={prevDisabled}
                    onPrevClick={showPreviousYears}
                    isNextDisabled={nextDisabled}
                    onNextClick={showNextYears}
                >
                    <div className="rcl-datepicker-header-action">
                        {startYear} - {endYear}
                    </div>
                </PickerHeader>
            );
        },
        []
    );

    const renderYearPickerCell = useCallback(
        (options: { date: Date; onSelect: () => void; isSelected: boolean; isDisabled: boolean }) => {
            return <YearPickerCell {...options} />;
        },
        []
    );

    return (
        <div {...rest} ref={ref}>
            {renderYearPickerHeader({
                startYear: yearsOnCalendar[0].getFullYear(),
                endYear: yearsOnCalendar[yearsOnCalendar.length - 1].getFullYear(),
                prevDisabled: prevDisabled,
                nextDisabled: nextDisabled,
                showPreviousYears: showPreviousYears,
                showNextYears: showNextYears,
            })}

            <div className="rcl-datepicker-year-row">
                {yearsOnCalendar.map((date) => (
                    <Fragment key={date.toString()}>
                        {renderYearPickerCell({
                            date: date,
                            onSelect: () => selectYear(date),
                            isSelected: isSameYearAsSelected(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </Fragment>
                ))}
            </div>
        </div>
    );
});

export default YearPicker;
