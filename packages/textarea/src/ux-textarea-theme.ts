import { UxTheme } from '@aurelia-ux/core';

export class UxTextAreaTheme implements UxTheme {
  public themeKey = 'textarea';

  public foreground?: string;
  public foregroundLabel?: string;
  public background?: string;
  public backgroundHover?: string;
  public activeColor?: string;

  public fontSize?: string;
  public letterSpacing?: string;
  public labelFontSize?: string;
  public labelLetterSpacing?: string;

  public borderRadius?: string;
  public borderWidth?: string;
  public borderColor?: string;

  public borderBottomWidth?: string;
  public borderBottomColor?: string;
  public borderActiveWidth?: string;

  public diabledForeground?: string;
  public disabledBackground?: string;

  public error?: string;
}
