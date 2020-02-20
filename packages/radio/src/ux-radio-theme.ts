import { UxTheme } from '@aurelia-ux/core';

export class UxRadioTheme implements UxTheme {
  public themeKey: string = 'radio';

  public borderColor?: string;
  public borderWidth?: string;
  public activeColor?: string;
  public checkmarkColor?: string;
  public disabledBackground?: string;
  public disabledForeground?: string;
}
