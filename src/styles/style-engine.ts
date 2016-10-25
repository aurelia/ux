import {ViewResources, View} from 'aurelia-templating';

export interface Themable {
  resources: ViewResources;
  view: View;
}

export class StyleEngine {
  applyTheme(themable: Themable, theme) {
    let instance;
    
    if (typeof theme === 'string') {
      instance = themable.resources.getValue(theme);
      console.log(themable, theme, instance);
    }
  }
}
