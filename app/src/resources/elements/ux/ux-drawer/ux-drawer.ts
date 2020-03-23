import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxDrawerTheme } from './ux-drawer-theme';

@inject(Element, StyleEngine)
@customElement('ux-drawer')
export class UxDrawer implements UxComponent {
  @bindable public showBackdrop: boolean = true;
  @bindable public dismissable: boolean = true;
  @bindable public theme: UxDrawerTheme;
  @bindable public position: string | null;
  @bindable public type: string | null;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }

    this.positionChanged(this.position);
  }

  public close() {
    if (this.dismissable) {
      this.element.classList.remove('open');
    }
  }

  public toggle() {
    if (this.element.classList.contains('open')) {
      this.element.classList.remove('open');
    } else {
      this.element.classList.add('open');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public positionChanged(newValue: any) {
    if (this.type !== 'temporary') {
      return;
    }

    this.element.classList.remove('right', 'left');

    if (newValue === 'right') {
      this.element.classList.add('right');
    } else {
      this.element.classList.add('left');
    }
  }
}
