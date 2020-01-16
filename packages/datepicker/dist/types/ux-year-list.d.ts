import { ViewResources } from 'aurelia-templating';
import { Moment } from './resources/moment-rexports';
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
    get yearList(): number[];
    private scrollToActive;
}
