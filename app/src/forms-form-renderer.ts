import {
  ValidationRenderer,
  RenderInstruction,
  ValidateResult
} from 'aurelia-validation';

const errorClasses: {[key: string]: string} = {
  'ux-input': 'ux-input--has-error',
  'ux-datepicker': 'ux-datepicker--has-error',
  'ux-select': 'ux-select--has-error',
  'ux-textarea': 'ux-textarea--has-error'
};

export class AureliaUXFormRenderer {
  public render(instruction: RenderInstruction) {
    for (const { result, elements } of instruction.unrender) {
      for (const element of elements) {
        this.remove(element, result);
      }
    }

    for (const { result, elements } of instruction.render) {
      for (const element of elements) {
        this.add(element, result);
      }
    }
  }

  public add(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    for (const tag in errorClasses) {
      if (element.classList.contains(tag)) {
        element.classList.add(errorClasses[tag]);
      }
    }

    const uxField = element.closest('ux-field');
    if (!uxField) {
      return;
    }

    const inputInfoHintText = uxField.querySelector('ux-input-info');
    if (!inputInfoHintText) {
      return;
    }

    // add help-block
    const message = document.createElement('span');
    message.className = 'ux-input-info__error-text';
    message.textContent = result.message;
    message.id = `validation-message-${result.id}`;
    inputInfoHintText.insertBefore(message, inputInfoHintText.firstChild);
  }

  public remove(element: Element, result: ValidateResult) {
    if (result.valid) {
      return;
    }

    for (const tag in errorClasses) {
      if (element.classList.contains(tag)) {
        element.classList.remove(errorClasses[tag]);
      }
    }

    const uxField = element.closest('ux-field');
    if (!uxField) {
      return;
    }

    const inputInfoHintText = uxField.querySelector('ux-input-info');
    if (!inputInfoHintText) {
      return;
    }

    // remove help-block
    const message = inputInfoHintText.querySelector(`#validation-message-${result.id}`);
    if (message) {
      inputInfoHintText.removeChild(message);

      // remove the has-error class from the enclosing form-group div
      if (inputInfoHintText.querySelectorAll('.help-block.validation-message').length === 0) {
        inputInfoHintText.classList.remove('has-error');
      }
    }
  }
}
