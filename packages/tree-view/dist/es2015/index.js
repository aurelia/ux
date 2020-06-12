import { PLATFORM } from 'aurelia-framework';
import { UxDefaultTreeViewConfiguration } from './ux-default-tree-view-configuration';
import { UxTreeView } from './ux-tree-view/ux-tree-view';
export function configure(config, callback) {
    config.globalResources([
        PLATFORM.moduleName('./ux-tree-view/ux-tree-view')
    ]);
    if (typeof callback === 'function') {
        const defaults = config.container.get(UxDefaultTreeViewConfiguration);
        callback(defaults);
    }
}
export { UxTreeView, UxDefaultTreeViewConfiguration };
export { UxTreeViewTheme } from './ux-tree-view/ux-tree-view-theme';
//# sourceMappingURL=index.js.map