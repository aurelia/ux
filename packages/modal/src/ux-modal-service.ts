import { EventAggregator } from 'aurelia-event-aggregator';
import { UxModalTheme } from './ux-modal-theme';
import { UxModal } from './ux-modal';
import { ModalPosition, ModalKeybord, DefaultModalConfiguration } from './modal-configuration';
import { inject, Container, Controller, ViewResources, TaskQueue } from 'aurelia-framework';
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
  outsideDismiss?: boolean;
  lock?: boolean;
  keyboard?: ModalKeybord;
  restoreFocus?: (lastActiveElement: HTMLElement) => void;
  openingCallback?: (contentWrapperElement?: HTMLElement, overlayElement?: HTMLElement) => void;
}

export interface ModalServiceResult {
  wasCancelled: boolean;
  output: any;
}

export interface ModalServiceModal {
  whenClosed: () => Promise<ModalServiceResult>
}

export interface ModalAnchorPositionOptions {
  offsetX?: number;
  offsetY?: number;
  preferedPosition?: 'bottom' | 'top' | 'left' | 'right';
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
  openingCallback?: (contentWrapperElement?: HTMLElement, overlayElement?: HTMLElement) => void;
  host?: HTMLElement;
  dismiss?: () => void;
  ok?: (event: Event) => void;
}

interface ModalLayer {
  bindingContext?: ModalBindingContext;
  modal: UxModal;
}

@inject(Container, TemplatingEngine, CompositionEngine, ViewResources, EventAggregator, DefaultModalConfiguration)
export class ModalService {

  public startingZIndex: number = 200;
  public modalLayers: Array<ModalLayer> = [];
  public modalIndex: number = 0;

  private handleDocumentClick: (event: Event) => void;

  constructor(
    private container: Container, 
    private templatingEngine: TemplatingEngine, 
    private compositionEngine: CompositionEngine,
    private viewResources: ViewResources,
    private eventAggregator: EventAggregator,
    private defaultConfig: DefaultModalConfiguration) {
    this.handleDocumentClick = (event: Event) => {
      // the purpose of this handler is to close all modals that are
      // - not locked
      // - have outsideDismiss === true
      // - placed above the last locked layer
      // - and if the click is outside the modal
      let concernedLayers: Array<ModalLayer> = [];
      for (let layer of this.modalLayers) {
        if (layer.modal.lock || !layer.modal.outsideDismiss) {
          concernedLayers = [];
          continue; // we ignore locks
        }
        concernedLayers.push(layer);
      }
      // now we have all the layers above the last locked in the concernedLayers array
      // let's check if the click is outside of any
      layerloop: for (let layer of concernedLayers) {
        const modalContentElement = layer.modal.contentElement;
        for (let element of (event as any).composedPath() ) {
          if (element === modalContentElement) {
            continue layerloop; // click is on the modal, do not hide
          }
        }
        layer.modal.dismiss();
      }
      return true; // this allow normal behvior with this click for other purposes
    };
  }

  public addLayer(modal: UxModal, bindingContext: ModalBindingContext) {
    const layerCount = this.modalLayers.push({
      bindingContext: bindingContext,
      modal: modal
    });
    if (layerCount === 1) {
      this.setListener();
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
      this.removeListener();
    }
  }

  private setListener() {
    window.addEventListener('keyup', this);
    document.addEventListener('click', this.handleDocumentClick);
  }

