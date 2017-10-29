import { swatches, UxTheme } from 'aurelia-ux';

export class UxInputInfoTheme implements UxTheme {
  public themeKey = 'input-info';

  public foreground: string = swatches.grey.p600;
  public error: string = swatches.red.p500;
}
