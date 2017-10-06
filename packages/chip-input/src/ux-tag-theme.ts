import { UxTheme } from 'aurelia-ux';

export class UxTagTheme implements UxTheme {
  public themeKey: string = 'tag';

  public background: string = 'var(--design-accent)';
  public foreground: string = 'var(--design-accent-foreground)';
}
