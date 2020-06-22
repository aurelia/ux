import { UxTheme } from '@aurelia-ux/core';

export class UxPopupTheme implements UxTheme {
  themeKey: string = 'dropdown';

  static DEFAULT_TRIGGER_DISTANCE = 3;
  static DEFAULT_WINDOW_EDGE_DISTANCE = 15;
  static DEFAULT_TRANSITION_DURATION = '125ms';

  transitionDuration: string = UxPopupTheme.DEFAULT_TRANSITION_DURATION;
  background: string = '#F5F5F5';
  foreground: string = '#212121';
  elevation: string = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
  triggerDistance: number = UxPopupTheme.DEFAULT_TRIGGER_DISTANCE;
  windowEdgeDistance: number = UxPopupTheme.DEFAULT_WINDOW_EDGE_DISTANCE;
}
