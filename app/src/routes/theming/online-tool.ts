import { UxTextAreaTheme } from './../../../../packages/textarea/src/ux-textarea-theme';
import { UxSelectTheme } from './../../../../packages/select/src/ux-select-theme';
import { UxDatepickerTheme } from './../../../../packages/datepicker/src/ux-datepicker-theme';
import { UxChipInputTheme } from './../../../../packages/chip-input/src/ux-chip-input-theme';
import { UxSliderTheme } from './../../../../packages/slider/src/ux-slider-theme';
import { UxCheckboxTheme } from './../../../../packages/checkbox/src/ux-checkbox-theme';
import { UxRadioTheme } from './../../../../packages/radio/src/ux-radio-theme';
import { UxTheme } from './../../../../packages/core/src/styles/ux-theme';
import { ThemeService, ThemesSet } from '../../theme-service';
import { inject } from 'aurelia-framework';
import { AureliaUX, Design } from '@aurelia-ux/core';
import { UxButtonTheme } from './../../../../packages/button/src/ux-button-theme';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
const log = getLogger('online-tool');

import { AureliaUXFormRenderer } from '../../forms-form-renderer';

@inject(ThemeService, AureliaUX, ValidationControllerFactory)
export class OnlineTool {

  public preview: HTMLElement;

  public design: Design;

  public interests: Array<string> = ['technology'];
  public ageGroup: string = '21-30';
  public volume = 85;

  private components = ['button', 'input', 'textarea', 'select', 'datepicker', 'chip-input', 'slider', 'checkbox', 'radio'];
  private themes: {
    [key: string]: UxTheme;
  } = {};
  public selectedComponent?: string;

  public controller: ValidationController;

  public autoComputePrimaryAccent: boolean = true;
  public autoComputeAppSurface: boolean = true;
  public autoComputeControlState: boolean = true;

  // tslint:disable-next-line: max-line-length
  constructor(private themeService: ThemeService, private ux: AureliaUX, public controllerFactory: ValidationControllerFactory) {
    this.design = this.ux.design;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new AureliaUXFormRenderer());
    this.setThemes();
  }

  private setThemes() {
    for (const component of this.components) {
      switch (component) {
        case 'button': this.themes[component] = new UxButtonTheme(); break;
        case 'input': this.themes[component] = new UxChipInputTheme(); break;
        case 'textarea': this.themes[component] = new UxTextAreaTheme(); break;
        case 'select': this.themes[component] = new UxSelectTheme(); break;
        case 'datepicker': this.themes[component] = new UxDatepickerTheme(); break;
        case 'chip-input': this.themes[component] = new UxChipInputTheme(); break;
        case 'slider': this.themes[component] = new UxSliderTheme(); break;
        case 'checkbox': this.themes[component] = new UxCheckboxTheme(); break;
        case 'radio': this.themes[component] = new UxRadioTheme(); break;
      }
    }
  }

  public selectComponent(component: string) {
    this.selectedComponent = component;
  }

  public json(theme: UxTheme) {
    return JSON
      .stringify(theme, null, 2)
      .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')
      .replace(/\s/g, '&nbsp;');
  }

}
