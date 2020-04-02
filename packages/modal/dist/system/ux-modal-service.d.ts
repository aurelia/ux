import { EventAggregator } from 'aurelia-event-aggregator';
import { UxModalTheme } from './ux-modal-theme';
import { UxModal } from './ux-modal';
import { ModalPosition, ModalKeybord, DefaultModalConfiguration } from './modal-configuration';
import { ViewResources } from 'aurelia-framework';
import { TemplatingEngine, CompositionEngine } from 'aurelia-templating';
export interface ModalServiceOptions {
    viewModel?: any;
    view?: any;
    host?: Element | 'body' | string;
    position?: ModalPosition;
    moveToBodyTag?: boolean;
    theme?: UxModalTheme;
    model?: any;
    overlayDismiss?: boolean;
    keyboard?: ModalKeybord;
    restoreFocus?: (lastActiveElement: HTMLElement) => void;
}
export interface ModalServiceResult {
    wasCancelled: boolean;
    output: any;
}
export interface ModalServiceModal {
    whenClosed: () => Promise<ModalServiceResult>;
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
export declare class ModalService {
    private templatingEngine;
    private compositionEngine;
    private viewResources;
    private eventAggregator;
    private defaultConfig;
    startingZIndex: number;
    modalLayers: Array<ModalLayer>;
    modalIndex: number;
    constructor(templatingEngine: TemplatingEngine, compositionEngine: CompositionEngine, viewResources: ViewResources, eventAggregator: EventAggregator, defaultConfig: DefaultModalConfiguration);
    addLayer(modal: UxModal, bindingContext: ModalBindingContext): void;
    getLayer(modal: UxModal): ModalLayer | undefined;
    removeLayer(modal: UxModal): void;
    private setKeyListener;
    private removeKeyListener;
    handleEvent(event: KeyboardEvent): void;
    private getActionKey;
    getLastLayer(): ModalLayer;
    getLastModal(): UxModal;
    readonly zIndex: number;
    private createModalElement;
    private createCompositionContext;
    private ensureViewModel;
    open(options: ModalServiceOptions): Promise<UxModal & ModalServiceModal>;
    private cancelOpening;
    callCanDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<boolean>;
    callDetached(layer: ModalLayer): Promise<void>;
    callDeactivate(layer: ModalLayer, result: ModalServiceResult): Promise<void>;
    cancel(modal?: UxModal): Promise<void>;
    ok(result?: any, modal?: UxModal): Promise<void>;
}
export {};
