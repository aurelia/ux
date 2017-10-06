import { UxTheme } from 'aurelia-ux';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background: string;
  public foreground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;
}
