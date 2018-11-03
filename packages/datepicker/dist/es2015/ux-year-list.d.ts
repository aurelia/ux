import { ViewResources } from 'aurelia-templating';
import { Moment } from 'moment';
export declare class UxYearList {
    element: Element;
    resources: ViewResources;
    theme: null;
    minDate: Moment;
    maxDate: Moment;
    value: Moment;
    private today;
    constructor(element: Element, resources: ViewResources);
    attached(): void;
    selectYear(year: number): void;
    readonly yearList: number[];
    private scrollToActive;
}
