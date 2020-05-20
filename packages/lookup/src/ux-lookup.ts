import { customElement, useView, bindable, inject, PLATFORM, TaskQueue, bindingMode } from 'aurelia-framework';
import { UxInputElement } from '@aurelia-ux/input';
import { UxComponent, UxTheme } from '@aurelia-ux/core';
import { DiscardablePromise, discard } from './discardable-promise';

const UP = 38;
const DOWN = 40;
const ENTER = 13;

@inject(Element, TaskQueue)
@customElement('ux-lookup')
@useView(PLATFORM.moduleName('./ux-lookup.html'))
export class UxLookup implements UxComponent, EventListenerObject {
  constructor(private element: HTMLElement, private taskQueue: TaskQueue) { }

  static SELECTED_EVENT = 'selected';

  theme: UxTheme;

  private inputElement: UxInputElement | undefined | null;
  public anchor: { x: number, y: number, maxHeight: number, width: number } | null;
  public isOpen: boolean = false;
  public optionsArray: unknown[];
  public focusedOption: unknown = undefined;

  @bindable
  displayField: ((option: unknown) => string) | string | undefined;
  displayFieldChanged() {
    if (this.displayField instanceof Function) {
      this.getDisplay = this.displayField;
    } else if (typeof this.displayField === 'string') {
      this.getDisplay = option => (option as any)[this.displayField as string];
    } else {
      this.getDisplay = option => (option as any).toString();
    }
  }

  getDisplay: (option: unknown) => string = option => (option as any).toString();

  @bindable
  valueField: ((option: unknown) => unknown) | string | undefined;
  valueFieldChanged() {
    if (this.valueField instanceof Function) {
      this.getValue = this.valueField;
    } else if (typeof this.valueField === 'string') {
      this.getValue = option => (option as any)[this.valueField as string];
    } else {
      this.getValue = option => option;
    }
  }

  getValue: (option: unknown) => unknown = option => option;

  @bindable
  options: ((filter: string, value: unknown) => Promise<unknown[]>) | unknown[] | undefined;
  optionsChanged() {
    console.log(this.options);

    if (this.options instanceof Function) {
      this.getOptions = this.options;
    } else {
      this.getOptions = this.getOptionsDefault;
    }
  }

  getOptions: (filter: string | undefined, value: unknown) => Promise<unknown[]>;

  getOptionsDefault(filter: string, value: unknown): Promise<unknown[]> {
    const options = this.options as unknown[];
    if (value) {
      return Promise.resolve([options.find(x => this.getValue(x) === value)]);
    } else {
      return Promise.resolve(options.filter(x => this.getDisplay(x).toUpperCase().includes(filter.toUpperCase())));
    }
  }

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  value: unknown;
  suppressValueChanged: boolean;
  async valueChanged() {
    if (this.suppressValueChanged) {
      this.suppressValueChanged = false;
      return;
    }
    await this.updateFilterBasedOnValue();
  }
  setValue(value: unknown) {
    if (this.value === value) {
      return;
    }
    this.suppressValueChanged = true;
    this.value = value;
  }

  bind() {
    this.valueFieldChanged();
    this.displayFieldChanged();
    this.optionsChanged();
  }

  attached() {
    this.inputElement = this.element.parentElement?.querySelector<UxInputElement>('ux-input');
    if (this.inputElement) {
      ['click', 'blur', 'change', 'keydown'].map(x => this.inputElement!.addEventListener(x, this));
    }
    ['blur', 'keydown'].map(x => this.element.addEventListener(x, this));
    this.valueChanged();
  }

  detached() {
    if (this.inputElement) {
      ['click', 'blur', 'change', 'keydown'].map(x => this.inputElement!.removeEventListener(x, this));
    }
    ['blur', 'keydown'].map(x => this.element.removeEventListener(x, this));
  }

