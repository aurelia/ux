import { UxTheme } from '@aurelia-ux/core';

export class UxSelectTheme implements UxTheme {
  public themeKey = 'select';

  static DEFAULT_LIST_TRANSITION = '125ms';

  public foreground?: string;
  public foregroundLabel?: string;
  public background?: string;
  public backgroundHover?: string;
  public activeColor?: string;

  public fontSize?: string;
  public letterSpacing?: string;
  public labelFontSize?: string;
  public labelLetterSpacing?: string;
  public lineHeight?: string;
  public labelLineHeight?: string;

  public borderColor?: string;
  public borderRadius?: string;
  public borderWidth?: string;
  public borderActiveWidth?: string;

  public disabledForeground?: string;
  public disabledBackground?: string;

  public error?: string;

  public listBackground?: string;
  public listForeground?: string;
  public listElevation?: string;
  public listTransition?: string;

  public optionHover?: string;
  public optionFocused?: string;
  public optionSelected?: string;

}
