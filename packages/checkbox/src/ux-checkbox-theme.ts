import { UxTheme } from '@aurelia-ux/core';

export class UxCheckboxTheme implements UxTheme {
  public themeKey: string = 'checkbox';

  public border: string;
  public hoverBorder: string;
  public checkedBackground: string;
  public checkmarkColor: string;
  public disabledBorder: string;
  public disabledBackground: string;
  public disabledForeground: string;
}
