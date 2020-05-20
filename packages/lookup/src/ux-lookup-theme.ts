import { UxTheme } from '@aurelia-ux/core';

export class UxLookupTheme implements UxTheme {
  themeKey: string = 'lookup';

  static DEFAULT_INPUT_DISTANCE = 3;
  static DEFAULT_WINDOW_EDGE_DISTANCE = 15;
  static DEFAULT_BOTTOM_HEIGHT_THRESHOLD = 100;

  transitionDuration: string = '125ms';
  background: string = '#F5F5F5';
  foreground: string = '#212121';
  elevation: string = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
  optionHoverBackground: string = 'rgba(0, 0, 0, 0.05)';
  optionFocusedBackground: string = 'rgba(0, 0, 0, 0.1)';
  inputDistance: number = UxLookupTheme.DEFAULT_INPUT_DISTANCE;
  windowEdgeDistance: number = UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE;
  bottomHeightThreshold: number = UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD;
}
