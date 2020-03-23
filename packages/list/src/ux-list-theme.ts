import { UxTheme } from '@aurelia-ux/core';

export class UxListTheme implements UxTheme {
  public themeKey = 'list';

  public foreground?: string = void 0;
  public secondaryForeground?: string = void 0;

  public background?: string = void 0;
  public backgroundSelected?: string = void 0;
}
