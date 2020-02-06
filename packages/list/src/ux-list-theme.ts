import { UxTheme } from '@aurelia-ux/core';

export class UxListTheme implements UxTheme {
  public themeKey = 'list';

  public foreground?: string;
  public secondaryForeground?: string;

  public background?: string;
  public backgroundSelected?: string;
}
