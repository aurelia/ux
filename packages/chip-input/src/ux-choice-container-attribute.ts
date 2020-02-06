import { UxChoiceAttribute } from './ux-choice-attribute';
import { customAttribute, bindingMode, bindable, inject, TaskQueue } from 'aurelia-framework';

@customAttribute('ux-choice-container')
@inject(Element, TaskQueue)
export class UxChoiceContainerAttribute {

  @bindable({defaultBindingMode: bindingMode.twoWay, primaryProperty: true}) public value: any | any[];
  @bindable public multiple: boolean | 'auto' = 'auto';

  public isMultiple: boolean = false;
  private choices: Array<UxChoiceAttribute> = [];

  private isQueued: boolean = false;

  constructor(private element: Element, private taskQueue: TaskQueue) {
  }

  /* Event passed on the click eventListener */
  public handleEvent(event: Event) {
    if (event.target instanceof Element) {
      const choiceElement: any = event.target.closest('.ux-choice');
      if (
        choiceElement !== null &&
        choiceElement.au !== undefined &&
        choiceElement.au['ux-choice'] !== undefined &&
        choiceElement.au['ux-choice'].viewModel instanceof UxChoiceAttribute) {
        const choice: UxChoiceAttribute = choiceElement.au['ux-choice'].viewModel;
        this.toggleValue(choice.value);
      }
    }
  }

  /* Callback passed on the TaskQueue when registering child choices */
  public call() {
    this.isQueued = false;
    this.processValue();
  }

  public bind() {
    this.multipleChanged();
    this.valueChanged(this.value);
  }

  public multipleChanged() {
    if (this.multiple === 'auto') {
      this.isMultiple = Array.isArray(this.value) ? true : false;
    } else if (typeof this.multiple === 'boolean') {
      this.isMultiple = this.multiple;
    } else {
      this.isMultiple = this.multiple === 'multiple' || this.multiple === 'true';
    }
    this.element.classList.toggle('ux-choice-container--multiple', this.isMultiple);
  }

  public attached() {
    this.element.classList.add('ux-choice-container');
    this.element.addEventListener('click', this);
  }

  public detached() {
    this.element.removeEventListener('click', this);
  }

  public registerChoice(choice: UxChoiceAttribute) {
    this.choices.push(choice);
    if (!this.isQueued) {
      this.isQueued = true;
      this.taskQueue.queueMicroTask(this);
    }
  }

  public disposeChoice(choice: UxChoiceAttribute) {
    const index = this.choices.indexOf(choice);
    if (index !== -1) {
      this.choices.splice(index, 1);
    }
  }

  public valueChanged(newValue: string | string []) {
    if (this.multiple === 'auto') {
      this.multipleChanged(); // call this to ensure isMultiple respect value type
    }
    if (this.isMultiple && typeof newValue === 'string') {
      this.value = [];
    } else if (!this.isMultiple && Array.isArray(newValue)) {
      this.value = undefined;
    }
    this.processValue();
  }

  public toggleValue(value: string) {
    if (this.isMultiple && Array.isArray(this.value)) {
      const index = this.value.indexOf(value);
      if (index === -1) {
        this.value.push(value);
      } else {
        this.value.splice(index, 1);
      }
    } else if (!this.isMultiple) {
      this.value = this.value === value ? undefined : value;
    }
    this.processValue();
  }

  public processValue() {
    if (this.isMultiple && Array.isArray(this.value)) {
      for (const choice of this.choices) {
        choice.selected = this.value.indexOf(choice.value) !== -1;
      }
    } else if (!this.isMultiple && typeof this.value === 'string') {
      for (const choice of this.choices) {
        choice.selected = this.value === choice.value;
      }
    }
  }
}