  private removeListener() {
    window.removeEventListener('keyup', this);
    document.removeEventListener('click', this.handleDocumentClick);
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
      element.setAttribute('overlay-dismiss.bind', 'false');
    }
    if (options.outsideDismiss === false) {
      element.setAttribute('outside-dismiss.bind', 'false');
    }
    if (options.lock === false) {
      element.setAttribute('lock.bind', 'false');
    }
    if (options.keyboard !== undefined) {
      bindingContext.keyboard = options.keyboard;
      element.setAttribute('keyboard.bind', 'keyboard');
    }
    if (typeof options.restoreFocus === 'function') {
      bindingContext.restoreFocus = options.restoreFocus;
      element.setAttribute('restore-focus.bind', 'restoreFocus');
    }
    if (typeof options.openingCallback === 'function') {
      bindingContext.openingCallback = options.openingCallback;
      element.setAttribute('opening-callback.bind', 'openingCallback');
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

  public positionModalWithAnchor(anchor: HTMLElement, contentWrapperElement: HTMLElement, options?: ModalAnchorPositionOptions) {
    // We use queueTask here because queueMicroTask
    // resolves too early
    const contentElement = contentWrapperElement.querySelector('.ux-modal__content') as HTMLElement;
    contentElement.style.top = `0`;
    contentElement.style.left = `0`;
    contentElement.style.right = `auto`;
    contentElement.style.bottom = `auto`;

    this.container.get(TaskQueue).queueTask(() => {
      const anchorRect = anchor.getBoundingClientRect();
      const contentWrapperRect = contentWrapperElement.getBoundingClientRect();
    
      const offsetY = (options && options.offsetY) ? options.offsetY : 0;
      const offsetX = (options && options.offsetX) ? options.offsetX : 0;
      const originalTop = anchorRect.top - contentWrapperRect.top + offsetX;
      const originalLeft = anchorRect.left - contentWrapperRect.left + offsetY;
       
      if (contentElement.offsetWidth > window.innerWidth) {
        contentElement.style.width = `${window.innerWidth}px`;
      }
      if (contentElement.offsetHeight > window.innerHeight) {
        contentElement.style.height = `${window.innerHeight}px`;
      }
    
      let positions = ['bottom', 'top', 'left', 'right', 'full'];
      if (options && options.preferedPosition) {
        positions.splice(positions.indexOf(options.preferedPosition), 1)
        positions.unshift(options.preferedPosition);
      }
    
      let modalTop = originalTop;
      let modalLeft = originalLeft;
    
      for (let position of positions) {
        modalTop = originalTop;
        modalLeft = originalLeft;
        if (position === 'bottom') {
          modalTop += anchorRect.height;
          if (modalTop + contentElement.offsetHeight < window.innerHeight - window.scrollY) {
            // we have enough height !
            const rightDiff = modalLeft + contentElement.offsetWidth - window.innerWidth - window.scrollX;
            if (rightDiff > 0) {
              modalLeft -= rightDiff;
            }
            break;
          }
        }
        if (position === 'top') {
          modalTop -= contentElement.offsetHeight;
          if (modalTop > window.scrollY) {
            // we have enough height !
            const rightDiff = modalLeft + contentElement.offsetWidth - window.innerWidth - window.scrollX;
            if (rightDiff > 0) {
              modalLeft -= rightDiff;
            }
            break;
          }
        }
        if (position === 'left') {
          modalLeft -= contentElement.offsetWidth;
          if (modalLeft > 0) {
            // we have enough width !
            modalTop = modalTop + (anchorRect.height / 2) - (contentElement.offsetHeight / 2);
            const topDiff = modalTop + contentElement.offsetHeight - window.innerHeight - window.scrollY;
            if (topDiff > 0) {
              modalTop -= topDiff;
            }
            break;
          }
        }
        if (position === 'right') {
          modalLeft += anchorRect.width;
          if (modalLeft + contentElement.offsetWidth < window.innerWidth) {
            // we have enough height !
            modalTop = modalTop + (anchorRect.height / 2) - (contentElement.offsetHeight / 2);
            const topDiff = modalTop + contentElement.offsetHeight - window.innerHeight - window.scrollY;
            if (topDiff > 0) {
              modalTop -= topDiff;
            }
            break;
          }
        }
        if (position === 'full') {
          modalTop = 0;
          modalLeft = 0;
          contentElement.style.width = `${window.innerWidth}px`;
          contentElement.style.height = `${window.innerHeight}px`;
        }
      }
    
      contentElement.style.top = `${modalTop}px`;
      contentElement.style.left = `${modalLeft}px`;
      contentElement.style.right = `auto`;
      contentElement.style.bottom = `auto`;
    });
  }
  

}
