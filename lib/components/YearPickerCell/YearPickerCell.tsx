import { FC } from 'react';
import { formatDate } from '../../helpers/utils';

interface YearPickerCellProps {
    date: Date;
    onSelect: () => void;
    isSelected: boolean;
    isDisabled: boolean;
}

const YearPickerCell: FC<YearPickerCellProps> = (props) => {
    const { date, onSelect, isSelected, isDisabled } = props;

    return (
        <div
            role="option"
            className={['rcl-datepicker-cell', isDisabled ? 'disabled' : '', isSelected ? 'active' : ''].join(' ')}
            onClick={!isDisabled ? () => onSelect() : null}
            aria-label={`Choose ${formatDate(date, 'YYYY')}`}
            aria-disabled={isDisabled}
            aria-selected={isSelected}
        >
            {formatDate(date, 'YYYY')}
        </div>
    );
};

export default YearPickerCell;
