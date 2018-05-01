import { UxTheme } from '@aurelia-ux/core';

export class UxBoilerplateTheme implements UxTheme {
  public themeKey = 'boilerplate'; // the key for your components themes

  /*
   * The theming system will convert all of these properties to CSS variables.
   *
   * The naming convention for this is --ux-theme--key-property
   *
   * For example background would become --ux-theme--boilerplate-background
   */

  public background: string;
}
