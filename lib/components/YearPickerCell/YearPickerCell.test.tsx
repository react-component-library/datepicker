import { render, screen } from '@testing-library/react';
import YearPickerCell from './YearPickerCell';

describe('YearPickerCell', () => {
    test('renders correctly', () => {
        render(<YearPickerCell date={new Date()} onSelect={function () {}} isDisabled={false} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toBeInTheDocument();
    });

    test('renders correct month', () => {
        const year = '2022';

        const date = new Date('2022-03-01');

        render(<YearPickerCell date={date} onSelect={function () {}} isDisabled={false} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveTextContent(year);
    });

    test('checks if the day is disabled', () => {
        const date = new Date();

        render(<YearPickerCell date={date} onSelect={function () {}} isDisabled={true} isSelected={false} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-disabled', 'true');
    });

    test('checks if the day is selected', () => {
        const date = new Date();

        render(<YearPickerCell date={date} onSelect={function () {}} isDisabled={false} isSelected={true} />);

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-selected', 'true');
    });
});
