import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxTabsTheme implements UxTheme {
  public themeKey = 'tabs';

  public background: string = 'transparent';
  public foreground: string = swatches.white;
  public indicator: string = swatches.white;
}
