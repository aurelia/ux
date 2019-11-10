/// <reference path="html.d.ts" />
import { FrameworkConfiguration } from 'aurelia-framework';
import { UxList } from './ux-list';
import { UxListItem } from './ux-list-item';

export { UxListTheme } from './ux-list-theme';
export { UxList, UxListItem };

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxList,
    UxListItem
  ]);
}
