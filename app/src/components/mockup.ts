import { bindable, computedFrom, inject } from 'aurelia-framework';

@inject(Element)
export class Mockup {
  @bindable public mode: 'light' | 'dark' | 'phone' = 'light';
  @bindable public type: 'browser' | 'phone' = 'browser';
  @bindable public displayModeSwitcher: boolean = true;
  @bindable public elevation: 0 | 2 | 4 | 8 | 16 | 32 = 2;
  @bindable public width: number | null = null;
  @bindable public height: number | null = null;
  @bindable public scale: number = 1;

  constructor(private element: HTMLElement) {

  }

  @computedFrom('type', 'width')
  get contentWidth(): string {
    if (this.width !== null) {
      return `${this.width}px`;
    }
    if (this.type === 'browser') {
      return 'auto';
    }
    return '375px';
  }

  @computedFrom('type', 'height')
  get contentHeight(): string {
    if (this.height !== null) {
      return `${this.height}px`;
    }
    if (this.type === 'browser') {
      return '500px';
    }
    return '750px';
  }

  @computedFrom('type', 'scale')
  get theScale(): number {
    if (this.scale !== null) {
      return this.scale;
    }
    if (this.type === 'browser') {
      return 1;
    }
    return 0.5;
  }

  @computedFrom('theScale', 'element.offsetHeight')
  get vMargin(): number {
    const vDiff = this.element.offsetHeight * (1 - this.theScale);
    return vDiff * -0.5;
  }

  @computedFrom('theScale', 'element.offsetWidth')
  get hMargin(): number {
    const hDiff = this.element.offsetWidth * (1 - this.theScale);
    return hDiff * -0.5;
  }
}
