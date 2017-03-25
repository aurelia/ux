import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, StyleEngine, ViewResources)
@customElement('ux-textarea')
@processAttributes(processDesignAttributes)

export class UxTextarea implements Themable {
  @bindable public autofocus = null;
  @bindable public autoResize = null;
  @bindable public cols: number;
  @bindable public disabled: any = false;
  @bindable public maxlength: number;
  @bindable public minlength: number;
  @bindable public readonly: any = false;
  @bindable public rows: number;
  @bindable public theme = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  public textbox: HTMLTextAreaElement;
  public view: View;

  constructor(
    private element: HTMLTextAreaElement,
    private styleEngine: StyleEngine,
    public  resources: ViewResources) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {

    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.autofocus || this.autofocus === '') {
      setTimeout(() => {
        this.textbox.focus();
      }, 0);
    }

    if (this.element.hasAttribute('placeholder')) {
      const attributeValue = this.element.getAttribute('placeholder');

      if (attributeValue) {
        this.textbox.setAttribute('placeholder', attributeValue);
        this.element.removeAttribute('placeholder');
      }
    }

    if (this.element.hasAttribute('required')) {
      this.textbox.setAttribute('required', '');
      this.element.removeAttribute('required');
    }

    if (this.cols) {
      this.textbox.setAttribute('cols', this.cols.toString());
      this.element.removeAttribute('cols');
    }

    if (this.rows) {
      this.textbox.setAttribute('rows', this.rows.toString());
      this.element.removeAttribute('rows');
    }

    if (this.minlength) {
      this.textbox.setAttribute('minlength', this.minlength.toString());
    }

    if (this.maxlength) {
      this.textbox.setAttribute('maxlength', this.maxlength.toString());
    }

    if (this.disabled || this.disabled === '') {
      this.textbox.setAttribute('disabled', '');
    }

    if (this.readonly || this.readonly === '') {
      this.textbox.setAttribute('readonly', '');
    }
  }

  public attached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.addEventListener('focus', () => {
      this.element.classList.add('focused');
    });

    this.textbox.addEventListener('blur', () => {
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
      this.element.classList.remove('focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public disabledChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('disabled', 'true');
    } else {
      this.textbox.removeAttribute('disabled');
    }
  }

  public readonlyChanged(newValue: any) {
    if (newValue === true || newValue === '') {
      this.textbox.setAttribute('readonly', 'true');
    } else {
      this.textbox.removeAttribute('readonly');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public valueChanged() {
    if (this.autoResize !== null) {
      this.textbox.style.height = 'auto';
      this.textbox.style.height = `${this.textbox.scrollHeight + 2}px`;
    }
  }
}
