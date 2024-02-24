import { render, screen } from '@testing-library/react';
import DayPicker from './DayPicker';
import { formatDate } from '../../helpers/utils';

describe('DayPicker', () => {
    test('renders correctly', () => {
        const date = new Date();

        render(<DayPicker value={date} onChange={function () {}} />);

        const selectedCellElement = screen.getByRole('option', {
            selected: true,
        });

        expect(selectedCellElement).toBeInTheDocument();

        const monthElement = screen.getByText(formatDate(date, 'MMMM'));

        expect(monthElement).toBeInTheDocument();

        const yearElement = screen.getByText(formatDate(date, 'YYYY'));

        expect(yearElement).toBeInTheDocument();
    });

    test('renders correct number of cells', () => {
        const date = new Date('2024-06-01');

        render(<DayPicker value={date} onChange={function () {}} />);

        const cellElements = screen.getAllByRole('option');

        expect(cellElements).toHaveLength(42);
    });
});
