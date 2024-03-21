import { ExtendedRefs, FloatingContext, Placement, ReferenceType } from '@floating-ui/react';
import { Dispatch, HTMLProps, SetStateAction } from 'react';

/*********************************************************************************
 * Base Props
 *********************************************************************************/

interface BaseProps {
    value?: Date;
    onChange?: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
}

interface BasePickerProps extends BaseProps {
    preSelectionDate?: Date;
    setPreSelectionDate?: Dispatch<SetStateAction<Date>>;
}

/*********************************************************************************
 * Calendar Props
 *********************************************************************************/

export interface BaseDateCalendarProps extends BaseProps {
    fixedRows?: boolean;
}

/*********************************************************************************
 * DayPicker Props
 *********************************************************************************/

export interface BaseDayPickerProps extends BasePickerProps, Pick<BaseDateCalendarProps, 'fixedRows'> {
    onMonthPickerSelect?: () => void;
    onYearPickerSelect?: () => void;
}

/*********************************************************************************
 * MonthPicker Props
 *********************************************************************************/

export interface BaseMonthPickerProps extends BasePickerProps {
    onYearPickerSelect?: () => void;
}

/*********************************************************************************
 * YearPicker Props
 *********************************************************************************/

export interface BaseYearPickerProps extends BasePickerProps {}

/*********************************************************************************
 * Floating Props
 *********************************************************************************/

export type FloatingPlacement = Placement;

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
