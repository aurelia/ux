import { UxChoiceContainerAttribute } from './ux-choice-container-attribute';
import { customAttribute, inject, observable } from 'aurelia-framework';
import './ux-choice.css';

@customAttribute('ux-choice')
@inject(Element)
export class UxChoiceAttribute {

  public value: any;
  @observable public selected: boolean;

  private container: UxChoiceContainerAttribute;

  constructor(private element: Element) {
  }

  public attached() {
    this.element.classList.add('ux-choice');
    this.registerChoiceInContainer();
  }

  public detached() {
    this.container.disposeChoice(this);
  }

  private registerChoiceInContainer() {
    // find the closest container
    const containerElement: any = this.element.closest('.ux-choice-container');
    if (
      containerElement !== null &&
      containerElement.au !== undefined &&
      containerElement.au['ux-choice-container'] !== undefined &&
      containerElement.au['ux-choice-container'].viewModel instanceof UxChoiceContainerAttribute) {
      this.container = containerElement.au['ux-choice-container'].viewModel;
      this.container.registerChoice(this);
    }
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
