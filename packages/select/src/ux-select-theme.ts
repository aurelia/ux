import { swatches, UxTheme } from '@aurelia-ux/core';

export class UxSelectTheme implements UxTheme {
  public themeKey = 'select';

  public foreground: string = swatches.grey.p600;
  public background: string = 'transparent';

  public triggerBorder: string = `1px solid ${swatches.grey.p600}`;

  public listMaxWidth: number = 250;
  public listMaxWidthPx: string = '250px';
  public listMaxHeight: number = 400;
  public listMaxHeightPx: string = '400px';
  public listBackground: string = swatches.white;
  public listTransition: number = 200;
  public listTransitionS: string = '0.2s';

  public valueCtMinWidth: number = 50;

  public borderBottom: string = `1px solid ${swatches.grey.p500}`;
  public borderBottomHover: string = '1px solid var(--ux-design--accent)';
  public borderBottomSelected: string = '';

  public diabledForeground: string = swatches.grey.p500;
  public disabledBorderBottom: string = `1px dashed ${swatches.grey.p300}`;

  public fullWidthBorder: string = `1px solid ${swatches.grey.p200}`;
  public fullWidthBackground: string = swatches.white;
  public fullWidthBackgroundDisabled: string = swatches.grey.p200;

  public selectListBoxShadow: string = 'rgba(0, 0, 0, 0.12)';

  public selected: string = swatches.grey.p300;

  public error: string = swatches.red.p500;
}
