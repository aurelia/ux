import {
  customElement,
  bindable,
  computedFrom,
  ViewResources,
  ViewCompiler,
  DOM,
  processContent,
  ElementEvents,
  inject,
  PLATFORM,
  InternalCollectionObserver,
  ObserverLocator,
  TaskQueue,
  // inlineView,
} from 'aurelia-framework';

import { getLogger } from 'aurelia-logging';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';

import { UxSelectTheme } from './ux-select-theme';
import { UxOptGroupElement } from './ux-optgroup';
import { UxOptionElement } from './ux-option';
import { getAuViewModel, bool } from './util';
// import * as UX_SELECT_VIEW from './ux-select.html';

declare module './ux-option' {
  interface UxOption {
    uxSelect: UxSelect;
  }
}

declare module './ux-optgroup' {
  interface UxOptGroup {
    uxSelect: UxSelect;
  }
}

const UP = 38;
// const RIGHT = 39;
const DOWN = 40;
// const LEFT = 37;
// const ESC = 27;
const ENTER = 13;
const SPACE = 32;
const logger = getLogger('ux-select');
const invalidMultipleValueMsg = 'Only null or Array instances can be bound to a multi-select';
const selectArrayContext = 'context:ux-select';

export interface UxSelectElement<T = any> extends HTMLElement {
  matcher(a: any, b: any): boolean;
  value: T;
}

export interface UxOptionContainer extends HTMLElement {
  children: HTMLCollectionOf<UxOptGroupElement | UxOptionElement>;
}

@inject(Element, StyleEngine, ObserverLocator, TaskQueue)
@processContent(extractUxOption)
@customElement('ux-select')
// @inlineView(UX_SELECT_VIEW)
export class UxSelect implements UxComponent {

  private selectedOption: UxOptionElement | null = null;

  // Temporarily used to store <ux-option/> reference in interaction
  private focusedUxOption: UxOptionElement | null;

  // Observe window events
  private winEvents: ElementEvents;

  @bindable()
  public theme: UxSelectTheme;

  @bindable()
  public autofocus: boolean | string;

  @bindable({ defaultValue: false })
  public disabled: boolean | string;

  @bindable({ defaultValue: false })
  public multiple: boolean | string;

  @bindable()
  public placeholder: string;

  public value: any;
  public displayValue: string;
  public expanded: boolean;

  // Populated by Aurelia
  public readonly optionWrapperEl: HTMLElement;
  public readonly optionCtEl: UxOptionContainer;

  constructor(
    public readonly element: UxSelectElement,
    private styleEngine: StyleEngine,
    private observerLocator: ObserverLocator,
    private taskQueue: TaskQueue
  ) {
    // Only chrome persist the element prototype when cloning with clone node
    Object.setPrototypeOf(element, UxSelectElementProto);
  }

  public bind() {
    if (bool(this.autofocus)) {
      // setTimeout(focusEl, 0, this.button);
    }
    if (this.isMultiple) {
      if (!this.value) {
        this.value = [];
      } else if (!Array.isArray(this.value)) {
        throw new Error(invalidMultipleValueMsg);
      }
    }
    if (!this.winEvents) {
      this.winEvents = new ElementEvents(window as any);
    }
    // Initially Synchronize options with value of this element
    this.taskQueue.queueMicroTask(this);
  }

  public attached() {
    this.resolveDisplayValue();
  }

