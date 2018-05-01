import { UxTheme } from '@aurelia-ux/core';

export class UxSwitchTheme implements UxTheme {
  public themeKey: string = 'switch';

  public track: string;
  public indicator: string;
  public trackActive: string;
  public indicatorActive: string;
  public trackDisabled: string;
  public indicatorDisabled: string;
}
