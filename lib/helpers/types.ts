import { ExtendedRefs, FloatingContext, Placement, ReferenceType } from '@floating-ui/react';
import { Dispatch, HTMLProps, SetStateAction } from 'react';

export type FloatingPlacement = Placement;

export interface BaseCalendarProps {
    value?: Date;
    onChange?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

export interface UseFloatingElementProps {
    open?: boolean;
    setOpen?: Dispatch<SetStateAction<boolean>>;
    placement?: FloatingPlacement;
    offset?: number;
    closeOnScroll?: boolean;
}

export interface UseFloatingElementReturn<RT extends ReferenceType = ReferenceType> {
    context: FloatingContext<RT>;
    refs: ExtendedRefs<RT>;
    getReferenceProps: (userProps?: HTMLProps<Element>) => Record<string, unknown>;
    getFloatingProps: (userProps?: HTMLProps<HTMLElement>) => Record<string, unknown>;
}
