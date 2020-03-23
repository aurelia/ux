import { UxTheme } from '@aurelia-ux/core';

export class UxDatepickerTheme implements UxTheme {
  public themeKey = 'datepicker';

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

  public overlay?: string = void 0;

  // datepicker modal
  public headerForeground?: string = void 0;
  public headerBackground?: string = void 0;

  // calendar properties
  public weekdayForeground?: string = void 0;
  public selectedDayForeground?: string = void 0;
  public selectedDayBackground?: string = void 0;
  public outOfRangeForeground?: string = void 0;
}
