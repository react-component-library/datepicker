import { render, screen } from '@testing-library/react';
import MonthPickerCell from './MonthPickerCell';

describe('MonthPickerCell', () => {
    test('renders correctly', () => {
        render(<MonthPickerCell date={new Date()} onSelect={function () {}} isDisabled={false} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toBeInTheDocument();
    });

    test('renders correct month', () => {
        const month = 'March';

        const date = new Date('2022-03-01');

        render(<MonthPickerCell date={date} onSelect={function () {}} isDisabled={false} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveTextContent(month);
    });

    test('checks if the day is disabled', () => {
        const date = new Date();

        render(<MonthPickerCell date={date} onSelect={function () {}} isDisabled={true} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-disabled', 'true');
    });

    test('checks if the day is selected', () => {
        const date = new Date();

        render(<MonthPickerCell date={date} onSelect={function () {}} isDisabled={false} isSelected={true} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-selected', 'true');
    });
});
