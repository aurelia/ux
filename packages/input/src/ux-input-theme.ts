import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxInputTheme implements UxTheme {
  public themeKey = 'input';

  public foreground: string = swatches.grey.p900;
  public background: string = 'transparent';

  public borderBottom: string = `1px solid ${swatches.grey.p500}`;
  public borderBottomHover: string = '1px solid var(--ux-design--accent, #FF4081)';
  public borderBottomSelected: string = '';

  public diabledForeground: string = swatches.grey.p500;
  public disabledBorderBottom: string = `1px dashed ${swatches.grey.p300}`;

  public fullWidthBorder: string = `1px solid ${swatches.grey.p200}`;
  public fullWidthBackground: string = swatches.white;
  public fullWidthBackgroundDisabled: string = swatches.grey.p200;

  public error: string = swatches.red.p500;
}
