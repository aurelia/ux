import { UxTheme } from '@aurelia-ux/core';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background?: string = void 0;
  public foreground?: string = void 0;

  public accentBackground?: string = void 0;
  public accentForeground?: string = void 0;

  public disabledBackground?: string = void 0;
  public disabledForeground?: string = void 0;

  public borderRadius?: string = void 0;
  public borderWidth?: string = void 0;
  public fontWeight?: string = void 0;
  public fontSize?: string = void 0;
  public letterSpacing?: string = void 0;
  public textTransform?: string = void 0;
}
