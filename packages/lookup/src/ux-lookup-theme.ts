import { UxTheme } from '@aurelia-ux/core';

export class UxLookupTheme implements UxTheme {
  themeKey: string = 'lookup';

  transitionDuration: string = '125ms';
  lookupBackground: string = '#F5F5F5';
  lookupForeground: string = '#212121';
  lookupElevation: string = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
  optionHoverBackground: string = 'rgba(0, 0, 0, 0.05)';
  optionFocusedBackground: string = 'rgba(0, 0, 0, 0.1)';
}
