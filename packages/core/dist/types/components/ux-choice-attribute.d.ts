import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import './ux-choice.css';
export declare class UxChoiceAttribute {
    private element;
    private container;
    value: any;
    selected: boolean;
    constructor(element: Element, container: UxChoiceContainerAttribute);
    bind(): void;
    detached(): void;
    valueChanged(newValue: any, oldValue: any): void;
    selectedChanged(): void;
}
