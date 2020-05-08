import { customElement, useView, inject, PLATFORM, bindable, DOM } from 'aurelia-framework';
import { UxProgressTheme } from './ux-progress-theme';
import { StyleEngine, normalizeNumberAttribute } from '@aurelia-ux/core';

const INDETERMINATE_ANIMATION_TEMPLATE = `
@keyframes ux-progress-stroke-rotate-DIAMETER {
   0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
   12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
   12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
   25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }
   25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
   37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
   37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
   50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }
   50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
   62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
   62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
   75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }
   75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
   87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
   87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
   100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
 }`;

@inject(Element, StyleEngine)
@customElement('ux-progress')
@useView(PLATFORM.moduleName('./ux-progress.html'))
export class UxProgress {
  constructor(public element: HTMLElement, private styleEngine: StyleEngine) { }

  public strokeDashOffset: number;
  public valueNumber: number | null | undefined;
  public viewBox: string;
  public animationTemplate: string;
  public strokeCircumference: number;

  @bindable
  public value: number | string;
  public valueChanged() {
    this.valueNumber = normalizeNumberAttribute(this.value);
    this.update();
  }

  @bindable
  public theme: UxProgressTheme;
  public themeChanged(newValue: UxProgressTheme) {
    if (newValue !== null && !newValue.themeKey) {
      newValue.themeKey = 'progress';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  private diameterNumber: number | null | undefined;
  @bindable
  public diameter: number | string = 100;
  public diameterChanged() {
    this.diameterNumber = normalizeNumberAttribute(this.diameter);
    this.update();
  }

  private strokeWidthNumber: number | null | undefined;
  @bindable
  public strokeWidth: number | string = 10;
  public strokeWidthChanged() {
    this.strokeWidthNumber = normalizeNumberAttribute(this.strokeWidth);
    this.update();
  }

  public bind() {
    this.valueNumber = normalizeNumberAttribute(this.value);
    this.diameterNumber = normalizeNumberAttribute(this.diameter);
    this.strokeWidthNumber = normalizeNumberAttribute(this.strokeWidth);
    this.update();
  }

  private update() {
    this.strokeCircumference = ((this.diameterNumber ?? 0) - (this.strokeWidthNumber ?? 0)) * 3.14;
    if (this.valueNumber === undefined || this.valueNumber === null) {
      this.strokeDashOffset = 0;
      const styleId = `ux-progress-animation-template-${this.diameter}-${this.strokeWidthNumber}`;
      let style = DOM.querySelector(`style[id='${styleId}']`);
      if (!style) {
        style = DOM.createElement('style');
        style.id = styleId;
        style.textContent = INDETERMINATE_ANIMATION_TEMPLATE
          .replace(/START_VALUE/g, `${0.95 * this.strokeCircumference}`)
          .replace(/END_VALUE/g, `${0.2 * this.strokeCircumference}`)
          .replace(/DIAMETER/g, `${this.diameter}`);
        DOM.appendNode(style, document.head);
      }
    } else {
      this.strokeDashOffset = this.strokeCircumference * (1 - this.valueNumber / 100);
      this.viewBox = `0 0 ${this.diameterNumber} ${this.diameterNumber}`;
    }
  }
}
