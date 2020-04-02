import { UxModalTheme } from './ux-modal-theme';

export type ModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'absolute';
export type ModalKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape'|'Enter'>

export class DefaultModalConfiguration {
  modalBreakpoint?: number = void 0;
  host?: 'body' | HTMLElement | false | string = void 0;
  overlayDismiss?: boolean = void 0;
  lock?: boolean = void 0;
  position?: ModalPosition = void 0;
  keyboard?: ModalKeybord = void 0;
  theme?: UxModalTheme = void 0;
}

