import { UxTheme } from '@aurelia-ux/core';

export class UxSelectTheme implements UxTheme {
  public themeKey = 'select';

  public foreground: string;
  public background: string;

  public triggerBorder: string;
  public triggerBorderDisabled: string;
  public triggerBorderFocused: string;

  public listMaxWidth: number;
  public listMaxWidthPx: string;
  public listMaxHeight: number;
  public listMaxHeightPx: string;
  public listBackground: string;
  public listTransition: number;
  public listTransitionS: string;

  public optionHover: string;
  public optionFocused: string;
  public optionSelected: string;

  public borderBottom: string;
  public borderBottomHover: string;
  public borderBottomSelected: string;

  public listboxShadow: string;

  public error: string;
}
