import { inject } from 'aurelia-dependency-injection';
import { containerless } from 'aurelia-templating';
import { Router } from 'aurelia-router';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';
import { UxResponsiveUtilities } from '@aurelia-ux/grid';

@inject(EventAggregator, Router, UxResponsiveUtilities)
@containerless
export class Sidebar {
  public subscriptions: Subscription[] = [];
  public drawer: HTMLElement;
  public open: boolean = false;
  public currentCategory: string;

  constructor(
    public eventAggregator: EventAggregator,
    public router: Router,
    public uxResponsiveUtilities: UxResponsiveUtilities) {
    this.router = router;
  }

  public attached() {
    this.subscriptions.push(this.eventAggregator.subscribe('sidebar:action:toggle', () => {
      this.toggleSidebar();
    }));

    this.resizeEvent();
    window.addEventListener('optimizedResize', this.resizeEvent);
  }

  public detached() {
    for (const sub of this.subscriptions) {
      sub.dispose();
    }

    window.removeEventListener('optimizedResize', this.resizeEvent);
  }

  public toggleSidebar() {
    this.open = !this.open;
  }

  private resizeEvent = () => {
    if (document.body.clientWidth <= 960) {
      this.open = false;

      this.drawer.removeAttribute('collapsible');
      this.drawer.setAttribute('type', 'temporary');
      this.drawer.setAttribute('position', 'left');
    } else {
      this.open = true;

      this.drawer.removeAttribute('position');
      this.drawer.setAttribute('type', 'permanent');
      this.drawer.setAttribute('collapsible', 'partial');
    }
  }
}
