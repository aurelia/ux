import { customElement, bindable, processAttributes } from 'aurelia-templating';
import { Logger } from 'aurelia-logging';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, processDesignAttributes } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
import IconMap from './ux-icon-map';

@inject(Element, StyleEngine, Logger)
@customElement('ux-icon')
@processAttributes(processDesignAttributes)

export class UxIcon implements UxComponent {
  @bindable public size: string;
  @bindable public theme: UxIconTheme;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public icon: any = undefined;

  constructor(
    private element: HTMLElement,
    private styleEngine: StyleEngine,
    private logger: Logger
  )  { }

  public bind() {
    if (this.size) {
      this.theme.size = this.size;
    }

    if (this.icon) {
      this.changeIcon(this.icon);
    }

    this.themeChanged(this.theme);
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public iconChanged(newValue: any) {
    this.changeIcon(newValue);
  }

  private changeIcon(icon: string) {
    const iconSet = IconMap.Map.find(set => set.name === icon);

    if (iconSet) {
      // todo: add logic to switch set being used based on design language
      // after adding icon sets for said languages such as ios
      this.element.innerHTML = iconSet.material;
    } else {
      this.logger.error('ux-icon: no matching icon found', this.element);
    }
  }
}
