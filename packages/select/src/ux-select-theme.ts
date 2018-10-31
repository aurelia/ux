import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxSelectTheme implements UxTheme {
  public themeKey = 'select';

  public foreground: string = swatches.grey.p500;
  public background: string = 'transparent';

  public triggerBorder: string = `1px solid ${swatches.grey.p500}`;
  public triggerBorderDisabled: string = `1px solid ${swatches.grey.p400}`;
  public triggerBorderFocused: string = `1px solid ${swatches.grey.p600}`;

  public listMaxWidth: number = 250;
  public listMaxWidthPx: string = '250px';
  public listMaxHeight: number = 400;
  public listMaxHeightPx: string = '400px';
  public listBackground: string = swatches.white;
  public listTransition: number = 125;
  public listTransitionS: string = '0.125s';

  public optionHover: string = swatches.grey.p300;
  public optionFocused: string = swatches.grey.p300;
  public optionSelected: string = swatches.grey.p400;

  public borderBottom: string = `1px solid ${swatches.grey.p500}`;
  public borderBottomHover: string = '1px solid var(--aurelia-ux--design-accent)';
  public borderBottomSelected: string = '';

  public listboxShadow: string = 'rgba(0, 0, 0, 0.12)';

  public error: string = swatches.red.p500;
}
