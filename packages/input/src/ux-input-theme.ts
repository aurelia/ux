import { UxTheme } from '@aurelia-ux/core';

export class UxInputTheme implements UxTheme {
  public themeKey = 'input';

  public foreground?: string;
  public foregroundLabel?: string;
  public background?: string;
  public backgroundHover?: string;
  public activeColor?: string;

  public fontSize?: string;
  public letterSpacing?: string;
  public labelFontSize?: string;
  public labelLetterSpacing?: string;

  // public border?: string;
  // public borderHover?: string;
  // public borderFocus?: string;
  public borderRadius?: string;
  public borderWidth?: string;
  public borderColor?: string;

  public borderBottomWidth?: string;
  public borderBottomColor?: string;
  public borderActiveWidth?: string;
  // public borderBottomActiveColor?: string;

  public diabledForeground?: string;
  public disabledBackground?: string;
  public disabledBorder?: string;

  public error?: string;
}
