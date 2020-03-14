import { UxTheme } from '@aurelia-ux/core';
import { bindable, inject, bindingMode, BindingEngine, Disposable } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
const log = getLogger('component-theming');

interface Prop {
  name: string;
  type: 'color' | 'slider' | 'text' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: Array<string>;
}

@inject(BindingEngine)
export class ComponentTheming {
  @bindable({defaultBindingMode: bindingMode.twoWay}) public theme: UxTheme;

  public props: Array<Prop> = [];

  private observers: Array<Disposable> = [];

  constructor(private bindingEngine: BindingEngine) {

  }

  public bind() {
    this.themeChanged();
  }

  public detached() {
    this.disposeObservers();
  }

  public themeChanged() {
    this.setProps();
    this.setObservers();
  }

  private timeout: any;
  private setObservers() {
    this.disposeObservers();
    for (const prop of this.props) {
      this.observers.push(this.bindingEngine.propertyObserver(this.theme, prop.name).subscribe(() => {
        // tried to use binding signaler
        // but could'nt make it work for some reason ?
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          const ThemeClass = this.theme.constructor as ObjectConstructor;
          const newTheme = new ThemeClass() as UxTheme;
          for (const prop of this.props) {
            (newTheme as any)[prop.name] = (this.theme as any)[prop.name];
          }
          this.disposeObservers();
          this.theme = newTheme;
          this.setObservers();
        }, 250);
      }));
    }
  }

  private disposeObservers() {
    for (const observer of this.observers) {
      observer.dispose();
    }
    this.observers = [];
  }

  private setProps() {
    if (this.theme === undefined || typeof this.theme !== 'object') {
      return;
    }
    // tslint:disable-next-line: max-line-length
    this.props = Object.getOwnPropertyNames(this.theme).filter(name => name !== 'themeKey' && name !== '__observers__').map((name) => {
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
