import { customElement, inject, bindable, observable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@inject(Element, EventAggregator, Router)
@customElement('sidebar-menu-group')
export class SidebarMenuGroup {
  @bindable public category: string;

  @observable private open = false;

  private canClose = true;
  private detailElement: HTMLElement;
  private contentElement: HTMLElement;

  constructor(public element: Element, private eventAggregator: EventAggregator, private router: Router) {
    this.eventAggregator.subscribe('router:navigation:complete', () => {
      const isCurrentCategory = this.router.currentInstruction.config.settings.category === this.category;

      this.canClose = !isCurrentCategory;

      if (isCurrentCategory) {
        this.open = true;
      }
    });
  }

  public async attached() {
    const detail = this.element.querySelector('.sidebar-menu-group__summary');
    const content = this.element.querySelector('.sidebar-menu-group__details');

    if (detail != null && content != null) {
      this.detailElement = detail as HTMLElement;
      this.contentElement = content as HTMLElement;
    } else {
      throw new Error('There was an issue setting up the component. Please make sure you have a sidebar-menu-group-summary element and a sidebar-menu-group-details element'); //tslint:disable-line
    }

    this.detailElement.addEventListener('mouseup', (e) => {
      if (e.button !== 0) {
        return;
      }

      this.open = !this.open;
    });
  }

  public async openChanged() {
    if (this.open) {
      this.element.classList.add('sidebar-menu-group--open');

      // delay setting the height, fixes a bug where there
      // is unexplained space below the menu items
      setTimeout(() => {
        const wrapper = this.element.querySelector('.sidebar-menu-group__content-wrapper') as HTMLElement;

        if (this.contentElement != null) {
          this.contentElement.style.height = wrapper.clientHeight + 'px';
        }
      }, 50);
    } else {
      if (!this.canClose) {
        return;
      }

      this.element.classList.remove('sidebar-menu-group--open');
      this.contentElement.style.height = '0';
    }
  }
}