  async open() {
    if (this.isOpen) {
      return;
    }
    if (this.inputElement) {
      const inputRect = this.inputElement.getBoundingClientRect();
      this.anchor = {
        x: inputRect.left,
        y: inputRect.top + inputRect.height + 3,
        maxHeight: window.innerHeight - inputRect.top - inputRect.height + document.body.scrollTop - 5,
        width: inputRect.width
      };
      window.addEventListener('wheel', this);
    }
    this.taskQueue.queueTask(() => this.isOpen = true);
  }

  close() {
    this.isOpen = false;
    this.focusedOption = undefined;
    window.removeEventListener('wheel', this);
  }

  handleEvent(evt: Event): void {
    if (evt.currentTarget === this.inputElement) {
      switch (evt.type) {
        case 'click': this.open(); break;
        case 'blur': this.onInputBlur(); break;
        case 'change': this.filterChanged(); break;
        case 'keydown': this.onInputKeydown(evt as KeyboardEvent); break;
      }
    } else if (evt.currentTarget === window) {
      switch (evt.type) {
        case 'wheel': this.onWindowWheel(evt); break;
      }
    } else if (evt.currentTarget === this.element) {
      switch (evt.type) {
        case 'blur': this.onBlur(); break;
        case 'keydown': this.onKeydown(evt as KeyboardEvent); break;
      }
    }
  }

  searchPromise: DiscardablePromise<unknown[]>;
  suppressFilterChanged: boolean;
  async filterChanged() {
    if (this.suppressFilterChanged) {
      this.suppressFilterChanged = false;
      return;
    }
    this.setValue(undefined);
    discard(this.searchPromise);
    try {
      this.searchPromise = new DiscardablePromise(this.getOptions(this.inputElement?.value, undefined));
      this.optionsArray = await this.searchPromise;
    }
    catch (e) {
      if (e !== DiscardablePromise.discarded) {
        //TODO: indicate an error
        // this.options = [MdLookup.error, e.message];
      }
    }
  }

  setFilter(filter: string | undefined) {
    if (!this.inputElement || this.inputElement.value === filter) {
      return;
    }
    this.suppressFilterChanged = true;
    this.inputElement.value = filter;
  }

  async updateFilterBasedOnValue() {
    if (this.value) {
      this.optionsArray = await this.getOptions(undefined, this.value);
    }
    else {
      this.optionsArray = [];
    }
    if (this.optionsArray && this.optionsArray.length) {
      this.setFilter(this.getDisplay(this.optionsArray[0]));
    } else {
      this.setFilter(undefined);
    }
  }

  select(option: unknown) {
    this.value = this.getValue(option);
    this.close();
    this.element.dispatchEvent(new CustomEvent(UxLookup.SELECTED_EVENT, { detail: { value: this.value } }));
  }

  onBlur() {
    this.close();
  }

  onInputKeydown(evt: KeyboardEvent) {
    switch (evt.which) {
      case DOWN:
        this.element.focus();
        this.focusedOption = this.optionsArray[0];
        evt.preventDefault();
        break;
    }
  }

  onInputBlur() {
    if (document.activeElement !== this.element) {
      this.close();
    }
  }

  onWindowWheel(evt: Event) {
    if (this.isOpen) {
      if (evt.target === PLATFORM.global || !this.element.contains(evt.target as HTMLElement)) {
        this.close();
      }
    }
  }

  onKeydown(evt: KeyboardEvent) {
    let i: number;
    switch (evt.which) {
      case DOWN:
        i = this.optionsArray.indexOf(this.focusedOption);
        this.focusedOption = this.optionsArray[i !== this.optionsArray.length - 1 ? i + 1 : 0];
        this.taskQueue.queueTask(() => this.element.querySelector('.ux-lookup__option--focused')?.scrollIntoView());
        break;
      case UP:
        i = this.optionsArray.indexOf(this.focusedOption);
        this.focusedOption = this.optionsArray[i !== 0 ? i - 1 : this.optionsArray.length - 1];
        this.taskQueue.queueTask(() => this.element.querySelector('.ux-lookup__option--focused')?.scrollIntoView());
        break;
      case ENTER:
        this.select(this.focusedOption);
        this.close();
        break;
    }
    evt.preventDefault();
  }
}
