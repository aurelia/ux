import { UxTheme } from '@aurelia-ux/core';

export class UxDrawerTheme implements UxTheme {
  public themeKey = 'drawer';

  public overlayColor?: string = void 0;
  public overlayOpacity?: string = void 0;
  public transitionDuration?: string = void 0;
  public overlayTransitionDuration?: string = void 0;
  public contentTransitionDuration?: string = void 0;
  public background?: string = void 0;
  public foreground?: string = void 0;
  public borderRadius?: string = void 0;
  public minWidth?: string = void 0;
}
