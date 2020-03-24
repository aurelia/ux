import { UxDrawerTheme } from './ux-drawer-theme';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom' | 'center';
export type DrawerKeybord = false | true | 'Escape' | 'Enter' | Array<'Escape'|'Enter'>

export class DefaultDrawerConfiguration {
  modalBreakpoint?: number = void 0;
  host?: 'body' | HTMLElement | false | string = void 0;
  overlayDismiss?: boolean = void 0;
  position?: DrawerPosition = void 0;
  keyboard?: DrawerKeybord = void 0;
  theme?: UxDrawerTheme = void 0;
}

