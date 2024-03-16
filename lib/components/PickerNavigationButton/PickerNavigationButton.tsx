import { ComponentPropsWithoutRef, FC } from 'react';

interface PickerNavigationButtonProps extends ComponentPropsWithoutRef<'div'> {
    isDisabled: boolean;
}

const PickerNavigationButton: FC<PickerNavigationButtonProps> = (props) => {
    const { children, onClick, isDisabled, ...rest } = props;

    return (
        <>
            <div
                {...rest}
                role="button"
                className={['rcl-datepicker-navigation-button', isDisabled ? 'disabled' : ''].join(' ')}
                onClick={!isDisabled ? onClick : null}
                aria-disabled={isDisabled}
            >
                {children}
            </div>
        </>
    );
};

export default PickerNavigationButton;
