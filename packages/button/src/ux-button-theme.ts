import { swatches, UxTheme } from 'aurelia-ux';

export class UxButtonTheme implements UxTheme {
  public themeKey = 'button';

  public background: string = 'var(--ux-design--primary)';
  public foreground: string = 'var(--ux-design--primary-foreground)';

  public flatBackground: string = 'transparent';
  public flatForeground: string = 'var(--ux-design--primary)';

  public accentBackground: string = 'var(--ux-design--accent)';
  public accentForeground: string = 'var(--ux-design--accent-foreground)';

  public accentFlatBackground: string = 'transparent';
  public accentFlatForeground: string = 'var(--ux-design--accent)';

  public backgroundDisabled: string = swatches.grey.p500;
  public foregroundDisabled: string = swatches.grey.p100;

  public fontWeight: string = '500';
  public fontSize: string = 'inherit';
  public letterSpacing: string = '0.5px';
  public textTransform: string = 'uppercase';
}
