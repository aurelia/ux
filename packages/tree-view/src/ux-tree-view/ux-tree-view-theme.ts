import { UxTheme } from '@aurelia-ux/core';

export class UxTreeViewTheme implements UxTheme {
  public themeKey = 'tree-view';

  public childMargin: string = '15px';
  public selectedBackground: string = '';
  public expanderForeground: string = '';
}
