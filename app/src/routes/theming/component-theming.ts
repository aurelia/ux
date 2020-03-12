import { UxTheme } from '@aurelia-ux/core';
import { bindable, inject, bindingMode } from 'aurelia-framework';
import { UxButtonTheme } from '@aurelia-ux/button';
import { UxInputTheme } from '@aurelia-ux/input';

interface Prop {
  name: string;
  type: 'color' | 'slider' | 'text' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: Array<string>;
}

export class ComponentTheming {
  @bindable public component: 'button' | 'input' = 'button';
  @bindable({defaultBindingMode: bindingMode.twoWay}) public theme: UxTheme;

  public props: Array<Prop> = [];

  constructor() {

  }

  public bind() {
    this.componentChanged();
  }

  public componentChanged() {
    switch (this.component) {
      case 'button':
        this.theme = new UxButtonTheme();
        break;
      case 'input':
        this.theme = new UxInputTheme();
        break;
    }
    this.setProps();
  }

  private setProps() {
    this.props = Object.getOwnPropertyNames(this.theme).filter(name => name !== 'themeKey').map((name) => {
      const prop: Prop = {
        name,
        type: 'text'
      };
      if (name.match(/color|foreground|background/i)) {
        prop.type = 'color';
      }
      if (name.match(/width|radius/i)) {
        prop.type = 'slider';
        prop.min = 0;
        prop.max = 10;
        prop.step = 0.5;
      }
      if (name.match(/fontWeight/i)) {
        prop.type = 'select';
        prop.options = ['100', '200', '300', '400', '500', '600', '700', '800'];
      }
      if (name.match(/fontSize/i)) {
        prop.type = 'slider';
        prop.min = 0;
        prop.max = 48;
        prop.step = 1;
      }
      if (name.match(/letterSpacing/i)) {
        prop.type = 'slider';
        prop.min = 0;
        prop.max = 5;
        prop.step = 0.1;
      }
      if (name.match(/lineHeight/i)) {
        prop.type = 'slider';
        prop.min = 0;
        prop.max = 2;
        prop.step = 0.1;
      }
      if (name.match(/textTransform/i)) {
        prop.type = 'select';
        prop.options = ['none', 'uppercase', 'lowercase', 'capitalize'];
      }
      return prop;
    });
  }
}
