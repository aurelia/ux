import { customElement, bindable, ElementEvents } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSliderTheme } from './ux-slider-theme';
import { computedFrom, bindingMode } from 'aurelia-binding';

export interface UxSliderElement extends HTMLElement {
  value: number;
}

export interface MouseOrTouchEvent extends MouseEvent {
  touches?: Array<{clientX: number}>;
}

@inject(Element, StyleEngine)
@customElement('ux-slider')
export class UxSlider implements UxComponent {
  private isActive: boolean;
  private percentValue: number;

  @bindable public theme: UxSliderTheme;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public disabled: boolean;
  @bindable public step: number;

  constructor(
    public element: UxSliderElement,
    private styleEngine: StyleEngine) {
      Object.setPrototypeOf(element, uxSliderElementProto);
    }

  @computedFrom('percentValue')
  get sliderBeforeWidth(): number {
    return this.percentValue * 100;
  }

  @computedFrom('percentValue')
  get sliderAfterWidth(): number {
    return (1 - this.percentValue) * 100;
  }

  public bind() {
    this.themeChanged(this.theme);

    this.minChanged();
    this.maxChanged();
    this.valueChanged();
    this.stepChanged();
  }

  public stepChanged() {
    if (this.step === undefined || this.step === null) {
      this.step = 1;
      return;
    }

    this.step = Number(this.step);
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'slider';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public minChanged() {
    if (this.min === undefined || this.min === null) {
      this.min = 0;
      return;
    }

    this.min = Number(this.min);
  }

  public maxChanged() {
    if (this.max === undefined || this.max === null) {
      this.max = 100;
      return;
    }

    this.max = Number(this.max);
  }

  public valueChanged() {
    if (this.value === undefined || this.value === null) {
      this.value = this.min;
      this.percentValue = 0;
      return;
    }

    const percentValue = (this.value - this.min) / (this.max - this.min);

    this.percentValue = percentValue > 1
      ? 1
      : percentValue < 0
        ? 0
        : percentValue;
  }

  public updateValue(currentMouseX: number) {
    const rect = this.element.getBoundingClientRect();
    const normalizedMouseX = currentMouseX - rect.x;
    const percentValue = normalizedMouseX / rect.width;
    const rawValue = ((this.max - this.min) * percentValue) + this.min;
    const numSteps = Math.round((rawValue - this.min) / this.step);
    const steppedValue = this.min + (this.step * numSteps);

    this.value = this.boundValue(steppedValue);
  }

  public onTrackMouseDown(e: MouseOrTouchEvent) {
    if (this.disabled) {
      return;
    }

    this.isActive = true;
    const isMouseEvent = e instanceof MouseEvent;
    const isTouchEvent = Array.isArray(e.touches) && e.touches.length > 0;
    const winEvents = new ElementEvents(window as any);
    const upAction = (e: MouseOrTouchEvent) => {
      if (!this.isActive) {
        winEvents.disposeAll();
        return;
      }
      if (isMouseEvent) {
        this.updateValue((e as MouseEvent).clientX);
      }
      if (isTouchEvent) {
        const touches = e.touches as Array<{clientX: number}>;
        if (touches.length === 1) {
          this.updateValue(touches[0].clientX);
        }
      }
      this.isActive = false;
      winEvents.disposeAll();
    };
    const moveAction = (e: MouseOrTouchEvent) => {
      if (!this.isActive) {
        return;
      }
      this.updateValue(isMouseEvent ? e.clientX : (e.touches as Array<{clientX: number}>)[0].clientX);
    };
    winEvents.subscribe('blur', upAction, true);
    if (isMouseEvent) {
      winEvents.subscribe('mouseup', upAction, true);
      winEvents.subscribe('mousemove', moveAction, true);
    } else if (isTouchEvent) {
      winEvents.subscribe('touchend', upAction, true);
      winEvents.subscribe('touchmove', moveAction, true);
    }
  }

  public onKeyDown(e: KeyboardEvent) {
    const steppedValue = e.keyCode === 37 || e.keyCode === 40
      ? this.value - this.step
      : e.keyCode === 38 || e.keyCode === 39
        ? this.value + this.step
        : this.value;

    this.value = this.boundValue(steppedValue);

    return true;
  }

  public getValue() {
    return this.value;
  }

  public setValue(value: number) {
    this.value = value;
  }

  private boundValue(potentialValue: number) {
    return potentialValue > this.max
      ? this.max
      : potentialValue < this.min
        ? this.min
        : potentialValue;
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxSliderElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<UxSlider>(this).getValue();
    },
    set(value: number) {
      getVm<UxSlider>(this).setValue(value);
    }
  }
});
