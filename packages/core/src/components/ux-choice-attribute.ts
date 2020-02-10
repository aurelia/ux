import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import { customAttribute, inject, observable, Optional } from 'aurelia-framework';
import './ux-choice.css';

@customAttribute('ux-choice', undefined, ['ux-choice-item', 'ux-choice-option'])
@inject(Element, Optional.of(UxChoiceContainerAttribute))
export class UxChoiceAttribute {

  public value: any;
  @observable public selected: boolean;

  constructor(private element: Element, private container: UxChoiceContainerAttribute) {}

  public bind() {
    this.container.registerChoice(this);
    this.element.classList.add('ux-choice');
  }

  public detached() {
    this.container.disposeChoice(this);
  }

  public valueChanged(newValue: any, oldValue: any) {
    if (!this.container) {
      return;
    }
    const containerValue = this.container.value;
    if (this.container.isMultiple && Array.isArray(containerValue)) {
      for (let value of containerValue) {
        if (value === oldValue) {
          value = newValue;
          return;
        }
      }
    } else if (!this.container.isMultiple && containerValue === oldValue) {
      this.container.value = newValue;
    }
  }

  public selectedChanged() {
    this.element.classList.toggle('ux-choice--selected', this.selected);
  }
}
