import {
  customElement,
  bindable,
  autoinject,
  bindingMode,
  ViewResources,
  ViewCompiler,
  BehaviorInstruction,
  DOM,
  processContent,
  observable,
  ElementEvents,
  ObserverLocator
} from 'aurelia-framework';
import { getLogger } from 'aurelia-logging'
import { StyleEngine, UxComponent, PaperRipple } from '@aurelia-ux/core';
import { UxSelectTheme } from './ux-select-theme';

let uxSelectId = 1;
const theme = new UxSelectTheme();

const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;
const ESC = 27;
const ENTER = 13;
const SPACE = 32;
const logger = getLogger('ux-select');
const invalidMultipleValueMsg = 'Only null or Array instances can be bound to a multi-select';

export interface UxSelectElement extends HTMLElement {
  matcher(a, b): boolean
}

export interface UxOptionContext<T> {
  // Need unique name to avoid parent context leak
  uxOptionSelected?: boolean
  $index: number
  item: T
}

export interface UxOptionElement<T = any> extends HTMLElement {
  context: UxOptionContext<T>
  ripple: PaperRipple
  value: T
}

export interface UxOptionContainer<T = any> extends HTMLElement {
  children: HTMLCollectionOf<UxOptionElement<T>>
}

export interface UxOptionContainerAnchor {
  x: number
  y: number
}

export function defaultMatcher<T = any>(a: T, b: T) {
  return a === b;
}

@autoinject()
@processContent(extractUxOption)
@customElement('ux-select')
export class UxSelect<T = any> implements UxComponent {

  private element: UxSelectElement;
  @observable({ initializer: () => 0 })
  private selectedIndex: number;
  private selectedItem: T
  /**
   * Flag to set selecedItem to undefined, when value coming is not in items
   */
  private ignoreSelectedIndex: boolean

  /**
   * Temporarily used to store <ux-option/> reference in interaction
   */
  private focusedUxOption: UxOptionElement<T>

  /**
   * Observe window events
   */
  private winEvents: ElementEvents

  private optionsCtRect: ClientRect

  @bindable()
  public theme: UxSelectTheme

  @bindable()
  public autofocus: boolean | string;

  @bindable({ defaultValue: false })
  public disabled: boolean;

  @bindable({ defaultValue: false })
  public multiple: boolean | string

  @bindable()
  public items: T[]

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: T | T[];

  public readonly id: number;
  public readonly button: HTMLButtonElement
  public readonly optionsCt: UxOptionContainer<T>
  public listIsOpen: boolean
  public focusedIndex: number
  public listAnchor: UxOptionContainerAnchor

  constructor(
    element: Element,
    private styleEngine: StyleEngine,
    private observerLocator: ObserverLocator
  ) {
    this.theme = theme;
    this.element = element as UxSelectElement;
    this.id = uxSelectId++;
    styleEngine.ensureDefaultTheme(theme);
    window['uxSelect'] = this;
  }

  public bind() {
    if (this.autofocus || this.autofocus === '') {
      setTimeout(focusEl, 0, this.button)
    }
    if (this.isMultiple) {
      if (!this.value) {
        this.value = [];
      } else if (!Array.isArray(this.value)) {
        throw new Error(invalidMultipleValueMsg);
      }
    }
    if (!this.winEvents) {
      this.winEvents = new ElementEvents(window);
    }
    this.itemsChanged(this.items);
  }

  public unbind() {
    this.winEvents.disposeAll();
  }

  private synchronizeOptions() {
    let value = this.value;
    let isArray = Array.isArray(value);

    let options = this.options;
    let i = options.length;
    let matcher = this.element.matcher || defaultMatcher;
    while (i--) {
      let option = options[i];
      let optionValue = option.value;
      if (isArray) {
        option.context.uxOptionSelected = (value as T[]).findIndex(item => !!matcher(optionValue, item)) !== -1; // eslint-disable-line no-loop-func
        continue;
      }
      option.context.uxOptionSelected = !!matcher(optionValue, value);
    }
  }

