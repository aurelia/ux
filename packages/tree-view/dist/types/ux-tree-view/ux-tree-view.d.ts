import { ViewCompiler, ViewResources, BehaviorInstruction, Container, ViewFactory, TaskQueue } from 'aurelia-framework';
import { INode } from './i-node';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxTreeViewTheme } from './ux-tree-view-theme';
import { UxDefaultTreeViewConfiguration } from '../ux-default-tree-view-configuration';
export declare class UxTreeView implements UxComponent {
    private element;
    private taskQueue;
    private styleEngine;
    static NODE_SELECTED_EVENT: string;
    static processContent(_viewCompiler: ViewCompiler, _resources: ViewResources, element: Element, _instruction: BehaviorInstruction): boolean;
    /**
     * @param element the host element of a <ux-tree-view/>
     * @param container the container associated with a <ux-tree-view/>
     */
    private static getNodeFactory;
    constructor(element: HTMLElement, taskQueue: TaskQueue, styleEngine: StyleEngine, defaultConfiguration: UxDefaultTreeViewConfiguration, container: Container);
    nodeViewFactory: ViewFactory;
    selectedNode: INode;
    nodes: INode[];
    theme: UxTreeViewTheme;
    themeChanged(newValue: UxTreeViewTheme): void;
    treeViews: UxTreeView[];
    toggleExpanded(n: INode, e: Event): boolean;
    nodeClicked(n: INode): boolean;
    childNodeSelected(n: INode): void;
    findPath(nodes: INode[], predicate: (node: INode) => boolean): number[];
    expandPath(path: number[]): void;
    find(predicate: (node: INode) => boolean): void;
    dispatchEvent(type: string, node: INode): void;
}
