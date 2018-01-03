import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxSwitchTheme implements UxTheme {
  public themeKey: string = 'switch';

  public track: string = swatches.grey.p300;
  public indicator: string = swatches.white;
  public trackActive: string = 'var(--ux-design--accent-light, #FF80AB)';
  public indicatorActive: string = 'var(--ux-design--accent, #F48FB1)';
  public trackDisabled: string = swatches.grey.p500;
  public indicatorDisabled: string = swatches.grey.p300;
}
