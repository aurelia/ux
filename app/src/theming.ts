import { UxInputTheme } from './../../packages/input/src/ux-input-theme';
import { AureliaUX } from './../../packages/core/src/aurelia-ux';
import { UxButtonTheme } from './../../packages/button/src/ux-button-theme';
import { inject, observable } from 'aurelia-framework';
import { Design } from '../../packages/core/src/designs/design';

@inject(AureliaUX)
export class Theming {

  public design: Design;
  @observable({changeHandler: 'buttonBorderChanged'}) public buttonBorderRadius: number = 2;
  @observable({changeHandler: 'buttonBorderChanged'}) public buttonBorderWidth: number = 1;
  @observable({changeHandler: 'inputBorderChanged'}) public inputBorderRadius: number = 2;
  @observable({changeHandler: 'inputBorderChanged'}) public inputBorderWidth: number = 1;
  @observable({changeHandler: 'inputBorderChanged'}) public inputBorderActiveWidth: number = 2;

  constructor(private ux: AureliaUX) {
    this.design = this.ux.design;
  }
  public buttonTheme: UxButtonTheme = {themeKey: 'button'};
  public inputTheme: UxInputTheme = {themeKey: 'input'};

  public themeChanged(key: string) {
    let theme: any = (this as any)[key];
    theme = {...theme};
    Object.keys(theme).forEach(key => !theme[key] ? delete theme[key] : '');
    (this as any)[key] = theme;
  }

  public resetTheme(key: string) {
    let theme: any = (this as any)[key];
    theme = {...theme};
    Object.keys(theme).forEach(key => key !== 'key' ? delete theme[key] : '');
    (this as any)[key] = theme;

    if (key === 'buttonTheme') {
      this.buttonBorderRadius = 2;
      this.buttonBorderWidth = 1;
    }
  }

  public buttonBorderChanged() {
    if (!this.buttonTheme) {
      return;
    }
    this.buttonTheme.borderRadius = `${this.buttonBorderRadius}px`;
    this.buttonTheme.borderWidth = `${this.buttonBorderWidth}px`;
    this.themeChanged('buttonTheme');
  }

  public inputBorderChanged() {
    if (!this.inputTheme) {
      return;
    }
    this.inputTheme.borderRadius = `${this.inputBorderRadius}px`;
    this.inputTheme.borderWidth = `${this.inputBorderWidth}px`;
    this.inputTheme.borderActiveWidth = `${this.inputBorderActiveWidth}px`;
    this.themeChanged('inputTheme');
  }


}
