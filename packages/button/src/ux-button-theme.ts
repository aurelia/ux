import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background: string = 'var(--ux-design--primary, #3F51B5)';
  public foreground: string = 'var(--ux-design--primary-foreground, #fff)';

  public flatBackground: string = 'transparent';
  public flatForeground: string = 'var(--ux-design--primary, #3F51B5)';

  public accentBackground: string = 'var(--ux-design--accent, #FF4081)';
  public accentForeground: string = 'var(--ux-design--accent-foreground, #fff)';

  public accentFlatBackground: string = 'transparent';
  public accentFlatForeground: string = 'var(--ux-design--accent, #FF4081)';

  public backgroundDisabled: string = swatches.grey.p500;
  public foregroundDisabled: string = swatches.grey.p100;

  public fontWeight: string = '500';
  public fontSize: string = 'inherit';
  public letterSpacing: string = '0.5px';
  public textTransform: string = 'uppercase';
}
