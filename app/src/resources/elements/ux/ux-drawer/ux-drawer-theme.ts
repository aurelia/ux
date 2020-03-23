import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxDrawerTheme implements UxTheme {
  public themeKey = 'drawer';

  public foreground: string = swatches.white;
  public background: string = swatches.grey.p700;
}
