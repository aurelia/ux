import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { DatetimeUtility } from './resources/datetime-utility';
import { DatepickerSettings } from './resources/datepicker-settings';
import { UxDatepickerTheme } from './ux-datepicker-theme';
import * as moment from 'moment';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-datepicker')
export class UxDatepicker implements UxComponent {
  @bindable public theme: UxDatepickerTheme;

  @bindable public display = 'month';
  @bindable public type = 'datetime';
  @bindable public initialDate: any;
  @bindable public minTime: any;
  @bindable public maxTime: any;
  @bindable public minDate: any;
  @bindable public maxDate: any;
  @bindable public placeholder: any;
  @bindable public config: DatepickerSettings;

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

  public textbox: HTMLInputElement;
  private textboxValue: string;
  private showDialog = false;

  constructor(public element: HTMLElement, public resources: ViewResources, public styleEngine: StyleEngine) { }

  public bind() {
    this.processAttribute('placeholder');

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

  public toggleDialog(display: string) {
    if (this.showDialog) {
      this.showDialog = false;
      return;
    }

    this.display = display;

    this.showDialog = true;
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

    this.showDialog = false;
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

  private processAttribute(attributeName: string) {
    const attributeValue = this.element.getAttribute('placeholder');

    if (attributeValue) {
      this.element.removeAttribute(attributeName);
      this.textbox.setAttribute(attributeName, attributeValue)
    }
  }
}
