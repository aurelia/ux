import { PLATFORM } from 'aurelia-framework';
import { UxCard } from './ux-card';
import { UxCardHeader } from './ux-card-header';
import { UxCardActionRow } from './ux-card-action-row';
import { UxCardContent } from './ux-card-content';
import { UxCardFooter } from './ux-card-footer';
export { UxCardTheme } from './ux-card-theme';
export { UxCard, UxCardHeader, UxCardActionRow, UxCardContent, UxCardFooter };
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-card'),
        PLATFORM.moduleName('./ux-card-header'),
        PLATFORM.moduleName('./ux-card-action-row'),
        PLATFORM.moduleName('./ux-card-content'),
        PLATFORM.moduleName('./ux-card-footer'),
        PLATFORM.moduleName('./ux-card-separator')
    ]);
}
//# sourceMappingURL=index.js.map