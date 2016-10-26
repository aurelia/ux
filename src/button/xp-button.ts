import {customElement, bindable, ViewResources, View} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {StyleEngine, Themable} from '../styles/style-engine';

@inject(ViewResources, StyleEngine)
@customElement('xp-button')
export class XpButton implements Themable {
  @bindable public raised = null;
  @bindable public disabled = false;
  @bindable public theme = null;
  view: View;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) {}

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }
}

export class StyleResolveValueConverter {
  public toView(className: string, styleValue: boolean, elementValue: string) {
    if (elementValue === null) {
      return styleValue ? className : '';
    }

    if (typeof elementValue === 'string') {
      if (elementValue === 'true') {
        return className;
      }

      return '';
    }

    return elementValue ? className : '';
  }
}
