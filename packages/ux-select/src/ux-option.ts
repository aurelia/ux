import {
  inject,
  DOM,
  ElementEvents,
  PLATFORM,
  ViewCompiler,
  ViewResources,
  processContent,
  customElement,
  Disposable,
  BindingEngine
} from 'aurelia-framework';

import {
  // linkProperty,
  PaperRipple
} from '@aurelia-ux/core';

import { getAuViewModel } from './util';

const document: Document = PLATFORM.global.document;

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
@processContent(ensureUxOptionTextOnly)
export class UxOption {

  private selected: boolean = false;
  private value: any;

  private selectSubscriptions: Disposable[];

  public disabled: boolean = false;
  public parentDisabled: boolean = false;
  public focused: boolean = false;

  public isMultiple: boolean;

  // populated by aurelia
  public readonly textEl: HTMLElement;
  public readonly iconEl: HTMLElement;

  constructor(
    public readonly element: UxOptionElement,
    public readonly bindingEngine: BindingEngine
  ) {
    Object.setPrototypeOf(element, UxOptionElementProto);
  }

  public created() {
    const element = this.element;

    if (element.hasAttribute('value')) {
      this.value = element.getAttribute('value');
    }

    if (element.hasAttribute('disabled')) {
      this.disabled = true;
      element.removeAttribute('disabled');
    }
  }

  public bind() {
    const element = this.element;
    const group = this.group = this.getOptGroup();
    const uxSelect = this.uxSelect = this.getUxSelect();
    const bindingEngine = this.bindingEngine;

    if (element.hasAttribute('no-ripple')) {
      element.classList.remove('ripple');
    }

    const subs = this.selectSubscriptions = [
      bindingEngine.propertyObserver(uxSelect, 'isMultiple').subscribe(this.uxMultipleChanged.bind(this)),
      bindingEngine.propertyObserver(uxSelect, 'isDisabled').subscribe(this.setParentDisabled.bind(this))
    ];

    this.parentDisabled = uxSelect.isDisabled;
    this.isMultiple = this.uxSelect.isMultiple;

    if (group) {
      subs.push(
        bindingEngine.propertyObserver(group, 'disabled').subscribe(this.setParentDisabled.bind(this))
      );
      if (!this.parentDisabled) {
        this.parentDisabled = group.isDisabled;
      }
    }

  }

  public attached() {
    if (this.value === undefined) {
      this.value = this.primaryText;
    }
  }

  public unbind() {
    this.selectSubscriptions.forEach(s => s.dispose());
    this.selectSubscriptions.length = 0;
  }

  private get primaryText() {
    return this.textEl ? this.textEl.textContent : undefined;
  }

  private getOptGroup() {
    let el: HTMLElement | null = this.element;
    while (el) {
      if (el.tagName === 'UX-OPTGROUP') {
        return getAuViewModel<UxOption['group']>(el);
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

  public getValue() {
    const value = this.value;
    return value === undefined ? this.primaryText : value;
  }

  public setValue(value: any) {
    this.value = value;
  }

  public getDisabled() {
    return this.disabled || this.parentDisabled;
  }

  public setDisabled(disabled: boolean) {
    this.disabled = !!disabled;
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
      // this.focusedUxOption = target;
      if (autoEnd) {
        setTimeout(removeWave, 125, target);
      } else {
        new ElementEvents(document).subscribeOnce('mouseup', () => {
          target.ripple.upAction();
        }, true);
      }
    }
  }

}

function removeWave(el: UxOptionElement) {
  el.ripple.upAction();
}

function ensureUxOptionTextOnly(_: ViewCompiler, __: ViewResources, node: UxOptionElement) {
  node.textContent = node.textContent;
  return true;
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
      return getAuViewModel<UxOption>(this).getValue();
    },
    set(value: any) {
      getAuViewModel<UxOption>(this).setValue(value);
    }
  },
  wave: {
    value(): void {
      getAuViewModel<UxOption>(this).addWave(null, true);
    }
  }
});
