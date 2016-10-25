import {styles, useStyles} from './decorators';

let nextStyleId = 0;

function getNextDynamicStyleId() {
  return 'DynamicStyles' + (++nextStyleId);
}

export function createDynamicStyleModule(styleUrl) {
  @styles()
  @useStyles(styleUrl)
  class DynamicStyles {}
  
  return {
    [getNextDynamicStyleId()]: DynamicStyles
  }
}
