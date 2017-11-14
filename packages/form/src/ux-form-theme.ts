import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxFormTheme implements UxTheme {
  public themeKey = 'form';

  public labelFontSize: string = '14px';
  public labelColor: string = swatches.grey.p500;
}
