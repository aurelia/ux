import {  UxTheme } from '@aurelia-ux/core';

export class UxChipInputTheme implements UxTheme {
  public themeKey: string = 'chip-input';

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

  public borderBottomWidth?: string;
  public borderBottomColor?: string;
  public borderActiveWidth?: string;

  public disabledForeground?: string;
  public disabledBackground?: string;

  public error?: string;
}
