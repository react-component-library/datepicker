import { ComponentPropsWithRef, Dispatch, FC, SetStateAction, forwardRef, useCallback } from 'react';
import useYearPicker from '../../hooks/useYearPicker';
import PickerHeader from '../PickerHeader/PickerHeader';
import YearPickerCell from '../YearPickerCell/YearPickerCell';

interface YearPickerProps extends Omit<ComponentPropsWithRef<'div'>, 'onChange'> {
    value: Date;
    onChange: (date: Date) => void;
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
    minDate?: Date;
    maxDate?: Date;
}

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
                    <div className="flex items-center justify-center h-6 px-3 rounded-md">
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

            <div className="grid grid-cols-3 gap-2 mt-4">
                {yearsOnCalendar.map((date) => (
                    <div key={date.toString()} className="col-span-1">
                        {renderYearPickerCell({
                            date: date,
                            onSelect: () => selectYear(date),
                            isSelected: isSameYearAsSelected(date),
                            isDisabled: isGreaterThanMaxDate(date) || isLessThanMinDate(date),
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default YearPicker;
