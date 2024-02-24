import { FC, ReactNode } from 'react';
import PickerNavigationButton from '../PickerNavigationButton/PickerNavigationButton';

interface PickerHeaderProps {
    isPrevDisabled: boolean;
    isNextDisabled: boolean;
    onPrevClick: () => void;
    onNextClick: () => void;
    children?: ReactNode;
}

const PickerHeader: FC<PickerHeaderProps> = (props) => {
    const { isPrevDisabled, isNextDisabled, onPrevClick, onNextClick, children } = props;

    return (
        <div className="flex items-center justify-between gap-4">
            <PickerNavigationButton onClick={onPrevClick} isDisabled={isPrevDisabled} aria-label="Previous">
                <svg width={5} height={8} viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4 1L1 4l3 3"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </PickerNavigationButton>

            <div className="flex items-center justify-center text-gray-900 text-sm font-medium text-center flex-1">
                {children}
            </div>

            <PickerNavigationButton onClick={onNextClick} isDisabled={isNextDisabled} aria-label="Next">
                <svg width={5} height={8} viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1 1l3 3-3 3"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </PickerNavigationButton>
        </div>
    );
};

export default PickerHeader;
