import { swatches, UxTheme } from 'aurelia-ux';

export class UxListTheme extends UxTheme {
  public themeKey = 'list';

  public listForeground: string = swatches.grey.p900;
  public listSecondaryForeground: string = swatches.grey.p700;

  public listBackground: string = swatches.white;
}
