import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxGridTheme implements UxTheme {
  public themeKey = 'grid';

  public foreground: string = swatches.white;
  public background: string = swatches.grey.p700;
}
