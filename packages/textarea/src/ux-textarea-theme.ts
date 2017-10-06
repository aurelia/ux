import { swatches, UxTheme } from 'aurelia-ux';

export class UxTextareaTheme implements UxTheme {
  public themeKey = 'textarea';

  public foreground: string = swatches.grey.p900;
  public background: string = 'transparent';

  public borderBottom: string = `1px solid ${swatches.grey.p500}`;
  public borderBottomHover: string = '1px solid var(--design-accent)';
  public borderBottomFocus: string = 'var(--design-accent)';

  public diabledForeground: string = swatches.grey.p500;
  public disabledBorderBottom: string = `1px dashed ${swatches.grey.p300}`;

  public fullWidthBorder: string = `1px solid ${swatches.grey.p200}`;
  public fullWidthBackground: string = swatches.white;
  public fullWidthBackgroundDisabled: string = swatches.grey.p200;

  public error: string = swatches.red.p500;
}
