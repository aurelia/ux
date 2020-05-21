import { UxCheckboxTheme } from '@aurelia-ux/checkbox';
import { UxRadioTheme } from '@aurelia-ux/radio';
import { UxSliderTheme } from '@aurelia-ux/slider';
import { UxDatepickerTheme } from '@aurelia-ux/datepicker';
import { UxTextAreaTheme } from '@aurelia-ux/textarea';
import { UxLookupTheme } from '@aurelia-ux/lookup';
import { StyleEngine, UxTheme } from '@aurelia-ux/core';
import * as themes from './themes.json';
import { inject, observable } from 'aurelia-framework';
import { UxInputTheme } from '@aurelia-ux/input';
import { UxChipInputTheme } from '@aurelia-ux/chip-input';
import { UxButtonTheme } from '@aurelia-ux/button';
import { UxSidenavTheme } from '@aurelia-ux/sidenav';

export interface ThemesSet {
  name: string;
  themes: UxTheme[];
}

@inject(StyleEngine)
export class ThemeService {

  public themesSets: Array<ThemesSet>;
  public currentTheme: 'none' | 'light' | 'dark' | number;

  public button: UxButtonTheme = { themeKey: 'button' };
  public input: UxInputTheme = { themeKey: 'input' };
  public textarea: UxTextAreaTheme = { themeKey: 'textarea' };
  public select: UxTextAreaTheme = { themeKey: 'select' };
  public checkbox: UxCheckboxTheme = { themeKey: 'checkbox' };
  public radio: UxRadioTheme = { themeKey: 'radio' };
  public datepicker: UxDatepickerTheme = { themeKey: 'datepicker' };
  public chipInput: UxChipInputTheme = { themeKey: 'chip-input' };
  public sidenav: UxSidenavTheme;
  public slider: UxSliderTheme = { themeKey: 'slider' };
  public lookup: UxLookupTheme;
  @observable({ changeHandler: 'buttonVariableChanged' }) public buttonBorderRadius: number = 2;
  @observable({ changeHandler: 'buttonVariableChanged' }) public buttonBorderWidth: number = 1;
  @observable({ changeHandler: 'inputVariableChanged' }) public inputBorderRadius: number = 2;
  @observable({ changeHandler: 'inputVariableChanged' }) public inputBorderWidth: number = 1;
  @observable({ changeHandler: 'inputVariableChanged' }) public inputBorderActiveWidth: number = 2;
  @observable({ changeHandler: 'textareaVariableChanged' }) public textareaBorderRadius: number = 2;
  @observable({ changeHandler: 'textareaVariableChanged' }) public textareaBorderWidth: number = 1;
  @observable({ changeHandler: 'textareaVariableChanged' }) public textareaBorderActiveWidth: number = 2;
  @observable({ changeHandler: 'selectVariableChanged' }) public selectBorderRadius: number = 2;
  @observable({ changeHandler: 'selectVariableChanged' }) public selectBorderWidth: number = 1;
  @observable({ changeHandler: 'selectVariableChanged' }) public selectBorderActiveWidth: number = 2;
  @observable({ changeHandler: 'datepickerVariableChanged' }) public datepickerBorderRadius: number = 2;
  @observable({ changeHandler: 'datepickerVariableChanged' }) public datepickerBorderWidth: number = 1;
  @observable({ changeHandler: 'datepickerVariableChanged' }) public datepickerBorderActiveWidth: number = 2;
  @observable({ changeHandler: 'chipInputVariableChanged' }) public chipInputBorderRadius: number = 2;
  @observable({ changeHandler: 'chipInputVariableChanged' }) public chipInputBorderWidth: number = 1;
  @observable({ changeHandler: 'chipInputVariableChanged' }) public chipInputBorderActiveWidth: number = 2;
  @observable({ changeHandler: 'sliderVariableChanged' }) public sliderThumbDiameter: number = 18;
  @observable({ changeHandler: 'sliderVariableChanged' }) public sliderTrackHeight: number = 4;
  @observable({ changeHandler: 'checkboxVariableChanged' }) public checkboxBorderWidth: number = 2;
  @observable({ changeHandler: 'radioVariableChanged' }) public radioBorderWidth: number = 2;

  constructor(private styleEngine: StyleEngine) { }

  public init() {
    let storageThemes: Array<any> = [];
    try {
      const storageValue = localStorage.getItem('themes');
      if (!storageValue) {
        throw new Error('No storageThemes');
      }
      storageThemes = JSON.parse(storageValue);
      if (!Array.isArray(storageThemes)) {
        throw new Error('Invalid storageThemes');
      }
    } catch (e) {
      storageThemes = [];
      localStorage.setItem('themes', JSON.stringify(storageThemes));
    }
    this.themesSets = storageThemes;
    let currentTheme: string | number = localStorage.getItem('currentTheme') || 'light';
    if (currentTheme !== 'none' && currentTheme !== 'light' && currentTheme !== 'dark') {
      currentTheme = parseInt(currentTheme, 10);
    }
    this.apply(currentTheme);
  }

