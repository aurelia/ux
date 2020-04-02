import { EventAggregator } from 'aurelia-event-aggregator';
import { UxModalTheme } from './ux-modal-theme';
import { UxModal } from './ux-modal';
import { ModalPosition, ModalKeybord, DefaultModalConfiguration } from './modal-configuration';
import { inject, Controller, ViewResources } from 'aurelia-framework';
import { CompositionContext, TemplatingEngine, CompositionEngine, ViewSlot, ShadowDOM } from 'aurelia-templating';
import { invokeLifecycle } from './lifecycle';

export interface ModalServiceOptions {
  viewModel?: any;
  view?: any;
  host?: Element| 'body' | string;
  position?: ModalPosition;
  moveToBodyTag?: boolean;
  theme?: UxModalTheme;
  model?: any;
  overlayDismiss?: boolean;
  lock?: boolean;
  keyboard?: ModalKeybord;
  restoreFocus?: (lastActiveElement: HTMLElement) => void;
}

export interface ModalServiceResult {
  wasCancelled: boolean;
  output: any;
}

export interface ModalServiceModal {
  whenClosed: () => Promise<ModalServiceResult>
}

interface ModalBindingContext {
  currentViewModel?: {
    canDeactivate?: (result: any) => any;
    deactivate?: (result: any) => any;
    detached?: (result: any) => any;
  };
  theme?: UxModalTheme;
  keyboard?: ModalKeybord;
  restoreFocus?: (lastActiveElement: HTMLElement) => void;
  host?: HTMLElement;
  dismiss?: () => void;
  ok?: (event: Event) => void;
}

interface ModalLayer {
  bindingContext?: ModalBindingContext;
  modal: UxModal;
}

@inject(TemplatingEngine, CompositionEngine, ViewResources, EventAggregator, DefaultModalConfiguration)
export class ModalService {

  public startingZIndex: number = 200;
  public modalLayers: Array<ModalLayer> = [];
  public modalIndex: number = 0;

  constructor(
    private templatingEngine: TemplatingEngine, 
    private compositionEngine: CompositionEngine,
    private viewResources: ViewResources,
    private eventAggregator: EventAggregator,
    private defaultConfig: DefaultModalConfiguration) {

  }

  public addLayer(modal: UxModal, bindingContext: ModalBindingContext) {
    const layerCount = this.modalLayers.push({
      bindingContext: bindingContext,
      modal: modal
    });
    if (layerCount === 1) {
      this.setKeyListener();
    }
  }

  public getLayer(modal: UxModal): ModalLayer | undefined {
    const index = this.modalLayers.map(i => i.modal).indexOf(modal);
    if (index !== -1) {
      return this.modalLayers[index];
    }
    return undefined;
  }

