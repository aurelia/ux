import { UxTheme } from '@aurelia-ux/core';

export class UxInputTheme implements UxTheme {
  public themeKey = 'input';

  public foreground: string;
  public background: string;

  public borderBottom: string;
  public borderBottomHover: string;
  public borderBottomSelected: string;

  public diabledForeground: string;
  public disabledBorderBottom: string;

  public fullWidthBorder: string;
  public fullWidthForeground: string;
  public fullWidthBackground: string;
  public fullWidthBackgroundDisabled: string;

  public error: string;
}
