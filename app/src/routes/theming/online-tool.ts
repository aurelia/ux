import { UxTextAreaTheme } from './../../../../packages/textarea/src/ux-textarea-theme';
import { UxSelectTheme } from './../../../../packages/select/src/ux-select-theme';
import { UxDatepickerTheme } from './../../../../packages/datepicker/src/ux-datepicker-theme';
import { UxChipInputTheme } from './../../../../packages/chip-input/src/ux-chip-input-theme';
import { UxSliderTheme } from './../../../../packages/slider/src/ux-slider-theme';
import { UxCheckboxTheme } from './../../../../packages/checkbox/src/ux-checkbox-theme';
import { UxRadioTheme } from './../../../../packages/radio/src/ux-radio-theme';
import { UxTheme } from './../../../../packages/core/src/styles/ux-theme';
import { ThemeService } from '../../theme-service';
import { inject } from 'aurelia-framework';
import { AureliaUX, Design } from '@aurelia-ux/core';
import { UxButtonTheme } from './../../../../packages/button/src/ux-button-theme';
import {
  ValidationControllerFactory,
  ValidationController
} from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
const log = getLogger('online-tool');

import { AureliaUXFormRenderer } from '../../forms-form-renderer';
import { UxInputTheme } from '@aurelia-ux/input';

@inject(ThemeService, AureliaUX, ValidationControllerFactory)
export class OnlineTool {

  public preview: HTMLElement;

  public design: Design;

  public interests: Array<string> = ['technology'];
  public ageGroup: string = '21-30';
  public volume = 85;

  private components = ['button', 'input', 'textarea', 'select', 'datepicker', 'chip-input', 'slider', 'checkbox', 'radio'];
  private themes = {
    'button': new UxButtonTheme(),
    'input': new UxInputTheme(),
    'textarea': new UxTextAreaTheme(),
    'select': new UxSelectTheme(),
    'datepicker': new UxDatepickerTheme(),
    'chip-input': new UxChipInputTheme(),
    'slider': new UxSliderTheme(),
    'checkbox': new UxCheckboxTheme(),
    'radio': new UxRadioTheme()
  };
  public selectedComponent?: string = '';

  public controller: ValidationController;

  // tslint:disable-next-line: max-line-length
  constructor(private themeService: ThemeService, private ux: AureliaUX, public controllerFactory: ValidationControllerFactory) {
    this.design = this.ux.design;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new AureliaUXFormRenderer());
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

  public setPAPreset(preset: string) {
    if (preset === 'default') {
      this.design.primary = '#3F51B5';
      this.design.accent = '#FF4081';
    }
    if (preset === 'light') {
      this.design.primary = '#90A4AE';
      this.design.accent = '#BDBDBD';
    }
    if (preset === 'dark') {
      this.design.primary = '#37474F';
      this.design.accent = '#616161';
    }
    if (preset === 'ocean') {
      this.design.primary = '#1565C0';
      this.design.accent = '#283593';
    }
  }

  public setASPreset(preset: string) {
    if (preset === 'default') {
      this.design.appBackground = '#FAFAFA';
      this.design.surfaceBackground = '#FFFFFF';
    }
    if (preset === 'light') {
      this.design.appBackground = '#90A4AE';
      this.design.surfaceBackground = '#BDBDBD';
    }
    if (preset === 'dark') {
      this.design.appBackground = '#37474F';
      this.design.surfaceBackground = '#616161';
    }
    if (preset === 'ocean') {
      this.design.appBackground = '#1565C0';
      this.design.surfaceBackground = '#283593';
    }
  }

  public setCDEPreset(preset: string) {
    if (preset === 'default') {
      this.design.controlBackground = '#EFEFEF';
      this.design.disabledBackground = '#9E9E9E';
      this.design.error = '#F44336';
    }
    if (preset === 'light') {
      this.design.controlBackground = '#FFFFFF';
      this.design.disabledBackground = '#CCCCCC';
      this.design.error = '#E57373';
    }
    if (preset === 'dark') {
      this.design.controlBackground = '#333';
      this.design.disabledBackground = '#777777';
      this.design.error = '#B71C1C';
    }
    if (preset === 'ocean') {
      this.design.controlBackground = '#9FA8DA';
      this.design.disabledBackground = '#C5CAE9';
    }
  }

}
