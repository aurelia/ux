import { UxTheme } from 'aurelia-ux';

export class UxTagTheme implements UxTheme {
  public themeKey: string = 'tag';

  public background: string = 'var(--ux-design--accent)';
  public foreground: string = 'var(--ux-design--accent-foreground)';
}