  private synchronizeValue() {
    if (!this.isMultiple) {
      logger.warn('Unnecessary synchronization called for single <ux-select/>');
      return;
    }
    let options = this.options;
    let count = 0;
    let value: T | T[] = [];

    for (let i = 0, ii = options.length; i < ii; i++) {
      let option = options[i];
      if (!option.context.uxOptionSelected) {
        continue;
      }
      value.push(option.value);
      count++;
    }

    // multi-select
    if (Array.isArray(this.value)) {
      let matcher = this.element.matcher || defaultMatcher;
      // remove items that are no longer selected.
      let i = 0;
      while (i < this.value.length) {
        let a = this.value[i];
        if (value.findIndex(b => matcher(a, b)) === -1) { // eslint-disable-line no-loop-func
          this.value.splice(i, 1);
        } else {
          i++;
        }
      }
      // add items that have been selected.
      i = 0;
      while (i < value.length) {
        let a = value[i];
        if (this.value.findIndex(b => matcher(a, b)) === -1) { // eslint-disable-line no-loop-func
          this.value.push(a);
        }
        i++;
      }
    }
  }

  private setupListAnchor() {
    this.calcAnchorPosition();
    this.winEvents.subscribe('resize', () => {
      if (this.listIsOpen) {
        this.calcAnchorPosition();
      }
    }, false);
    this.winEvents.subscribe('scroll', (e: WheelEvent) => {
      if (this.listIsOpen) {
        if (!this.element.contains(e.target as HTMLElement)) {
          this.collapse();
          setTimeout(focusEl, 1, this.button);
        }
      }
    }, true);
  }

  private unsetupListAnchor() {
    this.winEvents.disposeAll();
  }

  private calcAnchorPosition() {
    const { listMaxWidth, listMaxHeight } = this.theme;
    const { top, left, width, height } = this.element.getBoundingClientRect();

    const { innerWidth: maxWidth, innerHeight: maxHeight } = window;
    let anchorX: number;
    let anchorY: number;
    if (left + listMaxWidth > maxWidth) {
      anchorX = maxWidth - listMaxWidth;
    } else {
      anchorX = left;
    }
    if (top + listMaxHeight > maxHeight) {
      anchorY = maxHeight - listMaxHeight;
    } else {
      anchorY = top;
    }
    this.listAnchor = { x: anchorX, y: anchorY }
  }

  public expand() {
    this.listIsOpen = true;
    this.focusedIndex = this.selectedIndex;
    this.setupListAnchor();
  }

  public collapse() {
    this.optionsCt.classList.remove('open');
    this.listIsOpen = false;
    this.optionsCtRect = null;
    this.unsetupListAnchor();
  }

  public select(index: number) {
    if (this.isMultiple) {
      let option = this.options[index];
      option.context.uxOptionSelected = !option.context.uxOptionSelected;
      this.synchronizeValue();
    } else {
      this.selectedIndex = index;
      this.optionsCt.blur();
    }
  }

  public moveSelectedIndex(offset: number) {
    let selectedIndex = this.selectedIndex + offset;
    selectedIndex = Math.max(0, selectedIndex);
    selectedIndex = Math.min(selectedIndex, this.items.length - 1);
    this.selectedIndex = selectedIndex;
  }

  public moveFocusedIndex(offset: number) {
    let focusedIndex = this.focusedIndex + offset;
    focusedIndex = Math.max(0, focusedIndex);
    focusedIndex = Math.min(focusedIndex, this.items.length - 1);
    this.focusedIndex = focusedIndex;

    const focusedOption = this.options[focusedIndex];
    this.addWave(focusedOption, null, true);

    const ctRect = this.optionsCtRect || (this.optionsCtRect = this.optionsCt.getBoundingClientRect());
    const rect = focusedOption.getBoundingClientRect();
    if (rect.top > ctRect.bottom - rect.height || rect.bottom < ctRect.top + rect.height) {
      focusedOption.scrollIntoView(false);
    }
  }

  public onBtnFocus() {
    if (this.listIsOpen) {
      this.optionsCt.focus();
    }
  }

  public onBtnBlur() {
    if (!this.element.contains(DOM.activeElement)) {
      this.element.dispatchEvent(DOM.createCustomEvent('blur', {}));
    }
  }

  public onBtnKeydown(key: number) {
    switch (key) {
      case UP: case DOWN:
        this.moveSelectedIndex(key === UP ? -1 : 1);
        break;
      case ENTER: case SPACE:
        return false;
    }
    return true;
  }

  public onListFocus() {
    this.optionsCt.classList.add('open');
  }

  public onListBlur() {
    if (!this.element.contains(DOM.activeElement)) {
      this.optionsCt.classList.remove('open');
      setTimeout(() => {
        this.collapse();
        this.element.dispatchEvent(DOM.createCustomEvent('blur', {}));
      }, this.theme.listTransition);
    }
  }

