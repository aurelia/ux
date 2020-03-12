import { bindable, computedFrom, inject, BindingEngine, Disposable } from 'aurelia-framework';
import { AureliaUX, Design } from '@aurelia-ux/core';
import { UxInputTheme } from '@aurelia-ux/input';
import { Color } from '../../color';
import { getLogger } from 'aurelia-logging';
const log = getLogger('pa-color');

const white = new Color({r: 255, g: 255, b: 255});
const black = new Color({r: 0, g: 0, b: 0});

type Types = 'primary' | 'accent' | 'app' | 'surface' | 'control' | 'disabled' | 'error';
type ColorNames = 'primary' | 'accent' | 'appBackground' | 'surfaceBackground' |
                  'controlBackground' | 'disabledBackground' | 'error';

@inject(AureliaUX, BindingEngine)
export class PaColor {
  @bindable public type: Types = 'primary';
  @bindable public autoCompute: boolean = true;
  public extend: boolean = false;

  private colorName: ColorNames;

  private design: Design;
  public inputTheme: UxInputTheme = {
    themeKey: 'input',
    background: 'transparent',
    foreground: 'var(--main-foreground)',
    foregroundLabel: 'var(--main-foreground)',
    backgroundHover: 'rgba(0, 0, 0, 0.1)',
    activeColor: 'var(--main-foreground)',
    labelFontSize: '10px',
    disabledBackground: 'transparent',
    disabledForeground: 'var(--main-foreground)'
  };

  private observers: Array<Disposable> = [];

  constructor(private ux: AureliaUX, private bindingEngine: BindingEngine) {
    this.design = ux.design;
  }

  public bind() {
    this.typeChanged();
    this.computeValues(this.type);
  }

  public typeChanged() {
    this.disposeObservers();
    this.setColorName();
    this.setObservers();
  }

  private setColorName() {
    let colorName: ColorNames = 'primary';
    if (this.type === 'primary' || this.type === 'accent' || this.type === 'error') {
      colorName = this.type;
    } else if (this.type === 'app') {
      colorName = 'appBackground';
    } else if (this.type === 'surface') {
      colorName = 'surfaceBackground';
    } else if (this.type === 'control') {
      colorName = 'controlBackground';
    } else if (this.type === 'disabled') {
      colorName = 'disabledBackground';
    }
    this.colorName = colorName;
  }

  public detached() {
    this.disposeObservers();
  }

  private setObservers() {
    this.observers.push(this.bindingEngine.propertyObserver(this.design, this.colorName).subscribe(() => {
      if (this.autoCompute) {
        this.computeValues(this.type);
      }
    }));
    this.observers.push(this.bindingEngine.propertyObserver(this, 'autoCompute').subscribe(() => {
      if (this.autoCompute) {
        this.computeValues(this.type);
      }
    }));
  }

  private disposeObservers() {
    for (const sub of this.observers) {
      sub.dispose();
    }
    this.observers = [];
  }

  private computeValues(type: Types) {
    let color: Color;
    try {
      color = new Color(this.design[this.colorName]);
    } catch (e) {
      color = white.clone();
    }

    const diffWithWhite = color.difference(white);
    const diffWithBlack = color.difference(black);
    const foreground = diffWithWhite > diffWithBlack ? white : black;

    if (type === 'primary' || type === 'accent') {
      const light = color.clone().lighten();
      const dark = color.clone().darken();
      const lightDiffWithWhite = light.difference(white);
      const lightDiffWithBlack = light.difference(black);
      const darkDiffWithWhite = dark.difference(white);
      const darkDiffWithBlack = dark.difference(black);
      const lightForeground = lightDiffWithWhite > lightDiffWithBlack ? white : black;
      const darkForeground = darkDiffWithWhite > darkDiffWithBlack ? white : black;
      if (type === 'primary') {
        this.design.primaryForeground = foreground.hex();
        this.design.primaryLight = light.hex();
        this.design.primaryDark = dark.hex();
        this.design.primaryLightForeground = lightForeground.hex();
        this.design.primaryDarkForeground = darkForeground.hex();
      } else if (type === 'accent') {
        this.design.accentForeground = foreground.hex();
        this.design.accentLight = light.hex();
        this.design.accentDark = dark.hex();
        this.design.accentLightForeground = lightForeground.hex();
        this.design.accentDarkForeground = darkForeground.hex();
      }
    } else if (type === 'app') {
      this.design.appForeground = foreground.hex();
    } else if (type === 'surface') {
      this.design.surfaceForeground = foreground.hex();
    } else if (type === 'control') {
      this.design.controlForeground = foreground.hex();
      // tslint:disable-next-line: max-line-length
      this.design.controlLabelColor = diffWithWhite > diffWithBlack ? white.clone().darken(5).hex() : black.clone().lighten(5).hex();
    } else if (type === 'disabled') {
      this.design.disabledForeground = foreground.hex();
    }
  }

  @computedFrom('type')
  get main(): string {
    return this.type === 'primary' ? this.design.primary : this.design.accent;
  }

  @computedFrom('type')
  get mainForeground(): string {
    return this.type === 'primary' ? this.design.primaryForeground : this.design.accentForeground;
  }

  @computedFrom('type')
  get light(): string {
    return this.type === 'primary' ? this.design.primaryLight : this.design.accentLight;
  }

  @computedFrom('type')
  get lightForeground(): string {
    return this.type === 'primary' ? this.design.primaryLightForeground : this.design.accentLightForeground;
  }

  @computedFrom('type')
  get dark(): string {
    return this.type === 'primary' ? this.design.primaryDark : this.design.accentDark;
  }

  @computedFrom('type')
  get darkForeground(): string {
    return this.type === 'primary' ? this.design.primaryDarkForeground : this.design.accentDarkForeground;
  }
}
