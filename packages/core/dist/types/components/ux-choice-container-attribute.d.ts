import { UxChoiceAttribute } from './ux-choice-attribute';
import { TaskQueue } from 'aurelia-framework';
export declare class UxChoiceContainerAttribute {
    private element;
    private taskQueue;
    value: any | any[];
    multiple: boolean | 'auto';
    isMultiple: boolean;
    private choices;
    private isQueued;
    constructor(element: Element, taskQueue: TaskQueue);
    handleEvent(event: Event): void;
    call(): void;
    bind(): void;
    multipleChanged(): void;
    attached(): void;
    detached(): void;
    private requestProcessValue;
    registerChoice(choice: UxChoiceAttribute): void;
    disposeChoice(choice: UxChoiceAttribute): void;
    valueChanged(newValue: string | string[]): void;
    toggleValue(value: string): void;
    processValue(): void;
}
