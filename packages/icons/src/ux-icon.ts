import { customElement, bindable, processAttributes } from 'aurelia-templating';
import { Logger } from 'aurelia-logging';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, processDesignAttributes } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
import { UxIconMap } from './ux-icon-map';

@inject(Element, UxIconMap, StyleEngine, Logger)
@customElement('ux-icon')
@processAttributes(processDesignAttributes)
export class UxIcon implements UxComponent {
  @bindable public size: string;
  @bindable public theme: UxIconTheme;
  
  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public icon: any = undefined;

  constructor(
    private element: HTMLElement,
    private iconMap: UxIconMap,
    private styleEngine: StyleEngine,
    private logger: Logger
  )  { }

  public bind() {
    if (this.icon) {
      this.changeIcon(this.icon);
    }
    this.sizeChanged(this.size);
    this.themeChanged(this.theme);
  }

  public sizeChanged(newValue: string) {
    if (this.size) {
      if (this.theme === undefined) {
        this.theme = new UxIconTheme();
      }
      this.theme.size = newValue;
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public iconChanged(newValue: any) {
    this.changeIcon(newValue);
  }

  private changeIcon(icon: string) {
    const material = this.iconMap.get(icon);

    if (material) {
      this.element.innerHTML = material;
    } else {
      this.logger.warn('ux-icon: no matching icon found', this.element);
    }
  }
}
