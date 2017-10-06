import { swatches, UxTheme } from 'aurelia-ux';

export class UxCheckboxTheme implements UxTheme {
  public themeKey: string = 'checkbox';

  public border: string = `solid 2px ${swatches.grey.p700}`;
  public hoverBorder: string = 'solid 2px var(--design-accent)';
  public checkedBackground: string = 'var(--design-accent)';
  public checkmarkColor: string = swatches.white;
  public disabledBorder: string = `solid 2px ${swatches.grey.p500}`;
  public disabledBackground: string = swatches.grey.p500;
  public disabledForeground: string = swatches.grey.p300;
}
