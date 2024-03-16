import { FC } from 'react';
import { formatDate } from '../../helpers/utils';

interface DayPickerCellProps {
    date: Date;
    onSelect: () => void;
    isSelected: boolean;
    isCurrentMonth: boolean;
    isDisabled: boolean;
}

const DayPickerCell: FC<DayPickerCellProps> = (props) => {
    const { date, onSelect, isSelected, isDisabled, isCurrentMonth } = props;

    return (
        <div
            role="option"
            className={[
                'rcl-datepicker-cell',
                isCurrentMonth ? 'current-month' : '',
                isDisabled ? 'disabled' : '',
                isSelected ? 'active' : '',
            ].join(' ')}
            onClick={!isDisabled ? () => onSelect() : null}
            aria-label={`Choose ${formatDate(date, 'DD MMMM, YYYY')}`}
            aria-disabled={isDisabled}
            aria-selected={isSelected}
        >
            {date.getDate()}
        </div>
    );
};

export default DayPickerCell;