  public newThemeSet() {
    const name = `New theme ${this.themesSets.length + 1}`;
    this.themesSets.push({
      name,
      themes: [...this.light, this.sidenav, this.lookup]
    });
    localStorage.setItem('themes', JSON.stringify(this.themesSets));
  }

  public saveThemesSet() {
    localStorage.setItem('themes', JSON.stringify(this.themesSets));
  }

  get none() {
    return themes.none;
  }

  get light() {
    return themes.light;
  }

  get dark() {
    return themes.dark;
  }

  public apply(theme: 'none' | 'light' | 'dark' | number, setLightIfNotFound: boolean = false) {
    let themeToApply: UxTheme[] | null = null;
    if (theme === 'none') {
      themeToApply = this.none;
    } else if (theme === 'light') {
      themeToApply = this.light;
    } else if (theme === 'dark') {
      themeToApply = this.dark;
    } else if (typeof theme === 'number' && this.themesSets[theme]) {
      themeToApply = this.themesSets[theme].themes;
    }
    if (themeToApply === null) {
      // tslint:disable-next-line: no-console
      console.warn('Theme to apply not found');
      if (setLightIfNotFound) {
        theme = 'light';
        themeToApply = this.light;
      } else {
        return;
      }
    }
    this.currentTheme = theme;
    localStorage.setItem('currentTheme', this.currentTheme.toString());
    this.lookup = { ...new UxLookupTheme(), ...themeToApply.find(x => x.themeKey === 'lookup') };
    this.sidenav = {...new UxSidenavTheme(), ...themeToApply.find(x => x.themeKey === 'sidenav') as UxSidenavTheme};    
    themeToApply.push(this.sidenav, this.lookup);
    this.styleEngine.applyThemeGroup(themeToApply);
  }

  public resetComponentTheme(key: string) {
    let theme: any = (this as any)[key];
    theme = { ...theme };
    Object.keys(theme).forEach(key => key !== 'key' ? delete theme[key] : '');
    (this as any)[key] = theme;

    if (key === 'buttonTheme') {
      this.buttonBorderRadius = 2;
      this.buttonBorderWidth = 1;
    }
  }

  public componentThemeChanged(key: string) {
    let theme: any = (this as any)[key];
    theme = { ...theme };
    Object.keys(theme).forEach(key => !theme[key] ? delete theme[key] : '');
    (this as any)[key] = theme;
    this.styleEngine.applyTheme(theme);
  }

  public buttonVariableChanged() {
    if (!this.button) {
      return;
    }
    this.button.borderRadius = `${this.buttonBorderRadius}px`;
    this.button.borderWidth = `${this.buttonBorderWidth}px`;
    this.componentThemeChanged('button');
  }

  public inputVariableChanged() {
    if (!this.input) {
      return;
    }
    this.input.borderRadius = `${this.inputBorderRadius}px`;
    this.input.borderWidth = `${this.inputBorderWidth}px`;
    this.input.borderActiveWidth = `${this.inputBorderActiveWidth}px`;
    this.componentThemeChanged('input');
  }

  public chipInputVariableChanged() {
    if (!this.chipInput) {
      return;
    }
    this.chipInput.borderRadius = `${this.chipInputBorderRadius}px`;
    this.chipInput.borderWidth = `${this.chipInputBorderWidth}px`;
    this.chipInput.borderActiveWidth = `${this.chipInputBorderActiveWidth}px`;
    this.componentThemeChanged('chip-input');
  }

  public textareaVariableChanged() {
    if (!this.textarea) {
      return;
    }
    this.textarea.borderRadius = `${this.textareaBorderRadius}px`;
    this.textarea.borderWidth = `${this.textareaBorderWidth}px`;
    this.textarea.borderActiveWidth = `${this.textareaBorderActiveWidth}px`;
    this.componentThemeChanged('textarea');
  }

  public selectVariableChanged() {
    if (!this.select) {
      return;
    }
    this.select.borderRadius = `${this.selectBorderRadius}px`;
    this.select.borderWidth = `${this.selectBorderWidth}px`;
    this.select.borderActiveWidth = `${this.selectBorderActiveWidth}px`;
    this.componentThemeChanged('select');
  }

  public datepickerVariableChanged() {
    if (!this.datepicker) {
      return;
    }
    this.datepicker.borderRadius = `${this.datepickerBorderRadius}px`;
    this.datepicker.borderWidth = `${this.datepickerBorderWidth}px`;
    this.datepicker.borderActiveWidth = `${this.datepickerBorderActiveWidth}px`;
    this.componentThemeChanged('datepicker');
  }

  public sliderVariableChanged() {
    if (!this.slider) {
      return;
    }
    this.slider.thumbDiameter = `${this.sliderThumbDiameter}px`;
    this.slider.trackHeight = `${this.sliderTrackHeight}px`;
    this.componentThemeChanged('slider');
  }

  public checkboxVariableChanged() {
    if (!this.checkbox) {
      return;
    }
    this.checkbox.borderWidth = `${this.checkboxBorderWidth}px`;
    this.componentThemeChanged('checkbox');
  }

  public radioVariableChanged() {
    if (!this.radio) {
      return;
    }
    this.radio.borderWidth = `${this.radioBorderWidth}px`;
    this.componentThemeChanged('radio');
  }
}
