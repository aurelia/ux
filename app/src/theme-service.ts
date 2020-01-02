import { StyleEngine, UxTheme } from '@aurelia-ux/core';
import * as themes from './themes.json';
import { inject, observable } from 'aurelia-framework';
import { UxInputTheme } from '@aurelia-ux/input';
import { UxButtonTheme } from '@aurelia-ux/button';

export interface ThemesSet {
  name: string;
  themes: UxTheme[];
}

@inject(StyleEngine)
export class ThemeService {

  public themesSets: Array<ThemesSet>;
  public currentTheme: 'none' | 'aurelia' | 'dark' | number;

  public button: UxButtonTheme = {themeKey: 'button'};
  public input: UxInputTheme = {themeKey: 'input'};
  @observable({changeHandler: 'buttonVariableChanged'}) public buttonBorderRadius: number = 2;
  @observable({changeHandler: 'buttonVariableChanged'}) public buttonBorderWidth: number = 1;
  @observable({changeHandler: 'inputVariableChanged'}) public inputBorderRadius: number = 2;
  @observable({changeHandler: 'inputVariableChanged'}) public inputBorderWidth: number = 1;
  @observable({changeHandler: 'inputVariableChanged'}) public inputBorderActiveWidth: number = 2;


  constructor(private styleEngine: StyleEngine) {}

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
    let currentTheme: string | number = localStorage.getItem('currentTheme') || 'aurelia';
    if (currentTheme !== 'none' && currentTheme !== 'aurelia' && currentTheme !== 'dark') {
      currentTheme = parseInt(currentTheme, 10);
    }
    this.apply(currentTheme);
  }

  public newThemeSet() {
    const name = `New theme ${this.themesSets.length + 1}`;
    this.themesSets.push({
      name,
      themes: this.aurelia
    });
    localStorage.setItem('themes', JSON.stringify(this.themesSets));
  }

  get none() {
    return themes.none;
  }

  get aurelia() {
    return themes.aurelia;
  }

  get dark() {
    return themes.dark;
  }

  public apply(theme: 'none' | 'aurelia' | 'dark' | number, setAureliaIfNotFound: boolean = false) {
    let themeToApply: UxTheme[] | null = null;
    if (theme === 'none') {
      themeToApply = this.none;
    } else if (theme === 'aurelia') {
      themeToApply = this.aurelia;
    } else if (theme === 'dark') {
      themeToApply = this.dark;
    } else if (typeof theme === 'number' && this.themesSets[theme]) {
      themeToApply = this.themesSets[theme].themes;
    }
    if (themeToApply === null) {
      console.warn('Theme to apply not found');
      if (setAureliaIfNotFound) {
        theme = 'aurelia';
        themeToApply = this.aurelia;
      } else {
        return;
      }
    }
    this.currentTheme = theme;
    localStorage.setItem('currentTheme', this.currentTheme.toString());
    this.styleEngine.applyThemeGroup(themeToApply);
  }

  public resetComponentTheme(key: string) {
    let theme: any = (this as any)[key];
    theme = {...theme};
    Object.keys(theme).forEach(key => key !== 'key' ? delete theme[key] : '');
    (this as any)[key] = theme;

    if (key === 'buttonTheme') {
      this.buttonBorderRadius = 2;
      this.buttonBorderWidth = 1;
    }
  }

  public componentThemeChanged(key: string) {
    let theme: any = (this as any)[key];
    theme = {...theme};
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
}
