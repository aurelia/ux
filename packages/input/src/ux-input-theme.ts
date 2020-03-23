import { UxTheme } from '@aurelia-ux/core';

export class UxInputTheme implements UxTheme {
  public themeKey = 'input';

  public foreground?: string = void 0;
  public foregroundLabel?: string = void 0;
  public background?: string = void 0;
  public backgroundHover?: string = void 0;
  public activeColor?: string = void 0;

  public fontSize?: string = void 0;
  public letterSpacing?: string = void 0;
  public labelFontSize?: string = void 0;
  public labelLetterSpacing?: string = void 0;
  public lineHeight?: string = void 0;
  public labelLineHeight?: string = void 0;

  public borderColor?: string = void 0;
  public borderRadius?: string = void 0;
  public borderWidth?: string = void 0;
  public borderActiveWidth?: string = void 0;

  public disabledForeground?: string = void 0;
  public disabledBackground?: string = void 0;

  public error?: string = void 0;
}
