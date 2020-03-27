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
  moveToBodyTag?: boolean;
  theme?: UxDrawerTheme;
  model?: any;
  overlayDismiss?: boolean;
  keyboard?: DrawerKeybord;
  restoreFocus?: (lastActiveElement: HTMLElement) => void;
}

export interface ModalServiceResult {
  wasCancelled: boolean;
  output: any;
}

export interface ModalServiceDrawer {
  whenClosed: () => Promise<ModalServiceResult>
}

interface ModalBindingContext {
  composeViewModel?: {
    viewModel?: any;
    view?: any;
    model?: any;
    currentViewModel?: {
      canDeactivate?: (result: any) => any;
      deactivate?: (result: any) => any;
      detached?: (result: any) => any;
    };
  };
  theme?: UxDrawerTheme;
  keyboard?: DrawerKeybord;
  restoreFocus?: (lastActiveElement: HTMLElement) => void;
  host?: HTMLElement;
  dismiss?: () => void;
  ok?: (event: Event) => void;
}

interface ModalLayer {
  bindingContext?: ModalBindingContext;
  drawer: UxDrawer;
}

@inject(TemplatingEngine, EventAggregator, DefaultDrawerConfiguration)
export class ModalService {

  public startingZIndex: number = 200;
  public modalLayers: Array<ModalLayer> = [];
  public drawerIndex: number = 0;

  constructor(
    private templatingEngine: TemplatingEngine, 
    private eventAggregator: EventAggregator,
    private defaultConfig: DefaultDrawerConfiguration) {

  }

  public addLayer(drawer: UxDrawer, bindingContext: ModalBindingContext) {
    const layerCount = this.modalLayers.push({
      bindingContext: bindingContext,
      drawer: drawer
    });
    if (layerCount === 1) {
      this.setKeyListener();
    }
  }

  public getLayer(drawer: UxDrawer): ModalLayer | undefined {
    const index = this.modalLayers.map(i => i.drawer).indexOf(drawer);
    if (index !== -1) {
      return this.modalLayers[index];
    }
    return undefined;
  }

  public removeLayer(drawer: UxDrawer) {
    const index = this.modalLayers.map(i => i.drawer).indexOf(drawer);
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
    const activeLayer = this.getLastDrawer();
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

  public getLastLayer(): ModalLayer {
    return this.modalLayers[this.modalLayers.length - 1];
  }

  public getLastDrawer(): UxDrawer {
    return this.getLastLayer().drawer;
  }

  public get zIndex() {
    return this.startingZIndex + this.modalLayers.length;
  }

  public open(options: ModalServiceOptions): UxDrawer & ModalServiceDrawer {
    // const defaultConfig = this.container.get(DefaultDrawerConfiguration);
    options = Object.assign({}, this.defaultConfig, options);
    this.drawerIndex++;
    const bindingContext: ModalBindingContext = {};
    if (!options.viewModel && !options.view) {
      throw new Error('Invalid Drawer Settings. You must provide "viewModel", "view" or both.');
    }
    const element = document.createElement('ux-drawer');
    element.setAttribute('dismiss.delegate', 'dismiss()');
    element.setAttribute('ok.delegate', 'ok($event)');
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
    if (typeof options.restoreFocus === 'function') {
      bindingContext.restoreFocus = options.restoreFocus;
      element.setAttribute('restore-focus.bind', 'restoreFocus');
    }
    
    element.setAttribute('host.bind', 'false');
    
    if (options.theme) {
      bindingContext.theme = options.theme;
      element.setAttribute('theme.bind', `theme`);
    }
    const compose = document.createElement('compose');
    compose.setAttribute('view-model.ref', 'composeViewModel');
    element.innerHTML = compose.outerHTML;
    if (!options.host || options.host === 'body') {
      options.host = document.body;
    } else if (typeof options.host === 'string') {
      options.host = document.querySelector(options.host) || document.body;
    }
    options.host.appendChild(element);
    let childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
    
    if (options.viewModel && bindingContext.composeViewModel) {
      bindingContext.composeViewModel.viewModel = options.viewModel;
    }
    if (options.view && bindingContext.composeViewModel) {
      bindingContext.composeViewModel.view = options.view;
    }
    if (options.model && bindingContext.composeViewModel) {
      bindingContext.composeViewModel.model = options.model;
    }

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
      drawer.detached();
      const parent = drawer.element.parentNode;
      if (!parent) { return; }
      parent.removeChild(drawer.element);
      this.eventAggregator.publish(`drawer-${drawerIndex}-resolve`, {
        wasCancelled: true,
        output: null
      });
    }
    bindingContext.ok = (event: CustomEvent) => {
      drawer.detached();
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

  public async callCanDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<boolean> {
    if (layer.bindingContext && layer.bindingContext.composeViewModel && layer.bindingContext.composeViewModel.currentViewModel) {
      const vm = layer.bindingContext.composeViewModel.currentViewModel;
      if (typeof vm.canDeactivate === 'function') {
        try {
          const can = (await vm.canDeactivate.call(vm, result) === false) ? false : true;
          return can;
        } catch (error) {
          return false;
        }
      }
    }
    return true;
  }

  public async callDetached(layer: ModalLayer): Promise<void> {
    if (layer.bindingContext && layer.bindingContext.composeViewModel && layer.bindingContext.composeViewModel.currentViewModel) {
      const vm = layer.bindingContext.composeViewModel.currentViewModel;
      if (typeof vm.detached === 'function') {
        await vm.detached.call(vm);
      }
    }
    return;
  }

  public async callDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<void> {
    if (layer.bindingContext && layer.bindingContext.composeViewModel && layer.bindingContext.composeViewModel.currentViewModel) {
      const vm = layer.bindingContext.composeViewModel.currentViewModel;
      if (typeof vm.deactivate === 'function') {
        await vm.deactivate.call(vm, result);
      }
    }
    return;
  }

  public async cancel(drawer?: UxDrawer) {
    const layer = drawer ? this.getLayer(drawer) : this.getLastLayer();
    if (!layer) return;
    layer.drawer.dismiss();
  }

  public async ok(result?: any, drawer?: UxDrawer) {
    const layer = drawer ? this.getLayer(drawer) : this.getLastLayer();
    if (!layer) return;
    layer.drawer.ok(result);
  }

}
