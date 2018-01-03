import { UxTheme } from '@aurelia-ux/core';

export class UxTagTheme implements UxTheme {
  public themeKey: string = 'tag';

  public background: string = 'var(--ux-design--accent, #FF4081)';
  public foreground: string = 'var(--ux-design--accent-foreground, #FFFFFF)';
}
