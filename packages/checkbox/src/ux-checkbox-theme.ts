import { UxTheme } from '@aurelia-ux/core';

export class UxCheckboxTheme implements UxTheme {
  public themeKey: string = 'checkbox';

  public borderColor?: string;
  public borderWidth?: string;
  public activeColor?: string;
  public checkmarkColor?: string;
  public disabledBackground?: string;
  public disabledForeground?: string;
}
