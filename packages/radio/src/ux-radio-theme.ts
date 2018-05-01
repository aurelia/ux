import { UxTheme } from '@aurelia-ux/core';

export class UxRadioTheme implements UxTheme {
  public themeKey: string = 'radio';

  public border: string;
  public hoverBorder: string;
  public checkedBackground: string;
  public checkmarkColor: string;
  public disabledBorder: string;
  public disabledBackground: string;
  public disabledForeground: string;
}
