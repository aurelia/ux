import { EventAggregator } from 'aurelia-event-aggregator';
import { UxDrawerTheme } from './ux-drawer-theme';
import { UxDrawer } from './ux-drawer';
import { DrawerPosition, DrawerKeybord, DefaultDrawerConfiguration } from './drawer-configuration';
import { inject, TemplatingEngine, Controller } from 'aurelia-framework';

export interface ModalServiceOptions {
  viewModel?: any;
  view?: any;
  host?: Element| 'body' | string;
  position?: DrawerPosition;
  drawerId?: string;
  moveToBodyTag?: boolean;
  theme?: UxDrawerTheme;
  model?: any;
  overlayDismiss?: boolean;
  keyboard?: DrawerKeybord;
}

export interface ModalServiceResult {
  wasCancelled: boolean;
  output: any;
}

export interface ModalServiceDrawer {
  whenClosed: () => Promise<ModalServiceResult>
}

@inject(TemplatingEngine, EventAggregator, DefaultDrawerConfiguration)
export class ModalService {

  public startingZIndex: number = 200;
  public modalLayers: Array<UxDrawer> = [];
  public drawerIndex: number = 0;

  constructor(
    private templatingEngine: TemplatingEngine, 
    private eventAggregator: EventAggregator,
    private defaultConfig: DefaultDrawerConfiguration) {

  }

  public addLayer(drawer: UxDrawer) {
    this.modalLayers.push(drawer);
    if (this.modalLayers.length === 1) {
      this.setKeyListener();
    }
  }

  public removeLayer(drawer: UxDrawer) {
    const index = this.modalLayers.indexOf(drawer);
    if (index !== -1) {
      this.modalLayers.splice(index, 1);
    }
    if (this.modalLayers.length === 0) {
      this.removeKeyListener();
    }
  }

  private setKeyListener() {
    window.addEventListener('keyup', this);
  }

  private removeKeyListener() {
    window.removeEventListener('keyup', this);
  }

  public handleEvent(event: KeyboardEvent) {
    const key = this.getActionKey(event);
    if (key === undefined) { return; }
    const activeLayer = this.getLastLayer();
    const keyboard = activeLayer.keyboard;
    if (key === 'Escape'
      && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
      activeLayer.dismiss();
    } else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
      activeLayer.ok();
    }
  }

  private getActionKey(event: KeyboardEvent): DrawerKeybord | undefined {
    if ((event.code || event.key) === 'Escape' || event.keyCode === 27) {
      return 'Escape';
    }
    if ((event.code || event.key) === 'Enter' || event.keyCode === 13) {
      return 'Enter';
    }
    return undefined;
  }

  public getLastLayer(): UxDrawer {
    return this.modalLayers[this.modalLayers.length - 1];
  }

  public dismissLastDrawer() {
    this.getLastLayer().dismiss();
  }

  public closeLastDrawer(result: any) {
    this.getLastLayer().ok(result);
  }

  public get zIndex() {
    return this.startingZIndex + this.modalLayers.length;
  }

  public open(options: ModalServiceOptions): UxDrawer & ModalServiceDrawer {
    console.log('given options', options);
    // const defaultConfig = this.container.get(DefaultDrawerConfiguration);
    options = Object.assign({}, this.defaultConfig, options);
    console.log('compiled options', options);
    this.drawerIndex++;
    const bindingContext: {
      compose?: {
        viewModel?: any;
        view?: any;
        model?: any;
      },
      theme?: UxDrawerTheme,
      keyboard?: DrawerKeybord,
      host?: HTMLElement,
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
      element.setAttribute('move-to-body-tag.bind', 'false');
    }
    if (options.overlayDismiss === false) {
      element.setAttribute('overlay-dismiss', 'false');
    }
    if (options.keyboard !== undefined) {
      bindingContext.keyboard = options.keyboard;
      element.setAttribute('keyboard.bind', 'keyboard');
    }
    
    element.setAttribute('host.bind', 'false');
    
    if (options.theme) {
      bindingContext.theme = options.theme;
      element.setAttribute('theme.bind', `theme`);
    }
    const compose = document.createElement('compose');
    compose.setAttribute('view-model.ref', 'compose');
    element.innerHTML = compose.outerHTML;
    if (!options.host || options.host === 'body') {
      options.host = document.body;
    } else if (typeof options.host === 'string') {
      options.host = document.querySelector(options.host) || document.body;
    }
    options.host.appendChild(element);
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
    const drawer = this.getLastLayer();
    drawer.dismiss();
  }

  public ok(result: any) {
    const drawer = this.getLastLayer();
    drawer.ok(result);
  }

}
