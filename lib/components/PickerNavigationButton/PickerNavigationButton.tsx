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
                className={[
                    'flex items-center justify-center w-6 h-6 rounded-md',
                    !isDisabled
                        ? 'text-gray-900 border border-gray-50 shadow-[0px_0px_2px_rgba(18,40,44,0.1),0px_2px_4px_rgba(18,40,44,0.1)] cursor-pointer'
                        : 'text-gray-300',
                ].join(' ')}
                onClick={!isDisabled ? onClick : null}
                aria-disabled={isDisabled}
            >
                {children}
            </div>
        </>
    );
};

export default PickerNavigationButton;
