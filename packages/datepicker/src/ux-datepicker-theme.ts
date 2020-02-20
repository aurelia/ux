import { UxTheme } from '@aurelia-ux/core';

export class UxDatepickerTheme implements UxTheme {
  public themeKey = 'datepicker';

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

  public overlay?: string;
  public calendarIcon?: string; /* remove, use label and active ? */

  // datepicker modal
  public headerForeground?: string;
  public headerBackground?: string;

  // calendar properties
  public weekdayForeground?: string;
  public selectedDayForeground?: string;
  public selectedDayBackground?: string;
  public outOfRangeForeground?: string;
}
