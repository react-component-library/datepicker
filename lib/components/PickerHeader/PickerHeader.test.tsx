import { render, screen } from '@testing-library/react';
import PickerHeader from './PickerHeader';

describe('PickerHeader', () => {
    test('renders correctly', () => {
        render(
            <PickerHeader
                isPrevDisabled={false}
                isNextDisabled={false}
                onPrevClick={function () {}}
                onNextClick={function () {}}
            ></PickerHeader>
        );

        const buttonElements = screen.getAllByRole('button');

        expect(buttonElements).toHaveLength(2);
    });

    test('renders correct children', () => {
        const text = 'Dummy Date';

        render(
            <PickerHeader
                isPrevDisabled={false}
                isNextDisabled={false}
                onPrevClick={function () {}}
                onNextClick={function () {}}
            >
                {text}
            </PickerHeader>
        );

        const element = screen.getByText(text);

        expect(element).toBeInTheDocument();
    });
});
