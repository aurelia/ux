import {customElement, bindable, ViewResources, View, processAttributes} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {StyleEngine} from '../styles/style-engine';
import {Themable} from '../styles/themable';
import {processDesignAttributes} from '../designs/design-attributes';

@inject(ViewResources, StyleEngine)
@customElement('ux-progress')
@processAttributes(processDesignAttributes)
export class UxProgress implements Themable {
  @bindable public type = null;
  @bindable public theme = null;
  @bindable public barWidth = {
      width: '60%',
  };

  public view: View;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) {}

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

}
