import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from 'aurelia-ux';
import { Themable } from 'aurelia-ux';
import { processDesignAttributes } from 'aurelia-ux';
import * as moment from 'moment';
import { DatetimeUtility } from './resources/datetime-utility';
import { DatepickerSettings } from './resources/datepicker-settings';

@inject(ViewResources, StyleEngine)
@customElement('ux-datepicker')
@processAttributes(processDesignAttributes)
export class UxDatepicker implements Themable {
  @bindable public theme = null;

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

  public view: View;

  private textboxValue: string;
  private showDialog = false;
  private display = 'month';

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

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

      if (dateParse.isValid()) {
        this.minDate = dateParse;
      } else {
        this.minDate = null;
      }
    }

    if (this.maxDate != null) {
      const dateParse = moment(this.maxDate);

      if (dateParse.isValid()) {
        this.maxDate = dateParse;
      } else {
        this.maxDate = null;
      }
    }

    if (this.minTime != null) {
      const dateParse = moment(this.minTime, this.parsers.time);

      if (dateParse.isValid()) {
        this.minTime = dateParse;
      } else {
        this.minTime = null;
      }
    }

    if (this.maxTime != null) {
      const dateParse = moment(this.maxTime, this.parsers.time);

      if (dateParse.isValid()) {
        this.maxTime = dateParse;
      } else {
        this.maxTime = null;
      }
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public toggleDialog(display: string) {
    if (this.showDialog) {
      this.showDialog = false;
      return;
    }

    this.display = display;

    this.showDialog = true;
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

      if (dateParse.isValid()) {
        this.minDate = dateParse;
      } else {
        this.minDate = null;
      }
    }
  }

  public maxDateChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue);

      if (dateParse.isValid()) {
        this.maxDate = dateParse;
      } else {
        this.maxDate = null;
      }
    }
  }

  public minTimeChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue, this.parsers.time);

      if (dateParse.isValid()) {
        this.minTime = dateParse;
      } else {
        this.minTime = null;
      }
    }
  }

  public maxTimeChanged(newValue: any) {
    if (newValue != null && newValue instanceof moment === false) {
      const dateParse = moment(newValue, this.parsers.time);

      if (dateParse.isValid()) {
        this.maxTime = dateParse;
      } else {
        this.maxTime = null;
      }
    }
  }

  public changeTextboxValue() {
    if (!this.textboxValue) {
      this.value = null;
      return;
    }

    let parseValue;

    if (this.type === 'time') {
      parseValue = moment(this.textboxValue, this.parsers.time);
    } else {
      parseValue = moment(this.textboxValue);
    }

    if (parseValue.isValid() &&
      DatetimeUtility.dateOutOfRange(parseValue, this.minDate, this.maxDate, this.config) === false) {
      this.value = parseValue.toDate();
    } else {
      this.value = null;
      this.textboxValue = '';
    }
  }
}
