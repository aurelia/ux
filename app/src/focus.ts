export interface StringTMap<T> { [key: string]: T; };
export interface StringAnyMap extends StringTMap<any> {};
export interface StringBooleanMap extends StringTMap<boolean> {};

export class Focus {
  private focused: StringBooleanMap = {
    input: false,
    textarea: false,
    select: false,
    datepicker: false,
    chipInput: false
  };

  private viewModels: StringAnyMap = {}

  public focus(component: string, usingCustomAttribute: boolean = false) {
    if (usingCustomAttribute) {
      this.focused[component] = true;
    } else {
      this.viewModels[component].focus();
    }
  }

  public focusDatepicker() {
    this.viewModels['datepicker'].focus(true);
  }
}
