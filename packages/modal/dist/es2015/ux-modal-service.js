import { __awaiter, __decorate } from "tslib";
import { EventAggregator } from 'aurelia-event-aggregator';
import { UxDefaultModalConfiguration } from './ux-modal-configuration';
import { inject, ViewResources } from 'aurelia-framework';
import { TemplatingEngine, CompositionEngine, ViewSlot, ShadowDOM } from 'aurelia-templating';
import { invokeLifecycle } from './lifecycle';
let UxModalService = /** @class */ (() => {
    let UxModalService = class UxModalService {
        constructor(templatingEngine, compositionEngine, viewResources, eventAggregator, defaultConfig) {
            this.templatingEngine = templatingEngine;
            this.compositionEngine = compositionEngine;
            this.viewResources = viewResources;
            this.eventAggregator = eventAggregator;
            this.defaultConfig = defaultConfig;
            this.startingZIndex = 200;
            this.modalLayers = [];
            this.modalIndex = 0;
        }
        addLayer(modal, bindingContext) {
            const layerCount = this.modalLayers.push({
                bindingContext,
                modal
            });
            if (layerCount === 1) {
                this.setListener();
            }
        }
        getLayer(modal) {
            const index = this.modalLayers.map(i => i.modal).indexOf(modal);
            if (index !== -1) {
                return this.modalLayers[index];
            }
            return undefined;
        }
        removeLayer(modal) {
            const index = this.modalLayers.map(i => i.modal).indexOf(modal);
            if (index !== -1) {
                this.modalLayers.splice(index, 1);
            }
            if (this.modalLayers.length === 0) {
                this.removeListener();
            }
        }
        setListener() {
            document.addEventListener('keyup', this);
            document.addEventListener('click', this);
        }
        removeListener() {
            document.removeEventListener('keyup', this);
            document.removeEventListener('click', this);
        }
        handleEvent(event) {
            if (event instanceof KeyboardEvent) {
                this.handleKeyEvent(event);
            }
            else {
                this.handleDocumentClick(event);
            }
        }
        handleKeyEvent(event) {
            const key = this.getActionKey(event);
            if (key === undefined) {
                return;
            }
            const activeLayer = this.getLastModal();
            if (activeLayer === null) {
                return;
            }
            const keyboard = activeLayer.keyboard;
            if (key === 'Escape'
                && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                activeLayer.dismiss();
            }
            else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
                activeLayer.ok();
            }
        }
        handleDocumentClick(event) {
            // the purpose of this handler is to close all modals that are
            // - not locked
            // - have outsideDismiss === true
            // - placed above the last locked layer
            // - and if the click is outside the modal
            let concernedLayers = [];
            for (const layer of this.modalLayers) {
                if (layer.modal.lock || !layer.modal.outsideDismiss) {
                    concernedLayers = [];
                    continue; // we ignore locks
                }
                concernedLayers.push(layer);
            }
            // now we have all the layers above the last locked in the concernedLayers array
            // let's check if the click is outside of any
            layerloop: for (const layer of concernedLayers) {
                const modalContentElement = layer.modal.contentElement;
                for (const element of event.composedPath()) {
                    if (element === modalContentElement) {
                        continue layerloop; // click is on the modal, do not hide
                    }
                }
                layer.modal.dismiss();
            }
            return true; // this allow normal behvior with this click for other purposes
        }
        getActionKey(event) {
            if ((event.code || event.key) === 'Escape' || event.keyCode === 27) {
                return 'Escape';
            }
            if ((event.code || event.key) === 'Enter' || event.keyCode === 13) {
                return 'Enter';
            }
            return undefined;
        }
        getLastLayer() {
            return this.modalLayers.length > 0 ? this.modalLayers[this.modalLayers.length - 1] : null;
        }
        getLastModal() {
            const lastLayer = this.getLastLayer();
            return lastLayer !== null ? lastLayer.modal : null;
        }
        get zIndex() {
            return this.startingZIndex + this.modalLayers.length;
        }
        createModalElement(options, bindingContext) {
            const element = document.createElement('ux-modal');
            element.setAttribute('dismiss.trigger', 'dismiss()');
            element.setAttribute('ok.trigger', 'ok($event)');
            if (options.position !== undefined) {
                element.setAttribute('position', options.position);
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
            if (typeof options.modalBreakpoint === 'number') {
                element.setAttribute('modal-breakpoint.bind', `${options.modalBreakpoint}`);
            }
            element.setAttribute('host.bind', 'false');
            if (options.theme) {
                bindingContext.theme = options.theme;
                element.setAttribute('theme.bind', `theme`);
            }
            return element;
        }
        createCompositionContext(container, // there is a TS error if this is not any ?
        host, bindingContext, settings, slot) {
            return {
                container,
                bindingContext: settings.viewModel ? null : bindingContext,
                viewResources: this.viewResources,
                model: settings.model,
                view: settings.view,
                viewModel: settings.viewModel,
                viewSlot: slot || new ViewSlot(host, true),
                host
            };
        }
        ensureViewModel(compositionContext) {
            if (compositionContext.viewModel === undefined) {
                return Promise.resolve(compositionContext);
            }
            if (typeof compositionContext.viewModel === 'object') {
                return Promise.resolve(compositionContext);
            }
            return this.compositionEngine.ensureViewModel(compositionContext);
        }
        open(options) {
            return __awaiter(this, void 0, void 0, function* () {
                // tslint:disable-next-line: prefer-object-spread
                options = Object.assign({}, this.defaultConfig, options);
                if (!options.viewModel && !options.view) {
                    throw new Error('Invalid modal Settings. You must provide "viewModel", "view" or both.');
                }
                // Each modal has an index to keep track of it
                this.modalIndex++;
                const bindingContext = {};
                const element = this.createModalElement(options, bindingContext);
                if (!options.host || options.host === 'body') {
                    options.host = document.body;
                }
                else if (typeof options.host === 'string') {
                    options.host = document.querySelector(options.host) || document.body;
                }
                options.host.appendChild(element);
                const childView = this.templatingEngine.enhance({ element, bindingContext });
                // We need to get the slot anchor from the modal
                // so that the composed VM/M will be placed in the
                // right place in the DOM once the compositionEngine
                // has finished its work
                let slot;
                const controllers = childView.controllers;
                const modal = controllers[0].viewModel;
                try {
                    const view = controllers[0].view;
                    // ShadowDOM.defaultSlotKey refers to the name of the default
                    // slot if the view.
                    slot = new ViewSlot(view.slots[ShadowDOM.defaultSlotKey].anchor, false);
                }
                catch (error) {
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
                compositionContext = yield this.ensureViewModel(compositionContext);
                try {
                    const canActivate = compositionContext.viewModel ? yield invokeLifecycle(compositionContext.viewModel, 'canActivate', options.model) : true;
                    if (!canActivate) {
                        throw new Error('modal cannot be opened');
                    }
                }
                catch (error) {
                    this.cancelOpening(modal);
                    throw error;
                }
                this.compositionEngine.compose(compositionContext).then((controller) => {
                    bindingContext.currentViewModel = controller.viewModel;
                });
                const modalIndex = this.modalIndex;
                const whenClosed = new Promise((resolve) => {
                    this.eventAggregator.subscribeOnce(`modal-${modalIndex}-resolve`, (result) => {
                        resolve(result);
                    });
                });
                modal.whenClosed = () => {
                    return whenClosed;
                };
                bindingContext.dismiss = () => {
                    modal.element.remove();
                    modal.detached();
                    this.eventAggregator.publish(`modal-${modalIndex}-resolve`, {
                        wasCancelled: true,
                        output: null
                    });
                };
                bindingContext.ok = (event) => {
                    modal.element.remove();
                    modal.detached();
                    this.eventAggregator.publish(`modal-${modalIndex}-resolve`, {
                        wasCancelled: false,
                        output: event.detail
                    });
                };
                return modal;
            });
        }
        cancelOpening(modal) {
            modal.element.remove();
            modal.detached();
        }
        callCanDeactivate(layer, result) {
            return __awaiter(this, void 0, void 0, function* () {
                if (layer.bindingContext && layer.bindingContext.currentViewModel) {
                    const vm = layer.bindingContext.currentViewModel;
                    if (typeof vm.canDeactivate === 'function') {
                        try {
                            const can = ((yield vm.canDeactivate.call(vm, result)) === false) ? false : true;
                            return can;
                        }
                        catch (error) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        callDetached(layer) {
            return __awaiter(this, void 0, void 0, function* () {
                if (layer.bindingContext && layer.bindingContext.currentViewModel) {
                    const vm = layer.bindingContext.currentViewModel;
                    if (typeof vm.detached === 'function') {
                        yield vm.detached.call(vm);
                    }
                }
                return;
            });
        }
        callDeactivate(layer, result) {
            return __awaiter(this, void 0, void 0, function* () {
                if (layer.bindingContext && layer.bindingContext.currentViewModel) {
                    const vm = layer.bindingContext.currentViewModel;
                    if (typeof vm.deactivate === 'function') {
                        yield vm.deactivate.call(vm, result);
                    }
                }
                return;
            });
        }
        cancel(modal) {
            return __awaiter(this, void 0, void 0, function* () {
                const layer = modal ? this.getLayer(modal) : this.getLastLayer();
                if (!layer) {
                    return;
                }
                yield layer.modal.dismiss();
            });
        }
        ok(result, modal) {
            return __awaiter(this, void 0, void 0, function* () {
                const layer = modal ? this.getLayer(modal) : this.getLastLayer();
                if (!layer) {
                    return;
                }
                yield layer.modal.ok(result);
            });
        }
    };
    UxModalService = __decorate([
        inject(TemplatingEngine, CompositionEngine, ViewResources, EventAggregator, UxDefaultModalConfiguration)
    ], UxModalService);
    return UxModalService;
})();
export { UxModalService };
//# sourceMappingURL=ux-modal-service.js.map