var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EventAggregator } from 'aurelia-event-aggregator';
import { DefaultModalConfiguration } from './modal-configuration';
import { inject, ViewResources } from 'aurelia-framework';
import { TemplatingEngine, CompositionEngine, ViewSlot, ShadowDOM } from 'aurelia-templating';
import { invokeLifecycle } from './lifecycle';
let ModalService = class ModalService {
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
            bindingContext: bindingContext,
            modal: modal
        });
        if (layerCount === 1) {
            this.setKeyListener();
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
            this.removeKeyListener();
        }
    }
    setKeyListener() {
        window.addEventListener('keyup', this);
    }
    removeKeyListener() {
        window.removeEventListener('keyup', this);
    }
    handleEvent(event) {
        const key = this.getActionKey(event);
        if (key === undefined) {
            return;
        }
        const activeLayer = this.getLastModal();
        const keyboard = activeLayer.keyboard;
        if (key === 'Escape'
            && (keyboard === true || keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            activeLayer.dismiss();
        }
        else if (key === 'Enter' && (keyboard === key || (Array.isArray(keyboard) && keyboard.indexOf(key) > -1))) {
            activeLayer.ok();
        }
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
        return this.modalLayers[this.modalLayers.length - 1];
    }
    getLastModal() {
        return this.getLastLayer().modal;
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
            let childView = this.templatingEngine.enhance({ element: element, bindingContext: bindingContext });
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
            catch (_error) {
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
            if (!layer)
                return;
            yield layer.modal.dismiss();
        });
    }
    ok(result, modal) {
        return __awaiter(this, void 0, void 0, function* () {
            const layer = modal ? this.getLayer(modal) : this.getLastLayer();
            if (!layer)
                return;
            yield layer.modal.ok(result);
        });
    }
};
ModalService = __decorate([
    inject(TemplatingEngine, CompositionEngine, ViewResources, EventAggregator, DefaultModalConfiguration)
], ModalService);
export { ModalService };
