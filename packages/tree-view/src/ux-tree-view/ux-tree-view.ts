import {
  customElement, bindable, useView, PLATFORM, processContent, ViewCompiler, ViewResources, BehaviorInstruction,
  inject, Optional, Container, ViewFactory
} from 'aurelia-framework';
import { INode } from './i-node';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxTreeViewTheme } from './ux-tree-view-theme';
import { UxDefaultTreeViewConfiguration } from '../ux-default-tree-view-configuration';

let id = 0;
const templateLookup: Record<string, string> = {};
const getNextNodeTemplateId = () => ++id;

@inject(Element, Container, StyleEngine, UxDefaultTreeViewConfiguration)
@customElement('ux-tree-view')
@useView(PLATFORM.moduleName('./ux-tree-view.html'))
@processContent(UxTreeView.processContent)
export class UxTreeView implements UxComponent {
  static processContent(_viewCompiler: ViewCompiler, _resources: ViewResources, element: Element, _instruction: BehaviorInstruction) {
    const treeNode = element.querySelector('ux-tree-node');
    if (treeNode) {
      const nodeTemplateId = getNextNodeTemplateId();
      element.setAttribute('data-template-id', nodeTemplateId.toString());
      templateLookup[nodeTemplateId] = treeNode.innerHTML;
    }
    element.innerHTML = '';
    return false;
  }

  static NODE_SELECTED_EVENT = 'node-selected';

  constructor(private element: HTMLElement, container: Container, private styleEngine: StyleEngine,
    public defaultConfiguration: UxDefaultTreeViewConfiguration) {
    if (this.defaultConfiguration.theme) {
      this.theme = this.defaultConfiguration.theme;
    }
    const parent = container.parent?.get(Optional.of(UxTreeView));
    const isRoot = !parent;
    if (isRoot) {
      const nodeTemplateId = this.element.getAttribute('data-template-id');
      if (nodeTemplateId && templateLookup[nodeTemplateId]) {
        const nodeTemplate = templateLookup[nodeTemplateId];
        const nodeViewFactory = container.get(ViewCompiler).compile(`<template>${nodeTemplate}</template>`, container.get(ViewResources));
        this.nodeViewFactory = nodeViewFactory;
      } else {
        // create a default <tree-node/> factory
        this.nodeViewFactory = container.get(ViewCompiler).compile('<template>${$node}</template>', container.get(ViewResources));
      }
    } else {
      this.nodeViewFactory = parent.nodeViewFactory;
    }
  }

  @bindable
  nodes: INode[];

  @bindable
  public theme: UxTreeViewTheme;
  public themeChanged(newValue: UxTreeViewTheme) {
    if (newValue !== null && !newValue.themeKey) {
      newValue.themeKey = 'tree-view';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  nodeViewFactory: ViewFactory;
  selectedNode: INode;

  // this is populated by the HTML template
  treeViews: UxTreeView[] = [];

  toggleExpanded(n: INode, e: Event): boolean {
    n.expanded = !n.expanded;
    e.stopPropagation();
    return false;
  }

  nodeClicked(n: INode) {
    if (this.selectedNode) {
      this.selectedNode.selected = false;
    }
    n.selected = true;
    this.selectedNode = n;
    this.element.dispatchEvent(new CustomEvent(
      UxTreeView.NODE_SELECTED_EVENT,
      { detail: { node: n }, bubbles: true })
    );
    return true;
  }

  childNodeSelected(n: INode) {
    if (this.selectedNode && this.selectedNode !== n) {
      this.selectedNode.selected = false;
    }
    this.selectedNode = n;
  }

  find(predicate: (node: INode) => boolean): INode | undefined {
    for (let i = 0; i < this.nodes.length; ++i) {
      if (predicate(this.nodes[i])) {
        return this.nodes[i];
      }
      if (!this.nodes[i].children) {
        continue;
      }
      const n = this.treeViews[i].find(predicate);
      if (n) {
        this.nodes[i].expanded = true;
        return n;
      }
    }
    return undefined;
  }

  dispatchEvent(type: string, node: INode) {
    this.element.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { node } }));
  }

}

