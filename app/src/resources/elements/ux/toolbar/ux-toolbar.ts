import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { StyleEngine } from '@aurelia-ux/core';
import { customElement, bindable } from 'aurelia-templating';
import { UxToolbarTheme } from './ux-toolbar-theme';

@inject(Element, EventAggregator, StyleEngine)
@customElement('ux-toolbar')
export class UxToolbar {
  @bindable public theme: UxToolbarTheme;
  public isNavigating = false;
  private subscriber: any = {};

  constructor(
    public element: HTMLElement,
    private eventAggregator: EventAggregator,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);
  }

  public attached() {
    this.subscriber.processing = this.eventAggregator.subscribe('router:navigation:processing', () => {
      this.isNavigating = true;
    });

    this.subscriber.complete = this.eventAggregator.subscribe('router:navigation:complete', () => {
      this.isNavigating = false;
    });
  }

  public detached() {
    this.subscriber.processing.dispose();
    this.subscriber.complete.dispose();
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'toolbar';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
