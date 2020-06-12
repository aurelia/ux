import { FrameworkConfiguration } from 'aurelia-framework';
import { UxDefaultTreeViewConfiguration } from './ux-default-tree-view-configuration';
import { UxTreeView } from './ux-tree-view/ux-tree-view';
export declare function configure(config: FrameworkConfiguration, callback?: (config: UxDefaultTreeViewConfiguration) => void): void;
export { UxTreeView, UxDefaultTreeViewConfiguration };
export { IUxTreeViewElement } from './ux-tree-view/i-ux-tree-view-element';
export { INode } from './ux-tree-view/i-node';
export { UxTreeViewTheme } from './ux-tree-view/ux-tree-view-theme';
