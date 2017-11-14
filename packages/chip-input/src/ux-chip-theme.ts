import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxChipTheme implements UxTheme {
  public themeKey: string = 'chip';

  public background: string = 'var(--ux-design--accent)';
  public foreground: string = 'var(--ux-design--accent-foreground)';

  public deleteBackground: string = swatches.grey.p500;
  public deleteForeground: string = swatches.grey.p200;
}
