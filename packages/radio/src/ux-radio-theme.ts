import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxRadioTheme implements UxTheme {
  public themeKey: string = 'radio';

  public border: string = `solid 2px ${swatches.grey.p700}`;
  public hoverBorder: string = 'solid 2px var(--ux-design--accent, #FF4081)';
  public checkedBackground: string = 'var(--ux-design--accent, #FF4081)';
  public checkmarkColor: string = swatches.white;
  public disabledBorder: string = `solid 2px ${swatches.grey.p500}`;
  public disabledBackground: string = swatches.grey.p500;
  public disabledForeground: string = swatches.grey.p300;
}
