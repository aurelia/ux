import { UxTheme } from '@aurelia-ux/core';

export class UxSwitchTheme implements UxTheme {
  public themeKey: string = 'switch';

  public track?: string = void 0;
  public indicator?: string = void 0;
  public trackActive?: string = void 0;
  public indicatorActive?: string = void 0;
  public trackDisabled?: string = void 0;
  public indicatorDisabled?: string = void 0;
}
