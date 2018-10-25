import { UxTheme } from '@aurelia-ux/core';

export class UxBoilerplateTheme implements UxTheme {
  public themeKey = 'boilerplate'; // the key for your components themes

  /*
   * The theming system will convert all of these properties to CSS variables.
   *
   * The naming convention for this is --aurelia-ux--key-property
   *
   * For example background would become --aurelia-ux--boilerplate-background
   */

  public background: string;
}
