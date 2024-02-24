import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
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
            className={twMerge(
                'flex items-center justify-center h-9 text-xs font-medium rounded-lg text-gray-400 cursor-pointer hover:bg-blue-500/10',
                isCurrentMonth ? 'text-gray-900' : '',
                isDisabled ? 'text-gray-400 cursor-not-allowed hover:none' : '',
                isSelected ? 'text-white bg-blue-500 cursor-pointer hover:bg-accent' : ''
            )}
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
