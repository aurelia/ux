import {
  customElement, bindable, processAttributes, children,
  ViewResources, View, BindingEngine
} from 'aurelia-framework';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';
import { UxTab } from './ux-tab';
import { AutoSelectionStrategy, autoSelectionStrategies } from './selection/auto-selection-strategy';
import { SelectionManager } from './selection/selection-manager';
import { SelectionAnimator } from './selection/animator';

@inject(DOM.Element, ViewResources, StyleEngine, BindingEngine)
@customElement('ux-tabs')
@processAttributes(processDesignAttributes)
export class UxTabs implements Themable {

  @bindable private autoSelectUsing: string|AutoSelectionStrategy = autoSelectionStrategies.nearest;
  @bindable public theme = null;

  @children('ux-tab') public tabs: UxTab[];

  public view: View;
  private selection: SelectionManager;
  private animator = new SelectionAnimator(this.element);

  constructor(
    private readonly element: Element,
    public readonly resources: ViewResources,
    private readonly styleEngine: StyleEngine,
    private readonly bindingEngine: BindingEngine
  ) {}

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }
    this.selection = new SelectionManager(this.bindingEngine, (oldTab: UxTab|null, newTab: UxTab|null) => {
      if (oldTab && newTab) {
        this.animator.transition(oldTab.element, newTab.element);
      }
    });
    this.autoSelectUsingChanged();
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public autoSelectUsingChanged() {
    if (typeof this.autoSelectUsing === 'string') {
      if (this.autoSelectUsing in autoSelectionStrategies) {
        this.selection.autoSelectionStrategy = autoSelectionStrategies[this.autoSelectUsing];
      }
      // TODO else: log error?
    } else {
      this.selection.autoSelectionStrategy = this.autoSelectUsing as AutoSelectionStrategy;
    }
  }

  public tabsChanged() {
    this.selection.setTabs(this.tabs);
  }

  public unbind() {
    this.selection.dispose();
  }
}
