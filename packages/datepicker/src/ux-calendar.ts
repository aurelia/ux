import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { DatetimeUtility } from './resources/datetime-utility';
import { DatepickerSettings } from './resources/datepicker-settings';
import * as moment from 'moment';

type Moment = moment.Moment;

@inject(ViewResources)
@customElement('ux-calendar')
export class UxCalendar {
    @bindable public theme = null;

    @bindable public weekdays = moment.weekdays();

    @bindable public minDate: Moment;
    @bindable public maxDate: Moment;

    @bindable public value: Moment;
    @bindable public config: DatepickerSettings;

    private calendarRows = new Array<any>();

    @observable private displayMonth: Moment;

    constructor(public resources: ViewResources) { }

    public bind() {
        this.displayMonth = this.value.clone();
    }

    public previousMonth() {
        this.displayMonth = this.displayMonth.clone().subtract(1, 'month');
    }

    public nextMonth() {
        this.displayMonth = this.displayMonth.clone().add(1, 'month');
    }

    public changeCalendarSelection(newDate: Moment) {
        const modifiedDate = this.value.clone()
            .set('date', newDate.date())
            .set('month', newDate.month())
            .set('year', newDate.year());

        if (this.isValidDate(modifiedDate)) {
            return;
        }

        this.value = modifiedDate;
    }

    public displayMonthChanged(newDate: Moment) {
        this.calendarRows = new Array<any>();

        const clonedDate = newDate.clone();

        const firstDay = clonedDate.startOf('month').weekday();
        const daysInMonth = newDate.daysInMonth();

        let currentWeek = new Array<any>();

        while (currentWeek.length < firstDay) {
            currentWeek.push(null);
        }

        for (let index = 0; index < daysInMonth; index++) {
            currentWeek.push(clonedDate.clone().add(index, 'days'));

            if (currentWeek.length === 7) {
                this.calendarRows.push(currentWeek);

                currentWeek = new Array<any>();
            }
        }

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }

            this.calendarRows.push(currentWeek);
        }
    }

    private isValidDate(date: Moment) {
        return DatetimeUtility.dateOutOfRange(date, this.minDate, this.maxDate, this.config);
    }
}
