import { styles, useStyles } from './decorators';

let nextThemeId = 0;

function getNextDynamicThemeId() {
  return 'DynamicTheme' + (++nextThemeId);
}

export interface StyleModule {
  [x: string]: new () => any;
}

export function createDynamicStyleModule(styleUrl: string): StyleModule {
  @styles()
  @useStyles(styleUrl)
  class DynamicTheme { }

  return {
    [getNextDynamicThemeId()]: DynamicTheme
  };
}
