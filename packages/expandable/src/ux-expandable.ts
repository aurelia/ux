import { customElement, useView, PLATFORM, bindable, TaskQueue, inject } from 'aurelia-framework';
import { UxComponent, StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxExpandableTheme } from './ux-expandable-theme';

@inject(Element, StyleEngine, TaskQueue)
@customElement('ux-expandable')
@useView(PLATFORM.moduleName('./ux-expandable.html'))
export class UxExpandable implements UxComponent {
  constructor(public element: HTMLElement, private styleEngine: StyleEngine, private taskQueue: TaskQueue) { }

  static OPEN_CHANGED = 'open-changed';

  header: HTMLElement;
  content: HTMLElement;
  contentContainer: HTMLElement;

  @bindable
  public theme: UxExpandableTheme;
  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'expandable';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public openBoolean: boolean = false;
  @bindable
  open: boolean | string = false;
  openChanged() {
    this.openBoolean = normalizeBooleanAttribute('open', this.open);
    this.updateContainerHeight();
    this.element.dispatchEvent(new CustomEvent(UxExpandable.OPEN_CHANGED, { detail: this.openBoolean }));
  }

  setContentContainerHeightToAuto = () => {
    this.content.style.overflow = "visible";
    this.content.style.height = "auto";
    this.content.removeEventListener("transitionend", this.setContentContainerHeightToAuto);
  }

  bind() { }

  attached() {
    this.openChanged();
  }

  updateContainerHeight() {
    if (this.openBoolean) {
      // after transition set body height to auto so that expandable children are visible
      this.contentContainer.addEventListener("transitionend", this.setContentContainerHeightToAuto);
      this.contentContainer.style.height = this.content.clientHeight + "px";
    } else {
      // the following line is needed because height has been restored to auto"
      this.contentContainer.style.height = this.content.clientHeight + "px";
      this.taskQueue.queueTask(() => {
        this.contentContainer.style.overflow = "hidden";
        this.contentContainer.style.height = "0";
      });
    }
  }

  toggle() {
    this.open = !this.openBoolean;
  }

}
