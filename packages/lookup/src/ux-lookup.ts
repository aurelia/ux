import { customElement, useView, bindable, inject, PLATFORM, TaskQueue, bindingMode } from 'aurelia-framework';
import { UxInputElement } from '@aurelia-ux/input';
import { UxComponent, StyleEngine, normalizeNumberAttribute, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { DiscardablePromise } from './discardable-promise';
import { UxDefaultLookupConfiguration } from './ux-lookup-configuration';
import { UxLookupTheme } from './ux-lookup-theme';

const UP = 38;
const DOWN = 40;
const ENTER = 13;
const windowEvents = ['wheel', 'scroll', 'resize'];
const inputEvents = ['click', 'blur', 'change', 'keydown'];
const lookupEvents = ['blur', 'keydown'];

@inject(Element, TaskQueue, UxDefaultLookupConfiguration, StyleEngine)
@customElement('ux-lookup')
@useView(PLATFORM.moduleName('./ux-lookup.html'))
export class UxLookup implements UxComponent, EventListenerObject {
  constructor(private element: HTMLElement, private taskQueue: TaskQueue, public defaultConfiguration: UxDefaultLookupConfiguration,
    private styleEngine: StyleEngine) {
    if (this.defaultConfiguration.theme) {
      this.theme = this.defaultConfiguration.theme;
    }
  }

  static SELECTED_EVENT = 'selected';

  private inputElement: UxInputElement | HTMLInputElement | undefined | null;
  public anchor: { left: number, top: string | undefined, bottom: string | undefined, maxHeight: number, width: number } | null;
  public isOpen: boolean = false;
  public isWrapperOpen: boolean = false;
  public optionsArray: unknown[];
  public focusedOption: unknown = undefined;
  public searching: boolean = false;
  public errorMessage: string | undefined = undefined;
  public notFound: boolean = false;

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
    if (this.options instanceof Function) {
      this.getOptions = this.options;
    } else {
      this.getOptions = this.getOptionsDefault;
    }
  }

  getOptions: (filter: string | undefined, value: unknown) => Promise<unknown[]>;

  async getOptionsDefault(filter: string, value: unknown): Promise<unknown[]> {
    const options = this.options as unknown[];
    if (value) {
      return Promise.resolve([options.find(x => this.getValue(x) === value)]);
    } else {
      return Promise.resolve(options.filter(x => this.getDisplay(x).toUpperCase().includes((filter || '').toUpperCase())));
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
    this.element.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
  }
  setValue(value: unknown) {
    if (this.value === value) {
      return;
    }
    this.suppressValueChanged = true;
    this.value = value;
  }

  @bindable
  theme: UxLookupTheme;
  public themeChanged(newValue: any) {
    if (newValue && newValue.themeKey == null) {
      newValue.themeKey = 'lookup';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  debounceNumber: number | null | undefined = this.defaultConfiguration.debounce;
  @bindable
  debounce: number | string | undefined = this.defaultConfiguration.debounce;
  debounceChanged() {
    this.debounceNumber = normalizeNumberAttribute(this.debounce);
  }

  @bindable
  preloadOptions: boolean | string;

  bind() {
    this.themeChanged(this.theme);
    this.valueFieldChanged();
    this.displayFieldChanged();
    this.optionsChanged();
  }

  async attached() {
    this.inputElement = this.element.parentElement?.querySelector<UxInputElement | HTMLInputElement>('ux-input,input');
    if (this.inputElement) {
      inputEvents.forEach(x => this.inputElement!.addEventListener(x, this));
    }
    lookupEvents.forEach(x => this.element.addEventListener(x, this));
    this.valueChanged();
    if (!this.value && normalizeBooleanAttribute('preload-options', this.preloadOptions)) {
      try {
        await this.loadOptions();
      }
      catch{ }
    }
  }

  detached() {
    if (this.inputElement) {
      inputEvents.forEach(x => this.inputElement!.removeEventListener(x, this));
    }
    lookupEvents.forEach(x => this.element.removeEventListener(x, this));
  }

  async open() {
    if (this.isOpen) {
      return;
    }
    this.updateAnchor();
    windowEvents.forEach(x => window.addEventListener(x, this, true));
    this.isWrapperOpen = true;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
    const transitionDurationString = getComputedStyle(this.element).getPropertyValue('--aurelia-ux--lookup-transition-duration')
      || UxLookupTheme.DEFAULT_TRANSITION_DURATION;
    const transitionDuration = parseInt(transitionDurationString.replace('ms', ''));
    setTimeout(() => this.isWrapperOpen = false, transitionDuration);
    this.focusedOption = undefined;
    windowEvents.forEach(x => window.addEventListener(x, this, true));
  }

  updateAnchor() {
    if (!this.inputElement) {
      return;
    }
    const inputRect = this.inputElement.getBoundingClientRect();
    const style = getComputedStyle(this.element);
    const inputDistanceString = style.getPropertyValue('--aurelia-ux--lookup-input-distance');
    const inputDistance = parseInt(inputDistanceString ? inputDistanceString : UxLookupTheme.DEFAULT_INPUT_DISTANCE.toString());
    const windowEdgeDistanceString = style.getPropertyValue('--aurelia-ux--lookup-window-edge-distance');
    const windowEdgeDistance = parseInt(windowEdgeDistanceString ? windowEdgeDistanceString : UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE.toString());
    const bottomHeightThresholdString = style.getPropertyValue('--aurelia-ux--lookup-bottom-height-threshold');
    const bottomHeightThreshold = parseInt(bottomHeightThresholdString ? bottomHeightThresholdString : UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD.toString());
    let availableHeight = document.body.scrollTop + window.innerHeight - inputRect.bottom - inputDistance - windowEdgeDistance;
    if (availableHeight > bottomHeightThreshold) {
      this.anchor = {
        left: inputRect.left,
        top: `${inputRect.top + inputRect.height + inputDistance}px`,
        bottom: undefined,
        maxHeight: availableHeight,
        width: inputRect.width
      };
    } else {
      availableHeight = inputRect.top - document.body.scrollTop - inputDistance - windowEdgeDistance;
      this.anchor = {
        left: inputRect.left,
        top: undefined,
        bottom: `${window.innerHeight - availableHeight - windowEdgeDistance}px`,
        maxHeight: availableHeight,
        width: inputRect.width
      };
    }
  }

  handleEvent(evt: Event): void {
    switch (evt.currentTarget) {
      case this.inputElement:
        switch (evt.type) {
          case 'click': this.open(); break;
          case 'blur': this.onInputBlur(); break;
          case 'change': this.filterChanged(); break;
          case 'keydown': this.onInputKeydown(evt as KeyboardEvent); break;
        }
        break;
      case window:
        switch (evt.type) {
          case 'scroll':
          case 'wheel': this.onWindowWheel(evt); break;
          case 'resize': this.onWindowResize(); break;
        }
        break;
      case this.element:
        switch (evt.type) {
          case 'blur': this.onBlur(); break;
          case 'keydown': this.onKeydown(evt as KeyboardEvent); break;
        }
        break;
    }
  }

  debouncePromise: DiscardablePromise<void>;
  searchPromise: DiscardablePromise<unknown[]>;
  suppressFilterChanged: boolean;
  async filterChanged() {
    if (this.suppressFilterChanged) {
      this.suppressFilterChanged = false;
      return;
    }

    this.debouncePromise?.discard();
    this.debouncePromise = new DiscardablePromise(new Promise(r => setTimeout(() => r(), this.debounceNumber ?? 0)));
    try {
      await this.debouncePromise;
    }
    catch (e) {
      return;
    }
    this.setValue(undefined);
    this.searchPromise?.discard();
    if (!this.isOpen) {
      this.open();
    }
    this.searching = true;
    this.errorMessage = undefined;
    this.notFound = false;

    this.optionsArray = [];
    try {
      await this.loadOptions();
      this.updateAnchor();
    }
    catch (e) {
      if (e !== DiscardablePromise.discarded) {
        this.errorMessage = e.message;
      }
    }
    finally {
      this.searching = false;
    }
  }

  async loadOptions() {
    this.searchPromise = new DiscardablePromise(this.getOptions(this.inputElement?.value, undefined));
    this.optionsArray = await this.searchPromise;
    this.notFound = !this.optionsArray?.length;
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

  onWindowResize() {
    if (this.isOpen) {
      this.updateAnchor();
    }
  }
}
