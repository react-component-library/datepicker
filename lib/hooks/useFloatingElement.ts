import {
    ReferenceType,
    autoUpdate,
    flip as floatingUiFlip,
    hide as floatingUiHide,
    offset as floatingUiOffset,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
} from '@floating-ui/react';
import { useEffect } from 'react';
import { UseFloatingElementProps, UseFloatingElementReturn } from '../helpers/types';
import useControlledState from './useControlledState';

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
        middleware: [floatingUiOffset(offset), floatingUiFlip({ padding: 20 }), floatingUiHide({ padding: 20 })],
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
