import { UxModalTheme } from './ux-modal-theme';

export type UxModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'absolute';
export type UxModalKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape'|'Enter'>

export class UxDefaultModalConfiguration {
  modalBreakpoint?: number = void 0;
  host?: 'body' | HTMLElement | false | string = void 0;
  overlayDismiss?: boolean = void 0;
  outsideDismiss?: boolean = void 0;
  lock?: boolean = void 0;
  position?: UxModalPosition = void 0;
  keyboard?: UxModalKeybord = void 0;
  theme?: UxModalTheme = void 0;
}

