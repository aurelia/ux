import { UxTheme } from '@aurelia-ux/core';

export class UxCardTheme implements UxTheme {
  public themeKey = 'card';

  public primaryHeaderForeground: string = 'var(--ux-design--primary-foreground, #fff)';
  public primaryHeaderBackground: string = 'var(--ux-design--primary, #3F51B5)';
  public accentHeaderForeground: string = 'var(--ux-design--accent-foreground, #fff)';
  public accentHeaderBackground: string = 'var(--ux-design--accent, #ff4081)';
  public background: string = 'var(--ux-design--control-background, #fff)';
  public foreground: string = 'var(--ux-design--control-foreground, #212121)';
  public titleForeground: string = 'inherit';
  public subTitleForeground: string = 'inherit';
  public subTitleOpacity: string = '0.8';
}
