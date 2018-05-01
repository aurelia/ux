import { UxTheme } from '@aurelia-ux/core';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background: string;
  public foreground: string;

  public flatBackground: string;
  public flatForeground: string;

  public accentBackground: string;
  public accentForeground: string;

  public accentFlatBackground: string;
  public accentFlatForeground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;

  public fontWeight: string;
  public fontSize: string;
  public letterSpacing: string;
  public textTransform: string;
}
