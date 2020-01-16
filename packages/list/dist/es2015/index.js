import { PLATFORM } from 'aurelia-framework';
import { UxList } from './ux-list';
import { UxListItem } from './ux-list-item';
export { UxListTheme } from './ux-list-theme';
export { UxList, UxListItem };
export function configure(config) {
    config.globalResources([
        PLATFORM.moduleName('./ux-list'),
        PLATFORM.moduleName('./ux-list-item')
    ]);
}
//# sourceMappingURL=index.js.map