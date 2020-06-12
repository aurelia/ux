import { UxModalTheme } from './ux-modal-theme';
export declare type UxModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'absolute';
export declare type UxModalKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape' | 'Enter'>;
export declare class UxDefaultModalConfiguration {
    modalBreakpoint?: number;
    host?: 'body' | HTMLElement | false | string;
    overlayDismiss?: boolean;
    outsideDismiss?: boolean;
    lock?: boolean;
    position?: UxModalPosition;
    keyboard?: UxModalKeybord;
    theme?: UxModalTheme;
}
