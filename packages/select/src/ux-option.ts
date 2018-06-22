import {
  inject,
  bindable,
  DOM,
  ElementEvents,
  PLATFORM,
  ViewCompiler,
  ViewResources,
  customElement,
  Disposable,
  BindingEngine,
  inlineView,
  processAttributes,
} from 'aurelia-framework';

import {
  PaperRipple
} from '@aurelia-ux/core';

import { getAuViewModel } from './util';
import UX_OPTION_VIEW from './ux-option.html';

export interface UxOptionElement extends HTMLElement {
  disabled: boolean;
  focused: boolean;
  nodeName: 'UX-OPTION';
  selected: boolean;
  ripple: PaperRipple;
  value: any;
  wave(): void;
}

export interface UxOptionSelectEvent extends Event {
  target: UxOptionElement;
}

@inject(DOM.Element, BindingEngine)
@customElement('ux-option')
@processAttributes(convertTextToAttr)
@inlineView(UX_OPTION_VIEW)
export class UxOption {

  private selected: boolean = false;

  private subscriptions: Disposable[];

  public disabled: boolean;
  public parentDisabled: boolean;
  public isDisabled: boolean;
  public focused: boolean = false;

  public isMultiple: boolean;

  // populated by aurelia
  public readonly textEl: HTMLElement;

  @bindable()
  public text: string;

  @bindable()
  public value: any;

  constructor(
    public readonly element: UxOptionElement,
    private bindingEngine: BindingEngine
  ) {
    Object.setPrototypeOf(element, UxOptionElementProto);
  }

  public created() {
    const element = this.element;

    if (element.hasAttribute('value')) {
      this.value = element.getAttribute('value');
    }

    this.setDisabled(element.hasAttribute('disabled'));
    element.removeAttribute('disabled');
    element.removeAttribute('text');
  }

  public bind() {
    if (this.value === undefined) {
      this.value = this.text;
    }
  }

  public attached() {
    const optGroup = this.optGroup = this.getOptGroup();
    const uxSelect = this.uxSelect = this.getUxSelect();
    const bindingEngine = this.bindingEngine;
    this.setParentDisabled(optGroup ? optGroup.isDisabled : uxSelect.isDisabled);
    this.isMultiple = uxSelect.isMultiple;
    this.subscriptions = [
      bindingEngine.propertyObserver(uxSelect, 'isMultiple').subscribe(this.uxMultipleChanged.bind(this)),
      optGroup
        // ux-opt group will also subscribe to ux-select to know if it's disabled
        ? bindingEngine.propertyObserver(optGroup, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
        // If ux-option is not a member of a group, then subscribe to disabled state of ux-select
        : bindingEngine.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
    ];
  }

  public detached() {
    for (const s of this.subscriptions) {
      s.dispose();
    }
    this.subscriptions.length = 0;
  }

  private getOptGroup() {
    let el: HTMLElement | null = this.element;
    while (el) {
      if (el.tagName === 'UX-OPTGROUP') {
        return getAuViewModel<UxOption['optGroup']>(el);
      }
      el = el.parentElement;
    }
    return null;
  }

  private getUxSelect() {
    let el: HTMLElement | null = this.element;
    while (el) {
      if (el.tagName === 'UX-SELECT') {
        return getAuViewModel<UxOption['uxSelect']>(el);
      }
      el = el.parentElement;
    }
    throw new Error('Ux option has no "ux-select" parent');
  }

  private uxMultipleChanged(useSelect: boolean) {
    this.isMultiple = useSelect;
  }

  private setParentDisabled(disabled: boolean) {
    this.parentDisabled = !!disabled;
    this.isDisabled = this.disabled || this.parentDisabled;
  }

  private notify() {
    this.element.dispatchEvent(DOM.createCustomEvent('select', { bubbles: true, detail: this.element }));
  }

  public getFocused() {
    return this.focused;
  }

  public setFocused(focused: boolean) {
    this.focused = !!focused;
  }

  public getSelected() {
    return this.selected;
  }

  public setSelected(selected: boolean) {
    const oldValue = this.selected;
    const newValue = !!selected;
    if (newValue !== oldValue) {
      this.selected = newValue;
      this.notify();
    }
  }

  public getDisabled() {
    return this.disabled || this.parentDisabled;
  }

  public setDisabled(disabled: boolean) {
    this.disabled = !!disabled;
    this.isDisabled = this.disabled || this.parentDisabled;
  }

  public onClick() {
    if (!this.disabled) {
      if (this.isMultiple) {
        this.setSelected(!this.selected);
      } else {
        this.selected = true;
        this.notify();
      }
    }
  }

  public onMouseDown(e: MouseEvent) {
    this.addWave(e);
    return true;
  }

  /**
   * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
   */
  public addWave(e?: MouseEvent | null, autoEnd?: boolean) {
    const target = this.element;

    if (target.classList.contains('ripple')) {
      if (target.ripple === null || target.ripple === undefined) {
        target.ripple = new PaperRipple();
        target.appendChild(target.ripple.$);
      }

      target.ripple.downAction(e!);
      if (autoEnd) {
        setTimeout(removeWave, 125, target);
      } else {
        new ElementEvents(PLATFORM.global).subscribeOnce('mouseup', () => {
          target.ripple.upAction();
        }, true);
      }
    }
  }
}

function removeWave(el: UxOptionElement) {
  el.ripple.upAction();
}

function convertTextToAttr(_: ViewCompiler, __: ViewResources, node: UxOptionElement, attributes: NamedNodeMap) {
  const ii = attributes.length;
  for (let i = 0; ii > i; ++i) {
    const attr = attributes[i];
    if (attr.nodeName === 'text') {
      return;
    }
    const parts = attr.nodeName.split('.');
    if (parts[0] === 'text') {
      return;
    }
  }
  node.setAttribute('text', node.textContent || '');
  node.textContent = '';
}

const UxOptionElementProto = Object.create(HTMLElement.prototype, {
  disabled: {
    get() {
      return getAuViewModel<UxOption>(this).getDisabled();
    },
    set(disabled: boolean) {
      getAuViewModel<UxOption>(this).setDisabled(disabled);
    }
  },
  focused: {
    get() {
      return getAuViewModel<UxOption>(this).getFocused();
    },
    set(focused: boolean) {
      getAuViewModel<UxOption>(this).setFocused(focused);
    }
  },
  selected: {
    get() {
      return getAuViewModel<UxOption>(this).getSelected();
    },
    set(selected: boolean) {
      getAuViewModel<UxOption>(this).setSelected(selected);
    }
  },
  value: {
    get() {
      return getAuViewModel<UxOption>(this).value;
    },
    set(value: any) {
      getAuViewModel<UxOption>(this).value = value;
    }
  },
  wave: {
    value(): void {
      getAuViewModel<UxOption>(this).addWave(null, true);
    }
  }
});
