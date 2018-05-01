import { UxTheme } from '@aurelia-ux/core';

export class UxDatepickerTheme implements UxTheme {
  public themeKey = 'datepicker';

  public foreground: string;
  public overlay: string;
  public calendarIcon: string;

  // datepicker modal
  public headerForeground: string;
  public headerBackground: string;

  // calendar properties
  public weekdayForeground: string;
  public selectedDayForeground: string;
  public selectedDayBackground: string;
  public outOfRangeForeground: string;
}
