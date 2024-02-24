import { render, screen } from '@testing-library/react';
import MonthPicker from './MonthPicker';
import { formatDate } from '../../helpers/utils';

describe('MonthPicker', () => {
    test('renders correctly', () => {
        const date = new Date();

        render(<MonthPicker value={date} onChange={function () {}} />);

        const selectedCellElement = screen.getByRole('option', {
            selected: true,
        });

        expect(selectedCellElement).toBeInTheDocument();

        const yearElement = screen.getByText(formatDate(date, 'YYYY'));

        expect(yearElement).toBeInTheDocument();
    });

    test('renders correct number of cells', () => {
        const date = new Date();

        render(<MonthPicker value={date} onChange={function () {}} />);

        const cellElements = screen.getAllByRole('option');

        expect(cellElements).toHaveLength(12);
    });
});
