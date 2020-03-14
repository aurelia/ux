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

}
