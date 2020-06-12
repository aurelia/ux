import { __decorate } from "tslib";
import { customElement, bindable, useView, PLATFORM, processContent, ViewCompiler, ViewResources, inject, Optional, Container, TaskQueue } from 'aurelia-framework';
import { StyleEngine } from '@aurelia-ux/core';
import { UxDefaultTreeViewConfiguration } from '../ux-default-tree-view-configuration';
let id = 0;
const templateLookup = {};
const getNextNodeTemplateId = () => ++id;
let UxTreeView = /** @class */ (() => {
    var UxTreeView_1;
    let UxTreeView = UxTreeView_1 = class UxTreeView {
        constructor(element, taskQueue, styleEngine, defaultConfiguration, container) {
            this.element = element;
            this.taskQueue = taskQueue;
            this.styleEngine = styleEngine;
            // this is populated by the HTML template
            this.treeViews = [];
            if (defaultConfiguration.theme) {
                this.theme = defaultConfiguration.theme;
            }
            this.nodeViewFactory = UxTreeView_1.getNodeFactory(element, container);
        }
        static processContent(_viewCompiler, _resources, element, _instruction) {
            const treeNode = element.querySelector('ux-tree-node');
            if (treeNode) {
                const nodeTemplateId = getNextNodeTemplateId();
                element.setAttribute('data-template-id', nodeTemplateId.toString());
                templateLookup[nodeTemplateId] = treeNode.innerHTML;
            }
            element.innerHTML = '';
            return false;
        }
        /**
         * @param element the host element of a <ux-tree-view/>
         * @param container the container associated with a <ux-tree-view/>
         */
        static getNodeFactory(element, container) {
            const parent = container.parent ? container.parent.get(Optional.of(UxTreeView_1)) : null;
            const isRoot = !parent;
            // a root ux-tree view means a consumer defined one
            // this potentiall contains the template for the tree node
            if (isRoot) {
                const nodeTemplateId = element.getAttribute('data-template-id');
                if (nodeTemplateId && templateLookup[nodeTemplateId]) {
                    const nodeTemplate = templateLookup[nodeTemplateId];
                    const nodeViewFactory = container.get(ViewCompiler).compile(`<template>${nodeTemplate}</template>`, container.get(ViewResources));
                    return nodeViewFactory;
                }
                else {
                    // create a default <ux-tree-node/> factory
                    return container.get(ViewCompiler).compile('<template>${$node}</template>', container.get(ViewResources));
                }
            }
            else {
                // if it's not a root <ux-tree-view/>
                // assume that the parent has already built the node factory and simply get it from there
                return parent.nodeViewFactory;
            }
        }
        themeChanged(newValue) {
            if (newValue !== null && !newValue.themeKey) {
                newValue.themeKey = 'tree-view';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        toggleExpanded(n, e) {
            n.expanded = !n.expanded;
            e.stopPropagation();
            return false;
        }
        nodeClicked(n) {
            if (this.selectedNode) {
                this.selectedNode.selected = false;
            }
            n.selected = true;
            this.selectedNode = n;
            this.element.dispatchEvent(new CustomEvent(UxTreeView_1.NODE_SELECTED_EVENT, { detail: { node: n }, bubbles: true }));
            return true;
        }
        childNodeSelected(n) {
            if (this.selectedNode && this.selectedNode !== n) {
                this.selectedNode.selected = false;
            }
            this.selectedNode = n;
        }
        findPath(nodes, predicate) {
            const path = [];
            for (let i = 0; i < nodes.length; ++i) {
                if (predicate(nodes[i])) {
                    return [i];
                }
                if (!nodes[i].children) {
                    continue;
                }
                const childPath = this.findPath(nodes[i].children, predicate);
                if (childPath.length) {
                    return [i, ...childPath];
                }
            }
            return path;
        }
        expandPath(path) {
            if (path.length === 1) {
                this.nodeClicked(this.nodes[path[0]]);
                this.element.querySelectorAll('.ux-tree-view--node')[path[0]].scrollIntoView();
            }
            else {
                this.nodes[path[0]].expanded = true;
                // let Aurelia populate treeViews by queueing the task
                // todo: flatten the data source via a data normalization step first
                // as this technique requires many round of queueTask if the node selected is deep
                this.taskQueue.queueTask(() => {
                    this.treeViews[path[0]].expandPath(path.slice(1));
                });
            }
        }
        find(predicate) {
            // to avoid rendering the whole tree finding a node is a 2-step process
            // firstly, find the path - nodes which need to be expanded to display the target node
            const path = this.findPath(this.nodes, predicate);
            if (path.length) {
                // secondly, expand the path
                this.expandPath(path);
            }
        }
        dispatchEvent(type, node) {
            this.element.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { node } }));
        }
    };
    UxTreeView.NODE_SELECTED_EVENT = 'node-selected';
    __decorate([
        bindable
    ], UxTreeView.prototype, "nodes", void 0);
    __decorate([
        bindable
    ], UxTreeView.prototype, "theme", void 0);
    UxTreeView = UxTreeView_1 = __decorate([
        inject(Element, TaskQueue, StyleEngine, UxDefaultTreeViewConfiguration, Container),
        customElement('ux-tree-view'),
        useView(PLATFORM.moduleName('./ux-tree-view.html')),
        processContent(UxTreeView_1.processContent)
    ], UxTreeView);
    return UxTreeView;
})();
export { UxTreeView };
//# sourceMappingURL=ux-tree-view.js.map