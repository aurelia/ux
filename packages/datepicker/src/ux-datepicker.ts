import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { bindingMode, observable, computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxInputComponent, normalizeBooleanAttribute, getBackgroundColorThroughParents } from '@aurelia-ux/core';
import { DatetimeUtility } from './resources/datetime-utility';
import { DatepickerSettings } from './resources/datepicker-settings';
import { UxDatepickerTheme } from './ux-datepicker-theme';
import { DOM } from 'aurelia-pal';
import { moment } from './resources/moment-rexports';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/components/ux-input-component--outline.css';
// import UX_DATEPICKER_VIEW from './ux-datepicker.html';
// import { PLATFORM } from 'aurelia-pal';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-datepicker')
// @inlineView(
//   UX_DATEPICKER_VIEW,
//   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-datepicker.css')]
// )
export class UxDatepicker implements UxInputComponent {
  @bindable public theme: UxDatepickerTheme;

  @bindable public display = 'month';
  @bindable public type = 'datetime';
  @bindable public initialDate: any;
  @bindable public minTime: any;
  @bindable public maxTime: any;
  @bindable public minDate: any;
  @bindable public maxDate: any;
  @bindable public config: DatepickerSettings;
  @bindable public autofocus = null;
  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public label: string;
  @bindable public placeholder: string;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: any = false;

  @bindable public formatters = {
    date: 'L',
    time: 'LT',
    datetime: 'L LT'
  };

  @bindable public parsers = {
    time: ['h:m a', 'H:m']
  };

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any;

  @observable
  public focused: boolean = false;

  public textbox: HTMLInputElement;
  private textboxValue: string;
  private showDialog = false;

  constructor(public element: HTMLElement, public resources: ViewResources, public styleEngine: StyleEngine) { }

  public bind() {

    if (this.autofocus || this.autofocus === '') {
      this.focused = true;
    }

    this.dense = normalizeBooleanAttribute('dense', this.dense);

    if (this.initialDate != null) {
      const dateParse = moment(this.initialDate);

      if (dateParse.isValid()) {
        this.initialDate = dateParse;
      }
    } else {
      this.initialDate = moment();
    }

    if (this.minDate != null) {
      const dateParse = moment(this.minDate);

      this.minDate = dateParse.isValid() ? dateParse : null;
    }

    if (this.maxDate != null) {
      const dateParse = moment(this.maxDate);

      this.maxDate = dateParse.isValid() ? dateParse : null;
    }

    if (this.minTime != null) {
      const dateParse = moment(this.minTime, this.parsers.time);

      this.minTime = dateParse.isValid() ? dateParse : null;
    }

    if (this.maxTime != null) {
      const dateParse = moment(this.maxTime, this.parsers.time);

      this.maxTime = dateParse.isValid() ? dateParse : null;
    }

    this.valueChanged(this.value);
    this.themeChanged(this.theme);
  }

  public attached() {
    this.variantChanged(this.variant);
  }

  public toggleDialog(display: string) {
    if (this.showDialog) {
      this.showDialog = false;
      return;
    }

    if (this.disabled || this.readonly) {
      return;
    }

    this.display = display;

    this.showDialog = true;
  }

  public blur() {
    if (this.showDialog) {
      // if the dialog is opened, we consider that the most accurate value
      // comes from the dialog and bring back its value
      this.valueChanged(this.value);
      return;
    }
    // if the dialog is not opened, the textbox has the most accurate value
    // and therefore we validate it and assign it to component
    this.changeTextboxValue();
  }

  public changeTextboxValue() {
    if (!this.textboxValue) {
      this.value = null;
      return;
    }

    let parseValue;

    parseValue = this.type === 'time' ? moment(this.textboxValue, this.parsers.time) : moment(this.textboxValue);

    if (parseValue.isValid() &&
      DatetimeUtility.dateOutOfRange(parseValue, this.minDate, this.maxDate, this.config) === false) {
      this.value = parseValue.toDate();
    } else {
      this.value = null;
      this.textboxValue = '';
    }
  }

  public valueChanged(newValue: Date) {
    if (newValue == null) {
      return;
    }

    if (this.type.toLowerCase() === 'datetime') {
      this.textboxValue = moment(newValue).format(this.formatters.datetime);
    }

    if (this.type.toLowerCase() === 'date') {
      this.textboxValue = moment(newValue).format(this.formatters.date);
    }

    if (this.type.toLowerCase() === 'time') {
      this.textboxValue = moment(newValue).format(this.formatters.time);
    }
  }

  public minDateChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue);

      this.minDate = dateParse.isValid() ? dateParse : null;
    }
  }

  public maxDateChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue);

      this.maxDate = dateParse.isValid() ? dateParse : null;
    }
  }

  public minTimeChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue, this.parsers.time);

      this.minTime = dateParse.isValid() ? dateParse : null;
    }
  }

  public maxTimeChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue, this.parsers.time);

      this.maxTime = dateParse.isValid() ? dateParse : null;
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'datepicker';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public focusedChanged(focused: boolean) {
    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public focusInput() {
    this.textbox.focus();
  }

  public variantChanged(newValue: string) {
    this.element.style.backgroundColor = newValue === 'outline' ?
      this.element.style.backgroundColor = getBackgroundColorThroughParents(this.element) : 
      '';
  }

  @computedFrom('label')
  get placeholderMode(): boolean {
    return typeof this.label !== 'string' || this.label.length === 0;
  }
}