  public unbind() {
    this.winEvents.disposeAll();
    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(selectArrayContext, this);
      this.arrayObserver = null;
    }
    this.selectedOption = null;
  }

  private resolveDisplayValue() {
    const values = this.options
      .filter(option =>
        Array.isArray(this.value) ?
          this.value.some(value => value === option.value) :
          option.value === this.value)
      .map(t => t.innerText);

    this.displayValue = values.join(', ');

    if (this.displayValue.length > 0) {
      this.element.classList.add('ux-select--has-value');
    } else {
      this.element.classList.remove('ux-select--has-value');
    }
  }

  private ignoreSelectEvent: boolean = true;
  private synchronizeOptions() {
    const value = this.value;
    const isArray = Array.isArray(value);

    const options = this.options;
    const matcher = this.element.matcher || defaultMatcher;

    let i = options.length;
    this.ignoreSelectEvent = true;
    while (i--) {
      const option = options[i];
      const optionValue = option.value;
      if (isArray) {
        option.selected = value.findIndex((item: any) => !!matcher(optionValue, item)) !== -1;
        continue;
      }
      option.selected = !!matcher(optionValue, value);
    }
    this.ignoreSelectEvent = false;
  }

  private synchronizeValue() {
    const options = this.options;
    const ii = options.length;
    let count = 0;
    let optionValues: any[] | null = [];

    // extract value from ux-option
    for (let i = 0; i < ii; i++) {
      const option = options[i];
      if (!option.selected) {
        continue;
      }
      optionValues.push(option.value);
      count++;
    }

    if (this.isMultiple) {
      // multi-select
      if (Array.isArray(this.value)) {
        const selectValues = this.value;
        const matcher = this.element.matcher || defaultMatcher;
        // remove items that are no longer selected.
        let i = 0;
        while (i < selectValues.length) {
          const a = selectValues[i];
          if (optionValues.findIndex(b => matcher(a, b)) === -1) {
            selectValues.splice(i, 1);
          } else {
            i++;
          }
        }
        // add items that have been selected.
        i = 0;
        while (i < optionValues.length) {
          const a = optionValues[i];
          if (selectValues.findIndex(b => matcher(a, b)) === -1) {
            selectValues.push(a);
          }
          i++;
        }
        this.resolveDisplayValue();
        return; // don't notify.
      }
    } else {
      // single-select
      // tslint:disable-next-line:prefer-conditional-expression
      if (count === 0) {
        optionValues = null;
      } else {
        optionValues = optionValues[0];
      }
      this.setValue(optionValues);
    }
  }

  private setupListAnchor() {
    this.calcAnchorPosition();
    this.winEvents.subscribe('wheel', (e: WheelEvent) => {
      if (this.expanded) {
        if (e.target === PLATFORM.global || !this.optionWrapperEl.contains(e.target as HTMLElement)) {
          this.collapse();
        }
      }
    }, true);
  }

  private unsetupListAnchor() {
    this.listAnchor = null;
    this.winEvents.disposeAll();
  }

  public listAnchor: { x: number | string, y: number | string } | null;
  private calcAnchorPosition() {
    const elDim = this.element.getBoundingClientRect();
    const offsetY = (48 - elDim.height) / 2;
    this.listAnchor = { x: elDim.left, y: elDim.top - offsetY };
  }

  private onKeyboardSelect() {
    if (!this.expanded) {
      return;
    }
    const focusedOption = this.focusedUxOption;
    if (this.isMultiple) {
      if (!focusedOption) {
        return;
      }
      focusedOption.selected = !focusedOption.selected;
    } else {
      this.collapse();
    }
  }

  public call() {
    this.synchronizeOptions();
  }

  public getValue() {
    return this.value;
  }

  private arrayObserver: InternalCollectionObserver | null;
  public setValue(newValue: any) {
    if (newValue !== null && newValue !== undefined && this.isMultiple && !Array.isArray(newValue)) {
      throw new Error('Only null, undenfined or Array instances can be bound to a multi-select.');
    }

    if (this.value === newValue) {
      return;
    }
    // unsubscribe from old array.
    if (this.arrayObserver) {
      this.arrayObserver.unsubscribe(selectArrayContext, this);
      this.arrayObserver = null;
    }
    if (this.isMultiple) {
      // subscribe to new array.
      if (Array.isArray(newValue)) {
        this.arrayObserver = this.observerLocator.getArrayObserver(newValue);
        this.arrayObserver.subscribe(selectArrayContext, this);
      }
    }
    if (newValue !== this.value) {
      this.value = newValue;
      this.resolveDisplayValue();
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  private isExpanding: boolean;
  public expand() {
    if (this.expanded) {
      return;
    }
    if (this.isExpanding) {
      return;
    }
    this.isExpanding = true;
    this.optionWrapperEl.classList.add('ux-select__list-wrapper--open');
    setTimeout(() => {
      this.optionCtEl.classList.add('ux-select__list-container--open');
      this.isExpanding = false;
      this.expanded = true;
      this.setFocusedOption(this.selectedOption);
    }, 0);
    this.setupListAnchor();
  }

  private isCollapsing: boolean;
  public collapse() {
    if (this.isCollapsing) {
      return;
    }
    this.isCollapsing = true;
    this.optionCtEl.classList.remove('ux-select__list-container--open');
    setTimeout(() => {
      this.optionWrapperEl.classList.remove('ux-select__list-wrapper--open');
      this.isCollapsing = false;
      this.expanded = false;
      this.setFocusedOption(null);
      this.unsetupListAnchor();
    }, this.theme && this.theme.listTransition || 125);
  }

  private setFocusedOption(focusedOption: UxOptionElement | null) {
    const oldFocusedOption = this.focusedUxOption;
    if (focusedOption !== oldFocusedOption) {
      if (oldFocusedOption) {
        oldFocusedOption.focused = false;
      }
      if (focusedOption) {
        focusedOption.focused = true;
        focusedOption.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
      this.focusedUxOption = focusedOption;
    }
  }

  public moveSelectedIndex(offset: number) {
    let currentIndex: number = 0;
    const options = this.options;
    if (this.focusedUxOption) {
      currentIndex = options.indexOf(this.focusedUxOption);
    } else if (this.selectedOption) {
      currentIndex = options.indexOf(this.selectedOption);
    }
    let nextIndex = currentIndex + offset;
    if (nextIndex > options.length - 1) {
      nextIndex = options.length - 1;
    }
    if (nextIndex < 0) {
      nextIndex = 0;
    }
    const focusedOption = options[nextIndex];
    if (focusedOption.disabled) {
      if (offset > 0) {
        if (nextIndex === options.length - 1) {
          return;
        }
        this.moveSelectedIndex(offset + 1);
      } else {
        if (nextIndex < 0) {
          return;
        }
        this.moveSelectedIndex(offset - 1);
      }
      return;
    }
    this.setFocusedOption(focusedOption);
    focusedOption.focused = true;
    if (this.isMultiple) {
      // empty
    } else {
      this.ignoreSelectEvent = true;
      if (this.selectedOption) {
        this.selectedOption.selected = false;
      }
      this.selectedOption = focusedOption;
      this.selectedOption.selected = true;
      this.ignoreSelectEvent = false;
      this.setValue(this.selectedOption.value);
    }
  }

  public onTriggerClick() {
    if (!this.isDisabled) {
      if (this.expanded) {
        return;
      }
      this.expand();
    }
  }

  public onBlur() {
    if (!this.element.contains(DOM.activeElement)) {
      this.collapse();
    }
  }

  public onSelect(e: CustomEvent) {
    e.stopPropagation();
    if (this.ignoreSelectEvent) {
      return;
    }
    const newSelection: UxOptionElement = e.detail;
    const lastSelection = this.selectedOption;
    if (this.isMultiple) {
      this.synchronizeValue();
    } else {
      this.ignoreSelectEvent = true;
      if (lastSelection) {
        lastSelection.selected = false;
      }
      this.ignoreSelectEvent = false;
      this.selectedOption = newSelection;
      this.setValue(newSelection.value);

      if (this.expanded) {
        this.collapse();
      }
    }
  }

  public onKeyDown(event: KeyboardEvent) {
    if (this.isDisabled) {
      return;
    }
    // tslint:disable-next-line:switch-default
    switch (event.which) {
      case UP: case DOWN:
        this.moveSelectedIndex(event.which === UP ? -1 : 1);
        event.preventDefault();
        break;
      case ENTER: case SPACE:
        this.onKeyboardSelect();
        event.preventDefault();
        break;
    }
    return true;
  }

  public themeChanged(newValue: UxSelectTheme) {
    if (newValue && !newValue.themeKey) {
      newValue.themeKey = 'ux-select';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public multipleChanged(newValue: boolean | string, oldValue: boolean | string) {
    newValue = bool(newValue);
    oldValue = bool(oldValue);
    const hasChanged = newValue !== oldValue;

    if (hasChanged) {
      this.ignoreSelectEvent = true;
      for (const opt of this.options) {
        opt.selected = false;
      }
      this.ignoreSelectEvent = false;
      this.selectedOption = null;
      this.setValue(newValue
        ? [] // Changing from single to multiple = reset value to empty array
        : null // Changing from multiple to single = reset value to null
      );
    }
  }

  public get options(): UxOptionElement[] {
    if (!this.optionCtEl) {
      return [];
    }
    const result: UxOptionElement[] = [];
    const children = this.optionCtEl.children;
    const ii = children.length;
    for (let i = 0; ii > i; ++i) {
      const element = children[i];
      if (element.nodeName === 'UX-OPTION') {
        result.push(element);
      } else if (element.nodeName === 'UX-OPTGROUP') {
        const groupOptions = element.options;
        const jj = groupOptions.length;
        for (let j = 0; jj > j; ++j) {
          result.push(groupOptions[j]);
        }
      }
    }
    return result;
  }

  public getOptions() {
    return this.options;
  }

  @computedFrom('multiple')
  public get isMultiple() {
    return bool(this.multiple);
  }

  @computedFrom('disabled')
  public get isDisabled() {
    return bool(this.disabled);
  }
}

function extractUxOption(
  _: ViewCompiler,
  __: ViewResources,
  node: HTMLElement
) {
  if (node.hasAttribute('containerless')) {
    logger.warn('Cannot use containerless on <ux-select/>. Consider using as-element instead.');
    node.removeAttribute('containerless');
  }
  let currentChild: any = node.firstChild;

  while (currentChild) {
    const nextSibling = currentChild.nextSibling;
    if (currentChild.nodeName === 'UX-OPTION' || currentChild.nodeName === 'UX-OPTGROUP') {
      currentChild = nextSibling;
      continue;
    }
    node.removeChild(currentChild);
    currentChild = nextSibling;
  }
  return true;
}

const UxSelectElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getAuViewModel<UxSelect>(this).getValue();
    },
    set(v: any) {
      return getAuViewModel<UxSelect>(this).setValue(v);
    }
  },
  options: {
    get() {
      return getAuViewModel<UxSelect>(this).getOptions();
    }
  }
});

function defaultMatcher<T = any>(a: T, b: T) {
  return a === b;
}
