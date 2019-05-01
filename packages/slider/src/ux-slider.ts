import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSliderTheme } from './ux-slider-theme';
import { computedFrom, bindingMode } from 'aurelia-binding';

@inject(Element, StyleEngine)
@customElement('ux-slider')
export class UxSlider implements UxComponent {
  private isActive: boolean;
  private percentValue: number;
  private onMouseMove: (e: MouseEvent) => void = (e) => this.updateValue(e.clientX);
  private onMouseUp: (e: MouseEvent) => void = this.handleMouseUp.bind(this);

  @bindable public theme: UxSliderTheme;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: number;
  @bindable public min: number;
  @bindable public max: number;
  @bindable public disabled: boolean;
  @bindable public step: number;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) { }

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
    this.disabledChanged();
    this.stepChanged();
  }

  public detached() {
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  public disabledChanged() {
    if (this.disabled) {
      window.removeEventListener('mouseup', this.onMouseUp);
    } else {
      window.addEventListener('mouseup', this.onMouseUp);
    }
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
    const normalizedMouseX = currentMouseX - this.element.offsetLeft;
    const percentValue = normalizedMouseX / this.element.clientWidth;
    const rawValue = ((this.max - this.min) * percentValue) + this.min;
    const numSteps = Math.round((rawValue - this.min) / this.step);
    const steppedValue = this.min + (this.step * numSteps);

    this.value = this.boundValue(steppedValue);
  }

  public onTrackMouseDown() {
    if (this.disabled) {
      return;
    }

    this.isActive = true;

    window.addEventListener('mousemove', this.onMouseMove);
  }

  public onKeyDown(e: KeyboardEvent) {
    var steppedValue = e.keyCode === 37 || e.keyCode === 40
      ? this.value - this.step
      : e.keyCode === 38 || e.keyCode === 39
        ? this.value + this.step
        : this.value;

    this.value = this.boundValue(steppedValue);

    return true;
  }

  private handleMouseUp(e: MouseEvent) {
    if (!this.isActive) {
      return;
    }

    this.updateValue(e.clientX);
    window.removeEventListener('mousemove', this.onMouseMove);
    this.isActive = false;
  }

  private boundValue(potentialValue: number) {
    return potentialValue > this.max
      ? this.max
      : potentialValue < this.min
        ? this.min
        : potentialValue;
  }
}
