import {
    ReferenceType,
    autoUpdate,
    flip as floatingUiFlip,
    hide as floatingUiHide,
    offset as floatingUiOffset,
    shift as floatingUiShift,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
} from '@floating-ui/react';
import { useEffect } from 'react';
import { useControlledState } from '@react-component-library/utils';
import { UseFloatingElementProps, UseFloatingElementReturn } from '../helpers/types';

const useFloatingElement = <RT extends ReferenceType = ReferenceType>(
    props: UseFloatingElementProps = {}
): UseFloatingElementReturn<RT> => {
    const {
        open: controlledOpen,
        setOpen: controlledSetOpen,
        placement = 'bottom-start',
        offset = 4,
        closeOnScroll = false,
    } = props;

    const [open, setOpen] = useControlledState({
        initialState: false,
        value: controlledOpen,
        setValue: controlledSetOpen,
    });

    const { refs, context, middlewareData } = useFloating<RT>({
        whileElementsMounted: autoUpdate,
        placement: placement,
        middleware: [
            floatingUiOffset(offset),
            floatingUiShift({ padding: 0 }),
            floatingUiFlip({ padding: 0 }),
            floatingUiHide({ padding: 0 }),
        ],
        open: open,
        onOpenChange: setOpen,
    });

    useEffect(() => {
        const hidden = middlewareData.hide?.referenceHidden;

        if (hidden) {
            setOpen(false);
        }
    }, [middlewareData.hide?.referenceHidden, setOpen]);

    const click = useClick(context);
    const dismiss = useDismiss(context, { ancestorScroll: closeOnScroll });

    const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

    return {
        context,
        refs,
        getReferenceProps,
        getFloatingProps,
    };
};

export default useFloatingElement;