  public onListKeydown(key: number) {
    switch (key) {
      case UP: case DOWN:
        this.moveFocusedIndex(key === UP ? -1 : 1);
        return false;
      case ENTER: case SPACE:
        this.select(this.focusedIndex);
        return false;
      case ESC:
        this.collapse();
        this.button.focus();
        break;
    }
    return true;
  }

  public onListTransitioned() {
    if (this.isMultiple) {
      this.synchronizeOptions();
    }
  }

  public onUxOptionMousedown(e: MouseEvent) {
    const target = e.target as UxOptionElement;
    this.addWave(target, e);

    return true;
  }

  public themeChanged(newValue: UxSelectTheme) {
    if (newValue && !newValue.themeKey) {
      newValue.themeKey = 'ux-select';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public itemsChanged(items: T[]) {
    if (items) {
      if (this.isMultiple) {

      } else {
        if (this.selectedIndex !== undefined) {
          this.selectedItem = items[this.selectedIndex];
        }
      }
    }
  }

  public valueChanged(value: T) {
    const isMulitple = this.isMultiple;
    if (isMulitple) {
      if (!isNullOrArray(value)) {
        throw new Error(invalidMultipleValueMsg);
      } else {
        this.selectedIndex = -1;
        this.synchronizeOptions();
      }
    } else {
      if (this.selectedItem !== value) {
        const idx = this.items.indexOf(value);
        if (idx === -1) {
          this.ignoreSelectedIndex = true;
          this.selectedIndex = -1;
          this.ignoreSelectedIndex = false;
        } else {
          this.selectedIndex = idx;
        }
      }
    }
  }

  public selectedIndexChanged(index: number) {
    if (this.isMultiple) {
      // Should not do anything
    } else {
      if (this.items && !this.ignoreSelectedIndex) {
        this.value = this.selectedItem = this.items[index];
        this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true, detail: this.selectedItem }));
      } else {
        this.selectedItem = undefined;
      }
    }
  }

  /**
   * 
   * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
   */
  public addWave(target: UxOptionElement, e?: MouseEvent, autoEnd?: boolean) {
    if (target.classList.contains('ripple')) {
      if (target.ripple === null || target.ripple === undefined) {
        target.ripple = new PaperRipple();
        target.appendChild(target.ripple.$);
      }

      target.ripple.downAction(e);
      this.focusedUxOption = target;
      if (autoEnd) {
        setTimeout(removeWave, this.theme.listTransition, target);
      } else {
        document.addEventListener('mouseup', this);
      }
    }
  }

  public handleEvent(e: Event) {
    if (e.type === 'mouseup') {
      const target = this.focusedUxOption.ripple.upAction();
      document.removeEventListener('mouseup', this);
    }
  }

  public get options(): UxOptionElement[] {
    return this.optionsCt ? Array.from(this.optionsCt.children) : [];
  }

  public get isMultiple() {
    return this.multiple || this.multiple === '';
  }
}

function extractUxOption(compiler: ViewCompiler, resources: ViewResources, node: HTMLElement, instruction: BehaviorInstruction) {
  let currentChild = node.firstChild;
  let template: HTMLTemplateElement;
  let selectedTemplate: HTMLTemplateElement;
  while (currentChild) {
    // only get the first <ux-option></ux-option>
    if (currentChild.nodeType === 1) {
      if (!template && currentChild.nodeName === 'UX-OPTION') {
        template = DOM.createTemplateElement();
        while (currentChild.firstChild) {
          template.content.appendChild(currentChild.firstChild);
        }
        template.setAttribute('replace-part', 'ux-option');
      } else if (!selectedTemplate && currentChild.nodeName === 'TEMPLATE') {
        let temp = currentChild as HTMLTemplateElement;
        if (temp.getAttribute('replace-part') === 'selected-item') {
          selectedTemplate = temp;
        }
      }
    }
    node.removeChild(currentChild);
    currentChild = node.firstChild;
  }
  if (template) {
    node.appendChild(template);
  }
  if (selectedTemplate) {
    node.appendChild(selectedTemplate);
  }
  return true;
}

function focusEl(el: HTMLElement) {
  el.focus();
}

function removeWave(el: UxOptionElement) {
  el.ripple.upAction();
}

function isNullOrArray(val: any) {
  return val === null || Array.isArray(val);
}
