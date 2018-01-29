import {
  customElement,
  bindable,
  ViewCompiler,
  ViewResources,
  processContent,
  DOM,
  inject
} from 'aurelia-framework';

import { UxOptionElement } from './ux-option';
import { getAuViewModel, bool } from './util';

declare module './ux-option' {
  interface UxOption {
    group: UxOptGroup | null;
  }
}

export interface UxOptGroupElement extends HTMLElement {
  nodeName: 'UX-OPTGROUP';
  options: UxOptionElement[];
}

export interface OptGroupOptionsCt extends HTMLElement {
  children: HTMLCollectionOf<UxOptionElement>;
}

@inject(DOM.Element)
@processContent(extractUxOptions)
@customElement('ux-optgroup')
export class UxOptGroup {

  @bindable()
  public label: string;
  @bindable()
  public disabled: boolean | string;
  public readonly optionsCt: OptGroupOptionsCt;

  constructor(
    public readonly element: UxOptGroupElement
  ) {
    Object.setPrototypeOf(element, UxOptGroupElementProto);
  }

  public getOptions(): UxOptionElement[] {
    if (!this.optionsCt) {
      return [];
    }
    return Array.from(this.optionsCt.children);
  }

  public get isDisabled() {
    return bool(this.disabled);
  }
}

function extractUxOptions(
  _: ViewCompiler,
  __: ViewResources,
  node: Element
) {
  let currentChild = node.firstChild;
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
  }
});
