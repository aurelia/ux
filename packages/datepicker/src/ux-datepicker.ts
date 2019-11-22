import { customElement, bindable, ViewResources, inlineView } from 'aurelia-templating';
import { bindingMode, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { DatetimeUtility } from './resources/datetime-utility';
import { DatepickerSettings } from './resources/datepicker-settings';
import { UxDatepickerTheme } from './ux-datepicker-theme';
import { DOM } from 'aurelia-pal';
import { moment } from './resources/moment';
import * as UX_DATEPICKER_VIEW from './ux-datepicker.html';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-datepicker')
@inlineView(UX_DATEPICKER_VIEW)
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

  @observable
  public focused: boolean = false;

  public textbox: HTMLInputElement;
  private textboxValue: string;
  private showDialog = false;

  constructor(public element: HTMLElement, public resources: ViewResources, public styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, uxDatepickerElementProto);
  }

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

  public getValue() {
    return this.value;
  }

  public setValue(value: any) {
    const oldValue = this.value;
    const newValue = value;

    if (oldValue !== newValue) {
      this.value = newValue;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  public focusedChanged(focused: boolean) {
    this.element.classList.toggle('ux-datepicker--focused', focused);

    this.element.dispatchEvent(DOM.createCustomEvent(focused ? 'focus' : 'blur', { bubbles: false }));
  }

  public focus(openDialog: boolean = false) {
    this.textbox.focus();
    if (openDialog && !this.showDialog) {
      this.toggleDialog('month');
    }
  }

  public blur() {
    if (document.activeElement === this.textbox) {
      this.textbox.blur();
    }
  }
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxDatepickerElementProto = Object.create(HTMLElement.prototype, {
  value: {
    get() {
      return getVm<UxDatepicker>(this).getValue();
    },
    set(value: any) {
      getVm<UxDatepicker>(this).setValue(value);
    }
  },
  focus: {
    value() {
      getVm<UxDatepicker>(this).focused = true;
    }
  },
  blur: {
    value() {
      getVm<UxDatepicker>(this).focused = false;
    }
  }
});
