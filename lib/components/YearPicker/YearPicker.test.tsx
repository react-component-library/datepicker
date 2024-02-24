import { render, screen } from '@testing-library/react';
import YearPicker from './YearPicker';

describe('YearPicker', () => {
    test('renders correctly', () => {
        const date = new Date();

        render(<YearPicker value={date} onChange={function () {}} />);

        const selectedCellElement = screen.getByRole('option', {
            selected: true,
        });

        expect(selectedCellElement).toBeInTheDocument();
    });

    test('renders correct number of cells', () => {
        const date = new Date();

        render(<YearPicker value={date} onChange={function () {}} />);

        const cellElements = screen.getAllByRole('option');

        expect(cellElements).toHaveLength(12);
    });
});
