import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-radio')

export class UxRadio implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public effect = null;
  @bindable public id: string;
  @bindable public label: string;
  @bindable public model: any;
  @bindable public tabindex = 0;
  @bindable public theme: UxRadioTheme;
  // tslint:disable
  @bindable public matcher = (a: any, b: any) => a === b;
  // tslint: enable

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public checked: any = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public value: any = null;

  private radio: Element;
  private ripple: PaperRipple | null = null;


  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: HTMLElement, public resources: ViewResources, private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxRadioTheme());
  }

  public bind() {
    this.themeChanged(this.theme);

    if (this.checked) {
      this.checkedChanged();
    }

    if (normalizeBooleanAttribute('disabled', this.disabled) && !this.element.classList.contains('disabled')) {
      this.element.classList.add('disabled');
    } else if (this.element.classList.contains('disabled')) {
      this.element.classList.remove('disabled');
    }
  }

  public attached() {
    if (this.id) {
      const labelElement = document.querySelector(`label[for=${this.id}]`);

      if (labelElement != null) {
        labelElement.addEventListener('click', () => {
          this.toggleRadio();
        });
      }
    }
  }

  public detached() {
    if (this.id) {
      const labelElement = document.querySelector(`label[for=${this.id}]`);

      if (labelElement != null) {
        labelElement.removeEventListener('click', () => {
          this.toggleRadio();
        });
      }
    }
  }

  public themeChanged(newValue: UxRadioTheme) {
    this.styleEngine.applyTheme(newValue, this.element);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
      this.element.classList.add('disabled');
    } else if (this.element.classList.contains('disabled')) {
      this.element.classList.remove('disabled');
    }
  }

  public checkedChanged() {
    const elementValue = this.model ? this.model : this.value;

    let isChecked = this.checked;

    if (isChecked && isChecked === elementValue) {
      this.element.classList.add('checked');
      this.element.setAttribute('aria-checked', 'true');
    } else {
      this.element.classList.remove('checked');
      this.element.setAttribute('aria-checked', 'false');
    }
  }

  public toggleRadio() {
    if (this.isDisabled) {
      return;
    }

    const elementValue = this.model ? this.model : this.value;

    if (elementValue != null && typeof elementValue !== 'boolean') {
      this.checked = elementValue;
    } else {
      this.checked = !this.checked;
    }
  }

  public onKeydown(e: KeyboardEvent) {
    const key = e.which || e.keyCode;

    if (key === 13 || key === 32) {
      e.preventDefault();

      this.toggleRadio();
    }
    
    return true;
  }

  public onMouseDown(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.radio.classList.contains('ripple')) {
      if (this.ripple === null) {
        this.ripple = new PaperRipple();
        const container = this.element.querySelector('.ripplecontainer');

        if (container != null) {
          container.appendChild(this.ripple.$);
        }
      }

      this.ripple.center = true;
      this.ripple.round = true;

      this.ripple.downAction(e);
    }

    this.toggleRadio();
    e.preventDefault();
  }

  public onMouseUp(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.radio.classList.contains('ripple') && this.ripple !== null) {
      this.ripple.upAction();
    }
  }
}
