import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';
import { inject } from 'aurelia-dependency-injection';
import { Moment } from 'moment';
import * as moment from 'moment';
import { DatepickerSettings } from './resources/datepicker-settings';

@inject(ViewResources, StyleEngine)
@customElement('ux-picker-dialog')
@processAttributes(processDesignAttributes)
export class UxPickerDialog implements Themable {
  @bindable public theme = null;
  @bindable public type = 'datetime';
  @bindable public display = 'month';
  @bindable public weekdays: any;
  @bindable public config: DatepickerSettings;
  @bindable public initialDate: any;
  @bindable public minTime: Moment;
  @bindable public maxTime: Moment;
  @bindable public minDate: Moment;
  @bindable public maxDate: Moment;
  @bindable public value: Date | null;
  @bindable public closeDialog: () => {};

  public view: View;

  private selectedDate: Moment;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.value != null) {
      this.selectedDate = moment(this.value);
    } else {
      this.selectedDate = this.initialDate;

      if (this.minDate != null && this.selectedDate.isBefore(this.minDate)) {
        this.selectedDate = moment(this.minDate).clone();
      }

      if (this.maxDate != null && this.selectedDate.isBefore(this.maxDate)) {
        this.selectedDate = moment(this.minDate).clone();
      }

      if (this.minTime != null) {
        if (this.selectedDate.hour() < this.minTime.hour()) {
          this.selectedDate.hour(this.minTime.hour());
        }

        if (this.selectedDate.minute() < this.minTime.minute()) {
          this.selectedDate.minute(this.minTime.minute());
        }
      }

      if (this.maxTime != null) {
        if (this.selectedDate.hour() > this.maxTime.hour()) {
          this.selectedDate.hour(this.maxTime.hour());
        }

        if (this.selectedDate.minute() > this.maxTime.minute()) {
          this.selectedDate.minute(this.maxTime.minute());
        }
      }
    }
  }

  public valueChanged(newDate: Date) {
    this.selectedDate = moment(newDate);
  }

  public selectDate() {
    if (this.selectedDate != null) {
      this.value = this.selectedDate.toDate();
    }
  }

  public changeView(view: string) {
    this.display = view;
  }
}
