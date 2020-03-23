import { EventAggregator } from 'aurelia-event-aggregator';
import { UxDrawerTheme } from './ux-drawer-theme';
import { UxDrawer } from './ux-drawer';
import { DrawerPosition } from './ux-drawer';
import { inject, TemplatingEngine, Controller } from 'aurelia-framework';

export interface ModalServiceOptions {
  viewModel?: any;
  view?: any;
  position?: DrawerPosition;
  drawerId?: string;
  moveToBodyTag?: boolean;
  theme?: UxDrawerTheme;
  model?: any
}

export interface ModalServiceResult {
  wasCancelled: boolean;
  output: any;
}

export interface ModalServiceDrawer {
  whenClosed: () => Promise<ModalServiceResult>
}

@inject(TemplatingEngine, EventAggregator)
export class ModalService {

  public startingZIndex: number = 200;
  public modalLayers: Array<UxDrawer> = [];
  public drawerIndex: number = 0;

  constructor(private templatingEngine: TemplatingEngine, private eventAggregator: EventAggregator) {

  }

  public addLayer(drawer: UxDrawer) {
    this.modalLayers.push(drawer);
  }

  public removeLayer(drawer: UxDrawer) {
    const index = this.modalLayers.indexOf(drawer);
    if (index !== -1) {
      this.modalLayers.splice(index, 1);
    }
  }

  public getLastLawer(): UxDrawer {
    return this.modalLayers[this.modalLayers.length - 1];
  }

  public dismissLastDrawer() {
    this.getLastLawer().dismiss();
  }

  public closeLastDrawer(result: any) {
    this.getLastLawer().ok(result);
  }

  public get zIndex() {
    return this.startingZIndex + this.modalLayers.length;
  }

  public open(options: ModalServiceOptions): UxDrawer & ModalServiceDrawer {
    this.drawerIndex++;
    const bindingContext: {
      compose?: {
        viewModel?: any;
        view?: any;
        model?: any;
      },
      theme?: UxDrawerTheme,
      dismiss?: () => void,
      ok?: (event: Event) => void
    } = {
    };
    if (!options.viewModel && !options.view) {
      throw new Error('Invalid Drawer Settings. You must provide "viewModel", "view" or both.');
    }
    const element = document.createElement('ux-drawer');
    element.setAttribute('dismiss.delegate', 'dismiss()');
    element.setAttribute('ok.delegate', 'ok($event)');
    if (options.drawerId !== undefined) {
      element.setAttribute('drawer-id', options.drawerId);
    }
    if (options.position !== undefined) {
      element.setAttribute('position', options.position);
    }
    if (options.moveToBodyTag === false) {
      element.setAttribute('drawer-id.bind', 'false');
    }
    if (options.theme) {
      bindingContext.theme = options.theme;
      element.setAttribute('theme.bind', `theme`);
    }
    const compose = document.createElement('compose');
    compose.setAttribute('view-model.ref', 'compose');
    element.innerHTML = compose.outerHTML;
    let childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
    if (options.viewModel && bindingContext.compose) {
      bindingContext.compose.viewModel = options.viewModel;
    }
    if (options.view && bindingContext.compose) {
      bindingContext.compose.view = options.view;
    }
    if (options.model && bindingContext.compose) {
      bindingContext.compose.model = options.model;
    }
    childView.attached();
    const controllers = (childView as any).controllers as Controller[];
    
    const drawer: UxDrawer =  controllers[0].viewModel as UxDrawer;
    const drawerIndex = this.drawerIndex;
    const whenClosed: Promise<ModalServiceResult> = new Promise((resolve) => {
      this.eventAggregator.subscribeOnce(`drawer-${drawerIndex}-resolve`, (result: ModalServiceResult) => {
        resolve(result);
      });      
    });

    (drawer as UxDrawer & ModalServiceDrawer).whenClosed = () => {
      return whenClosed;
    }
    bindingContext.dismiss = () => {
      const parent = drawer.element.parentNode;
      if (!parent) { return; }
      parent.removeChild(drawer.element);
      this.eventAggregator.publish(`drawer-${drawerIndex}-resolve`, {
        wasCancelled: true,
        output: null
      });
    }
    bindingContext.ok = (event: CustomEvent) => {
      const parent = drawer.element.parentNode;
      if (!parent) { return; }
      parent.removeChild(drawer.element);
      this.eventAggregator.publish(`drawer-${drawerIndex}-resolve`, {
        wasCancelled: false,
        output: event.detail
      });
    }
    return (drawer as UxDrawer & ModalServiceDrawer);
  }

  public cancel() {
    const drawer = this.getLastLawer();
    drawer.dismiss();
  }

  public ok(result: any) {
    const drawer = this.getLastLawer();
    drawer.ok(result);
  }

}
