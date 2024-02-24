import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
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
            className={twMerge(
                'flex items-center justify-center h-9 text-xs font-medium rounded-lg text-gray-900 cursor-pointer hover:bg-blue-500/10',
                isDisabled ? 'text-gray-400 cursor-not-allowed hover:none' : '',
                isSelected ? 'text-white bg-blue-500 cursor-pointer hover:bg-accent' : ''
            )}
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
