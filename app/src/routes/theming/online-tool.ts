import { UxTheme } from './../../../../packages/core/src/styles/ux-theme';
import { ThemeService, ThemesSet } from '../../theme-service';
import { inject } from 'aurelia-framework';
import { AureliaUX, Design } from '@aurelia-ux/core';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import { getLogger } from 'aurelia-logging';
const log = getLogger('online-tool');

import { AureliaUXFormRenderer } from '../../forms-form-renderer';
import { Color } from '../../color';

@inject(ThemeService, AureliaUX, ValidationControllerFactory)
export class OnlineTool {

  public design: Design;

  public part = 'app';
  public interests: Array<string> = ['technology'];
  public ageGroup: string = '21-30';
  public volume = 85;

  public selectedComponent: 'button' | 'input' | 'textarea' | 'select' | 'datepicker' | 'chip-input' | 'slider' | 'checkbox' | 'radio' = 'select';

  public buttonPreviewClass = '';
  public buttonPreviewType = 'raised';
  public buttonPreviewDisabled = false;

  public inputPreviewType = 'text';
  public inputPreviewVariant = 'filled';
  public inputPreviewDisabled = false;
  public inputPreviewError = false;

  public textareaPreviewVariant = 'filled';
  public textareaPreviewAutoResize = true;
  public textareaPreviewDisabled = false;
  public textareaPreviewError = false;

  public selectPreviewVariant = 'filled';
  public selectPreviewDisabled = false;
  public selectPreviewError = false;

  public datepickerPreviewType = 'datetime';
  public datepickerPreviewVariant = 'filled';
  public datepickerPreviewDisabled = false;
  public datepickerPreviewError = false;

  public chipInputPreviewVariant = 'filled';
  public chipInputPreviewDisabled = false;
  public chipInputPreviewError = false;

  public sliderPreviewType = 'default';
  public sliderPreviewDisabled = false;

  public checkboxIndeterminate = false;
  public checkboxPreviewDisabled = false;

  public radioPreviewDisabled = false;

  public controller: ValidationController;

  public autoComputePrimaryAccent: boolean = true;
  public autoComputeAppSurface: boolean = true;
  public autoComputeControlState: boolean = true;
  
  // tslint:disable-next-line: max-line-length
  constructor(private themeService: ThemeService, private ux: AureliaUX, public controllerFactory: ValidationControllerFactory) {
    this.design = this.ux.design;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new AureliaUXFormRenderer());

    try {
      const color = new Color('red');
      log.debug('color', color);
    } catch (error) {
      log.debug('invalid color');
    }
  }

  public selectTheme(theme: 'light' | 'dark' | number) {
    this.themeService.apply(theme);
  }

  public newTheme() {
    this.themeService.newThemeSet();
  }

  public themeNameChanged(theme: ThemesSet) {
    this.saveTheme(theme);
  }

  public saveTheme(theme: ThemesSet) {
    this.themeService.saveThemesSet();
  }

  public deleteTheme(index: number) {
    this.themeService.themesSets.splice(index, 1);
    this.themeService.saveThemesSet();
  }

  public selectComponent(component: 'button' | 'input' | 'textarea' | 'select') {
    this.selectedComponent = component;
  }

  public json(theme: UxTheme) {
    return JSON
      .stringify(theme, null, 2)
      .replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2')
      .replace(/\s/g, '&nbsp;');
  }

}
