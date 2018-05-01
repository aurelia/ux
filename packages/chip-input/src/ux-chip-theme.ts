import { UxTheme } from '@aurelia-ux/core';

export class UxChipTheme implements UxTheme {
  public themeKey: string = 'chip';

  public background: string;
  public foreground: string;

  public deleteBackground: string;
  public deleteForeground: string;
}
