import { IController } from '@aurelia-ux/core';
import { UxTreeView } from './ux-tree-view';
export interface IUxTreeViewElement extends HTMLElement {
    au: {
        controller: IController<UxTreeView>;
        'ux-tree-view': IController<UxTreeView>;
    };
}
