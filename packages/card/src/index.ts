/// <reference path="html.d.ts" />
import { FrameworkConfiguration } from 'aurelia-framework';
import { UxCard } from './ux-card';
import { UxCardHeader } from './ux-card-header';
import { UxCardActionRow } from './ux-card-action-row';
import { UxCardContent } from './ux-card-content';
import { UxCardFooter } from './ux-card-footer';

export { UxCardTheme } from './ux-card-theme';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    UxCard,
    UxCardHeader,
    UxCardActionRow,
    UxCardContent,
    UxCardFooter
  ]);
}
