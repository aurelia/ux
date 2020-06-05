import {
  customElement,
  bindable,
  useView,
  PLATFORM,
  processContent,
  ViewCompiler,
  ViewResources,
  BehaviorInstruction,
  inject,
  Optional,
  Container,
  ViewFactory,
  TaskQueue
} from 'aurelia-framework';
import { INode } from './i-node';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxTreeViewTheme } from './ux-tree-view-theme';
import { UxDefaultTreeViewConfiguration } from '../ux-default-tree-view-configuration';

let id = 0;
const templateLookup: Record<string, string> = {};
const getNextNodeTemplateId = () => ++id;

@inject(
  Element,
  TaskQueue,
  StyleEngine,
  UxDefaultTreeViewConfiguration,
  Container,
)
@customElement('ux-tree-view')
@useView(PLATFORM.moduleName('./ux-tree-view.html'))
@processContent(UxTreeView.processContent)
export class UxTreeView implements UxComponent {

  static NODE_SELECTED_EVENT = 'node-selected';

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

  /**
   * @param element the host element of a <ux-tree-view/>
   * @param container the container associated with a <ux-tree-view/>
   */
  private static getNodeFactory(element: Element, container: Container): ViewFactory {
    const parent = container.parent ? container.parent.get(Optional.of(UxTreeView)) : null;
    const isRoot = !parent;
    // a root ux-tree view means a consumer defined one
    // this potentiall contains the template for the tree node
    if (isRoot) {
      const nodeTemplateId = element.getAttribute('data-template-id');
      if (nodeTemplateId && templateLookup[nodeTemplateId]) {
        const nodeTemplate = templateLookup[nodeTemplateId];
        const nodeViewFactory = container.get(ViewCompiler).compile(`<template>${nodeTemplate}</template>`, container.get(ViewResources));
        return nodeViewFactory;
      } else {
        // create a default <ux-tree-node/> factory
        return container.get(ViewCompiler).compile('<template>${$node}</template>', container.get(ViewResources));
      }
    } else {
      // if it's not a root <ux-tree-view/>
      // assume that the parent has already built the node factory and simply get it from there
      return parent.nodeViewFactory;
    }
  }

  constructor(
    private element: HTMLElement,
    private taskQueue: TaskQueue,
    private styleEngine: StyleEngine,
    defaultConfiguration: UxDefaultTreeViewConfiguration,
    container: Container,
  ) {
    if (defaultConfiguration.theme) {
      this.theme = defaultConfiguration.theme;
    }
    this.nodeViewFactory = UxTreeView.getNodeFactory(element, container);
  }

  nodeViewFactory: ViewFactory;
  selectedNode: INode;

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

  findPath(nodes: INode[], predicate: (node: INode) => boolean): number[] {
    const path: number[] = [];
    for (let i = 0; i < nodes.length; ++i) {
      if (predicate(nodes[i])) {
        return [i];
      }
      if (!nodes[i].children) {
        continue;
      }
      const childPath = this.findPath(nodes[i].children!, predicate);
      if (childPath.length) {
        return [i, ...childPath];
      }
    }
    return path;
  }

  expandPath(path: number[]) {
    if (path.length === 1) {
      this.nodeClicked(this.nodes[path[0]]);
      this.element.querySelectorAll('.ux-tree-view--node')[path[0]].scrollIntoView();
    } else {
      this.nodes[path[0]].expanded = true;
      // let Aurelia populate treeViews by queueing the task
      // todo: flatten the data source via a data normalization step first
      // as this technique requires many round of queueTask if the node selected is deep
      this.taskQueue.queueTask(() => {
        this.treeViews[path[0]].expandPath(path.slice(1));
      });
    }
  }

  find(predicate: (node: INode) => boolean) {
    // to avoid rendering the whole tree finding a node is a 2-step process
    // firstly, find the path - nodes which need to be expanded to display the target node
    const path = this.findPath(this.nodes, predicate);
    if (path.length) {
      // secondly, expand the path
      this.expandPath(path);
    }
  }

  dispatchEvent(type: string, node: INode) {
    this.element.dispatchEvent(new CustomEvent(type, { bubbles: true, detail: { node } }));
  }
}