  public removeLayer(modal: UxModal) {
    const index = this.modalLayers.map(i => i.modal).indexOf(modal);
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
    if (key === undefined) {
      return;
    }
    const activeLayer = this.getLastModal();
    const keyboard = activeLayer.keyboard;
    if (key === 'Escape'
      && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
      activeLayer.dismiss();
    } else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
      activeLayer.ok();
    }
  }

  private getActionKey(event: KeyboardEvent): ModalKeybord | undefined {
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

  public getLastModal(): UxModal {
    return this.getLastLayer().modal;
  }

  public get zIndex() {
    return this.startingZIndex + this.modalLayers.length;
  }

  private createModalElement(options: ModalServiceOptions, bindingContext: ModalBindingContext): HTMLElement {
    const element = document.createElement('ux-modal');
    element.setAttribute('dismiss.trigger', 'dismiss()');
    element.setAttribute('ok.trigger', 'ok($event)');
    if (options.position !== undefined) {
      element.setAttribute('position', options.position);
    }
    if (options.moveToBodyTag === false) {
      element.setAttribute('move-to-body-tag.bind', 'false');
    }
    if (options.overlayDismiss === false) {
      element.setAttribute('overlay-dismiss', 'false');
    }
    if (options.lock === false) {
      element.setAttribute('lock', 'false');
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

    return element;
  }

  private createCompositionContext(
    container: any, // there is a TS error if this is not any ?
    host: Element, 
    bindingContext: ModalBindingContext, 
    settings: {model?: any, view?: any, viewModel?: any},
    slot? : ViewSlot
    ): CompositionContext {
    return {
      container,
      bindingContext: settings.viewModel ? null : bindingContext,
      viewResources: this.viewResources as any, // there is a TS error if this is not any ?
      model: settings.model,
      view: settings.view,
      viewModel: settings.viewModel,
      viewSlot: slot || new ViewSlot(host, true),
      host
    };
  }

  private ensureViewModel(compositionContext: CompositionContext): Promise<CompositionContext> {
    if (compositionContext.viewModel === undefined) {
      return Promise.resolve(compositionContext);
    }
    if (typeof compositionContext.viewModel === 'object') {
      return Promise.resolve(compositionContext);
    }
    return this.compositionEngine.ensureViewModel(compositionContext);
  }

  public async open(options: ModalServiceOptions): Promise<UxModal & ModalServiceModal> {
    options = Object.assign({}, this.defaultConfig, options);
    if (!options.viewModel && !options.view) {
      throw new Error('Invalid modal Settings. You must provide "viewModel", "view" or both.');
    }
    // Each modal has an index to keep track of it
    this.modalIndex++;
    const bindingContext: ModalBindingContext = {};
    const element = this.createModalElement(options, bindingContext);
    
    if (!options.host || options.host === 'body') {
      options.host = document.body;
    } else if (typeof options.host === 'string') {
      options.host = document.querySelector(options.host) || document.body;
    }
    options.host.appendChild(element);
    let childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });

    // We need to get the slot anchor from the modal
    // so that the composed VM/M will be placed in the
    // right place in the DOM once the compositionEngine
    // has finished its work
    let slot: ViewSlot;
    const controllers = (childView as any).controllers as Controller[];
    const modal: UxModal =  controllers[0].viewModel as UxModal;
    try {
      const view: any = controllers[0].view;
      // ShadowDOM.defaultSlotKey refers to the name of the default
      // slot if the view.
      slot = new ViewSlot(view.slots[ShadowDOM.defaultSlotKey].anchor, false);
    } catch (_error) {
      // This catch => throw here might not be necessary
      // in the future once the modal service is finished
      // I have ideas on how to move from here but I would need
      // to fix the composition issue first.
      this.cancelOpening(modal);
      throw new Error('Missing slot in modal');
    }
    slot.attached();

    let compositionContext = this.createCompositionContext(childView.container, element, bindingContext, {
      viewModel: options.viewModel,
      view: options.view,
      model: options.model
    }, slot);

    compositionContext = await this.ensureViewModel(compositionContext);

    try {
      const canActivate = compositionContext.viewModel ? await invokeLifecycle(compositionContext.viewModel, 'canActivate', options.model) : true;
      if (!canActivate) {
        throw new Error('modal cannot be opened');
      }
    } catch (error) {
      this.cancelOpening(modal);
      throw error;
    }

    this.compositionEngine.compose(compositionContext).then((controller) => {
      bindingContext.currentViewModel = (controller as Controller).viewModel;
    });

    const modalIndex = this.modalIndex;
    const whenClosed: Promise<ModalServiceResult> = new Promise((resolve) => {
      this.eventAggregator.subscribeOnce(`modal-${modalIndex}-resolve`, (result: ModalServiceResult) => {
        resolve(result);
      });      
    });

    (modal as UxModal & ModalServiceModal).whenClosed = () => {
      return whenClosed;
    }
    bindingContext.dismiss = () => {
      modal.element.remove();
      modal.detached();
      this.eventAggregator.publish(`modal-${modalIndex}-resolve`, {
        wasCancelled: true,
        output: null
      });
    }
    bindingContext.ok = (event: CustomEvent) => {
      modal.element.remove();
      modal.detached();
      this.eventAggregator.publish(`modal-${modalIndex}-resolve`, {
        wasCancelled: false,
        output: event.detail
      });
    }
    return modal as UxModal & ModalServiceModal;
  }

  private cancelOpening(modal: UxModal) {
    modal.element.remove();
    modal.detached();
  }

  public async callCanDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<boolean> {
    if (layer.bindingContext && layer.bindingContext.currentViewModel) {
      const vm = layer.bindingContext.currentViewModel;
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
    if (layer.bindingContext && layer.bindingContext.currentViewModel) {
      const vm = layer.bindingContext.currentViewModel;
      if (typeof vm.detached === 'function') {
        await vm.detached.call(vm);
      }
    }
    return;
  }

  public async callDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<void> {
    if (layer.bindingContext && layer.bindingContext.currentViewModel) {
      const vm = layer.bindingContext.currentViewModel;
      if (typeof vm.deactivate === 'function') {
        await vm.deactivate.call(vm, result);
      }
    }
    return;
  }

  public async cancel(modal?: UxModal) {
    const layer = modal ? this.getLayer(modal) : this.getLastLayer();
    if (!layer) return;
    await layer.modal.dismiss();
  }

  public async ok(result?: any, modal?: UxModal) {
    const layer = modal ? this.getLayer(modal) : this.getLastLayer();
    if (!layer) return;
    await layer.modal.ok(result);
  }

}
