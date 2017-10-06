import { swatches, UxTheme } from 'aurelia-ux';

export class UxDatepickerTheme implements UxTheme {
  public themeKey = 'datepicker';

  public foreground: string = '#333';
  public overlay: string = 'rgba(0, 0, 0, 0.25)';
  public calendarIcon: string = 'currentColor';

  // datepicker modal
  public headerForeground: string = 'var(--design-primary-foreground)';
  public headerBackground: string = 'var(--design-primary)';

  // calendar properties
  public weekdayForeground: string = swatches.grey.p600;
  public selectedDayForeground: string = 'var(--design-accent-foreground)';
  public selectedDayBackground: string = 'var(--design-accent)';
  public outOfRangeForeground: string = swatches.grey.p600;
}
