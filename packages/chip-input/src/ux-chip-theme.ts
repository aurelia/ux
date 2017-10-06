import { swatches, UxTheme } from 'aurelia-ux';

export class UxChipTheme implements UxTheme {
  public themeKey: string = 'chip';

  public background: string = 'var(--design-accent)';
  public foreground: string = 'var(--design-accent-foreground)';

  public deleteBackground: string = swatches.grey.p500;
  public deleteForeground: string = swatches.grey.p200;
}
