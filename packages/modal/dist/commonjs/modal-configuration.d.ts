import { UxModalTheme } from './ux-modal-theme';
export declare type ModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';
export declare type ModalKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape' | 'Enter'>;
export declare class DefaultModalConfiguration {
    modalBreakpoint?: number;
    host?: 'body' | HTMLElement | false | string;
    overlayDismiss?: boolean;
    position?: ModalPosition;
    keyboard?: ModalKeybord;
    theme?: UxModalTheme;
}
