import {ViewResources, View} from 'aurelia-templating';

export interface Themable {
  resources: ViewResources;
  view: View;
}

export class StyleEngine {
  public applyTheme(themable: Themable, theme: any) {
    let instance: any;

    if (typeof theme === 'string') {
      instance = themable.resources.getValue(theme);
      console.log(themable, theme, instance);
    }
  }
}
