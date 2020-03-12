import { UxTheme } from '@aurelia-ux/core';

export class UxCardTheme implements UxTheme {
  public themeKey = 'card';

  public primaryHeaderForeground?: string = void 0;
  public primaryHeaderBackground?: string = void 0;
  public accentHeaderForeground?: string = void 0;
  public accentHeaderBackground?: string = void 0;
  public background?: string = void 0;
  public foreground?: string = void 0;
  public titleForeground?: string = void 0;
  public subTitleForeground?: string = void 0;
  public subTitleOpacity?: string = void 0;
}
