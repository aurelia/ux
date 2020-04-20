import { UxModalTheme } from './ux-modal-theme';

export type UxModalPosition = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'absolute';
export type UxModalKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape'|'Enter'>

export class UxDefaultModalConfiguration {
  public modalBreakpoint?: number = void 0;
  public host?: 'body' | HTMLElement | false | string = void 0;
  public overlayDismiss?: boolean = void 0;
  public outsideDismiss?: boolean = void 0;
  public lock?: boolean = void 0;
  public position?: UxModalPosition = void 0;
  public keyboard?: UxModalKeybord = void 0;
  public theme?: UxModalTheme = void 0;
}
