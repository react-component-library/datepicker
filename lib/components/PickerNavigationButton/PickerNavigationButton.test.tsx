import { render, screen } from '@testing-library/react';
import PickerNavigationButton from './PickerNavigationButton';

describe('PickerNavigationButton', () => {
    test('renders correctly', () => {
        render(
            <PickerNavigationButton onClick={function () {}} isDisabled={false}>
                Prev
            </PickerNavigationButton>
        );

        const element = screen.getByRole('button');

        expect(element).toBeInTheDocument();
    });

    test('renders correct children', () => {
        const text = 'Prev';

        render(
            <PickerNavigationButton onClick={function () {}} isDisabled={false}>
                {text}
            </PickerNavigationButton>
        );

        const element = screen.getByRole('button');

        expect(element).toHaveTextContent(text);
    });

    test('checks if the navigation is disabled', () => {
        render(
            <PickerNavigationButton onClick={function () {}} isDisabled={true}>
                Prev
            </PickerNavigationButton>
        );

        const element = screen.getByRole('button');

        expect(element).toHaveAttribute('aria-disabled', 'true');
    });
});
