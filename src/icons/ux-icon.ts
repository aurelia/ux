import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { Logger } from 'aurelia-logging';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';
import { UxIconTheme } from './ux-icon-theme';
import IconMap from './ux-icon-map';

@inject(Element, ViewResources, StyleEngine, Logger)
@customElement('ux-icon')
@processAttributes(processDesignAttributes)

export class UxIcon implements Themable {
  @bindable public size: string;
  @bindable public theme: UxIconTheme;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public icon: any = undefined;

  public view: View;

  constructor(
    private element: HTMLElement,
    public resources: ViewResources,
    private styleEngine: StyleEngine,
    private logger: Logger
  ) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.size) {
      this.theme.size = this.size;
    }

    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.icon) {
      this.changeIcon(this.icon);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
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
