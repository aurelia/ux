import {customElement, bindable, ViewResources, View, processAttributes} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {StyleEngine} from '../styles/style-engine';
import {Themable} from '../styles/themable';
import {processDesignAttributes} from '../designs/design-attributes';
import {PaperRipple} from '../effects/paper-ripple';

@inject(ViewResources, StyleEngine)
@customElement('ux-button')
@processAttributes(processDesignAttributes)
export class UxButton implements Themable {
  @bindable public type = null;
  @bindable public size = null;
  @bindable public disabled = false;
  @bindable public theme = null;

  public view: View;
  private ripple: PaperRipple | null = null;
  private button: HTMLButtonElement;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) {}

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public onMouseDown(e: MouseEvent) {
    if (this.ripple === null) {
      this.ripple = new PaperRipple();
      this.button.appendChild(this.ripple.$);
    }

    if (this.button.classList.contains('fab')) {
      this.ripple.center = true;
      this.ripple.round = true;
    }

    this.ripple.downAction(e);

    return true;
  }

  public onMouseUp() {
    if (this.ripple !== null) {
      this.ripple.upAction();
    }

    return true;
  }
}
