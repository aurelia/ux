import {
  customElement,
  bindable,
  ViewCompiler,
  ViewResources,
  processContent,
  DOM,
  inject,
  // inlineView,
  BindingEngine,
  Disposable,
} from 'aurelia-framework';

import { UxOptionElement } from './ux-option';
import { getAuViewModel } from './util';
// import * as UX_OPTGROUP_VIEW from './ux-optgroup.html';

declare module './ux-option' {
  interface UxOption {
    optGroup: UxOptGroup | null;
  }
}

export interface UxOptGroupElement extends HTMLElement {
  nodeName: 'UX-OPTGROUP';
  options: UxOptionElement[];
}

export interface OptGroupOptionsCt extends HTMLElement {
  children: HTMLCollectionOf<UxOptionElement>;
}

@inject(DOM.Element, BindingEngine)
@processContent(extractUxOptions)
@customElement('ux-optgroup')
// @inlineView(UX_OPTGROUP_VIEW)
export class UxOptGroup {

  private subscriptions: Disposable[];
  private parentDisabled: boolean;

  @bindable()
  public label: string;

  public disabled: boolean;
  public isDisabled: boolean;
  public readonly optionsCt: OptGroupOptionsCt;

  constructor(
    public readonly element: UxOptGroupElement,
    private bindingEngine: BindingEngine
  ) {
    Object.setPrototypeOf(element, UxOptGroupElementProto);
  }

  public created() {
    const element = this.element;
    this.setDisabled(element.hasAttribute('disabled'));
    element.removeAttribute('disabled');
  }

  public bind() {
    const uxSelect = this.uxSelect = this.getUxSelect();
    this.setParentDisabled(uxSelect.isDisabled);
  }

  public attached() {
    const be = this.bindingEngine;
    const uxSelect = this.uxSelect;
    this.subscriptions = [
      be.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
    ];
  }

  public detached() {
    for (const s of this.subscriptions) {
      s.dispose();
    }
    this.subscriptions.length = 0;
  }

  private getUxSelect() {
    let el: HTMLElement | null = this.element;
    while (el) {
      if (el.tagName === 'UX-SELECT') {
        return getAuViewModel<UxOptGroup['uxSelect']>(el);
      }
      el = el.parentElement;
    }
    throw new Error('Ux option group has no "ux-select" parent');
  }

  private setParentDisabled(disabled: boolean) {
    this.parentDisabled = !!disabled;
    this.isDisabled = this.disabled || this.parentDisabled;
  }

  public getOptions(): UxOptionElement[] {
    if (!this.optionsCt) {
      return [];
    }
    return Array.from(this.optionsCt.children);
  }

  public getDisabled() {
    return this.disabled;
  }

  public setDisabled(disabled: boolean) {
    this.disabled = disabled;
    this.isDisabled = disabled || this.parentDisabled;
  }
}

function extractUxOptions(
  _: ViewCompiler,
  __: ViewResources,
  node: Element
) {
  let currentChild: any = node.firstChild;
  while (currentChild) {
    const nextSibling = currentChild.nextSibling;
    if (currentChild.nodeName !== 'UX-OPTION') {
      node.removeChild(currentChild);
    }
    currentChild = nextSibling;
  }
  return true;
}

const UxOptGroupElementProto = Object.create(HTMLElement.prototype, {
  options: {
    get() {
      return getAuViewModel<UxOptGroup>(this).getOptions();
    }
  },
  disabled: {
    get() {
      return getAuViewModel<UxOptGroup>(this).getDisabled();
    },
    set(disabled: boolean) {
      return getAuViewModel<UxOptGroup>(this).setDisabled(disabled);
    }
  }
});
