import { render, screen } from '@testing-library/react';
import DayPickerCell from './DayPickerCell';

describe('DayPickerCell', () => {
    test('renders correctly', () => {
        render(
            <DayPickerCell
                date={new Date()}
                onSelect={function () {}}
                isCurrentMonth={true}
                isDisabled={false}
                isSelected={false}
            />
        );

        const cellElement = screen.getByRole('option');

        expect(cellElement).toBeInTheDocument();
    });

    test('renders correct day', () => {
        const date = new Date();

        render(
            <DayPickerCell
                date={date}
                onSelect={function () {}}
                isCurrentMonth={true}
                isDisabled={false}
                isSelected={false}
            />
        );

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveTextContent(date.getDate().toString());
    });

    test('checks if the day is disabled', () => {
        const date = new Date();

        render(
            <DayPickerCell
                date={date}
                onSelect={function () {}}
                isCurrentMonth={true}
                isDisabled={true}
                isSelected={false}
            />
        );

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-disabled', 'true');
    });

    test('checks if the day is selected', () => {
        const date = new Date();

        render(
            <DayPickerCell
                date={date}
                onSelect={function () {}}
                isCurrentMonth={true}
                isDisabled={false}
                isSelected={true}
            />
        );

        const cellElement = screen.getByRole('option');

        expect(cellElement).toHaveAttribute('aria-selected', 'true');
    });
});
