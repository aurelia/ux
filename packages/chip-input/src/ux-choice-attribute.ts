import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import { customAttribute, inject, observable, Optional } from 'aurelia-framework';
import { getLogger } from 'aurelia-logging';
import './ux-choice.css';

const logger = getLogger('ux-choice');

@customAttribute('ux-choice')
@inject(Element, Optional.of(UxChoiceContainerAttribute))
export class UxChoiceAttribute {

  public value: any;
  @observable public selected: boolean;

  constructor(private element: Element, private container: UxChoiceContainerAttribute) {}

  public attached() {
    this.element.classList.add('ux-choice');
    this.container.registerChoice(this);
  }

  public detached() {
    this.container.disposeChoice(this);
  }

  public valueChanged(newValue: any, oldValue: any) {
    if (!this.container) {
      return;
    }
    if (this.container.isMultiple && Array.isArray(this.container.value)) {
      for (const index in this.container.value) {
        if (this.container.value[index] === oldValue) {
          this.container.value[index] = newValue;
          return;
        }
      }
    } else if (!this.container.isMultiple && this.container.value === oldValue) {
      this.container.value = newValue;
    }
  }

  public selectedChanged() {
    this.element.classList.toggle('ux-choice--selected', this.selected);
  }
}
