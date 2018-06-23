import { customElement, bindable, ViewResources, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { DatepickerSettings } from './resources/datepicker-settings';
import { Moment } from 'moment';
import * as moment_ from 'moment';
import UX_PICKER_DIALOG_VIEW from './ux-picker-dialog.html';

const moment = moment_;

@inject(ViewResources)
@customElement('ux-picker-dialog')
@inlineView(UX_PICKER_DIALOG_VIEW)
export class UxPickerDialog {
  @bindable public theme = null;
  @bindable public type = 'datetime';
  @bindable public display = 'month';
  @bindable public weekdays: any;
  @bindable public config: DatepickerSettings;
  @bindable public initialDate: any;
  @bindable public minDate: Moment;
  @bindable public maxDate: Moment;
  @bindable public value: Date | null;
  @bindable public closeDialog: () => {};

  private selectedDate: Moment;

  constructor(public resources: ViewResources) { }

  public bind() {
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
