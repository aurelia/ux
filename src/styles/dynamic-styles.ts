import {styles, useStyles} from './decorators';

let nextStyleId = 0;

function getNextDynamicStyleId() {
  return 'DynamicStyles' + (++nextStyleId);
}

export interface StyleModule {
  [x: string]: Function;
}

export function createDynamicStyleModule(styleUrl: string): StyleModule {
  @styles()
  @useStyles(styleUrl)
  class DynamicStyles {}

  return {
    [getNextDynamicStyleId()]: DynamicStyles
  };
}
