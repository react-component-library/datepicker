import { FC } from 'react';
import { formatDate } from '../../helpers/utils';

interface MonthPickerCellProps {
    date: Date;
    onSelect: () => void;
    isSelected: boolean;
    isDisabled: boolean;
}

const MonthPickerCell: FC<MonthPickerCellProps> = (props) => {
    const { date, onSelect, isSelected, isDisabled } = props;

    return (
        <div
            role="option"
            className={['rcl-datepicker-cell', isDisabled ? 'disabled' : '', isSelected ? 'active' : ''].join(' ')}
            onClick={!isDisabled ? () => onSelect() : null}
            aria-label={`Choose ${formatDate(date, 'MMMM, YYYY')}`}
            aria-disabled={isDisabled}
            aria-selected={isSelected}
        >
            {formatDate(date, 'MMMM')}
        </div>
    );
};

export default MonthPickerCell;
