import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-chip-input')
@processAttributes(processDesignAttributes)

export class UxChipInput implements Themable {
  @bindable public disabled: any = false;
  @bindable public readonly: any = false;
  @bindable public theme = null;
  @bindable public type: any;
  @bindable public seperator: string;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public chipArray: Array<any> = new Array<any>();

  public view: View;
  private textbox: HTMLInputElement;
  private chiprepeat: Element;
  private tagrepeat: Element;

  constructor(private element: HTMLInputElement, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.element.hasAttribute('placeholder')) {
      const attributeValue = this.element.getAttribute('placeholder');

      if (attributeValue) {
        this.textbox.setAttribute('placeholder', attributeValue);
        this.element.removeAttribute('placeholder');
      }
    }

    if (this.disabled || this.disabled === '') {
      this.textbox.setAttribute('disabled', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    }

    if (this.readonly || this.readonly === '') {
      this.textbox.setAttribute('readonly', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    }
  }

  public attached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.addEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.textbox.addEventListener('blur', () => {
      this.addChip();
      this.element.classList.remove('focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public detached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.removeEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.textbox.removeEventListener('blur', () => {
      this.addChip();
      this.element.classList.remove('focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public handleKeyup(event: KeyboardEvent) {
    const key = event.which || event.keyCode;

    if (key === 13) {
      this.addChip();
    }

    if (key === 37) {
      if (this.chipArray.length) {
        this.textbox.value = this.chipArray.pop().toString();
      }
    }
  }

  public addChip() {
    if (this.textbox.value.length) {
      this.chipArray.push(this.textbox.value);
      this.textbox.value = '';
      this.chipsChanged();
    }
  }

  public editChip(value: string) {
    if (this.textbox.value.length === 0) {
      this.removeChip(value);
      this.textbox.value = value;
      this.chipsChanged();
    }
  }

  public removeChip(value: string) {
    const chipIndex = this.chipArray.indexOf(value, 0);

    if (chipIndex > -1) {
      this.chipArray.splice(chipIndex, 1);
      this.chipsChanged();
    }
  }

  public chipsChanged() {
    let seperator = ', ';

    if (this.seperator) {
      seperator = this.seperator;
    }

    this.value = this.chipArray.join(seperator);
  }

  public valueChanged() {
    let seperator = ', ';

    if (this.seperator) {
      seperator = this.seperator;
    }

    this.chipArray = this.value.split(seperator);
  }

  public disabledChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('disabled', 'true');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    } else {
      this.textbox.removeAttribute('disabled');
      this.chiprepeat.setAttribute('deletable', '');
      this.tagrepeat.setAttribute('deletable', '');
    }
  }

  public readonlyChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('readonly', 'true');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    } else {
      this.textbox.removeAttribute('readonly');
      this.chiprepeat.setAttribute('deletable', '');
      this.tagrepeat.setAttribute('deletable', '');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }
}
