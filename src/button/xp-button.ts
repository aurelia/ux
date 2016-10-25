import {customElement, bindable, ViewResources, View} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {StyleEngine, Themable} from '../styles/style-engine';

@inject(ViewResources, StyleEngine)
@customElement('xp-button')
export class XpButton implements Themable {
  @bindable raised = null;
  @bindable disabled = false;
  @bindable theme = null;
  view: View;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) {}

  created(owningView: View, myView: View) {
    this.view = myView;
  }

  themeChanged(newValue) {
    this.styleEngine.applyTheme(this, newValue);
  }
}

export class StyleResolveValueConverter {
  toView(className, styleValue, elementValue) {
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
