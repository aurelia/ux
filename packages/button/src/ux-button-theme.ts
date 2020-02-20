import { UxTheme } from '@aurelia-ux/core';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background?: string;
  public foreground?: string;

  public accentBackground?: string;
  public accentForeground?: string;

  public disabledBackground?: string;
  public disabledForeground?: string;

  public borderRadius?: string;
  public borderWidth?: string;
  public fontWeight?: string;
  public fontSize?: string;
  public letterSpacing?: string;
  public textTransform?: string;
}
