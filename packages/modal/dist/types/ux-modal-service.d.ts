import { EventAggregator } from 'aurelia-event-aggregator';
import { UxModalTheme } from './ux-modal-theme';
import { UxModal } from './ux-modal';
import { UxModalPosition, UxModalKeybord, UxDefaultModalConfiguration } from './ux-modal-configuration';
import { ViewResources } from 'aurelia-framework';
import { TemplatingEngine, CompositionEngine } from 'aurelia-templating';
export interface UxModalServiceOptions {
    viewModel?: any;
    view?: any;
    host?: Element | 'body' | string;
    position?: UxModalPosition;
    moveToBodyTag?: boolean;
    theme?: UxModalTheme;
    model?: any;
    overlayDismiss?: boolean;
    outsideDismiss?: boolean;
    lock?: boolean;
    keyboard?: UxModalKeybord;
    modalBreakpoint?: number;
    restoreFocus?: (lastActiveElement: HTMLElement) => void;
    openingCallback?: (contentWrapperElement?: HTMLElement, overlayElement?: HTMLElement) => void;
}
export interface UxModalServiceResult {
    wasCancelled: boolean;
    output: any;
}
export interface UxModalServiceModal {
    whenClosed: () => Promise<UxModalServiceResult>;
}
export interface ModalAnchorPositionOptions {
    offsetX?: number;
    offsetY?: number;
    preferedPosition?: 'bottom' | 'top' | 'left' | 'right';
}
interface UxModalBindingContext {
    currentViewModel?: {
        canDeactivate?: (result: any) => any;
        deactivate?: (result: any) => any;
        detached?: (result: any) => any;
    };
    theme?: UxModalTheme;
    keyboard?: UxModalKeybord;
    restoreFocus?: (lastActiveElement: HTMLElement) => void;
    openingCallback?: (contentWrapperElement?: HTMLElement, overlayElement?: HTMLElement) => void;
    host?: HTMLElement;
    dismiss?: () => void;
    ok?: (event: Event) => void;
}
interface UxModalLayer {
    bindingContext?: UxModalBindingContext;
    modal: UxModal;
}
export declare class UxModalService {
    private templatingEngine;
    private compositionEngine;
    private viewResources;
    private eventAggregator;
    private defaultConfig;
    startingZIndex: number;
    modalLayers: Array<UxModalLayer>;
    modalIndex: number;
    constructor(templatingEngine: TemplatingEngine, compositionEngine: CompositionEngine, viewResources: ViewResources, eventAggregator: EventAggregator, defaultConfig: UxDefaultModalConfiguration);
    addLayer(modal: UxModal, bindingContext: UxModalBindingContext): void;
    getLayer(modal: UxModal): UxModalLayer | undefined;
    removeLayer(modal: UxModal): void;
    private setListener;
    private removeListener;
    handleEvent(event: KeyboardEvent | MouseEvent): void;
    private handleKeyEvent;
    private handleDocumentClick;
    private getActionKey;
    getLastLayer(): UxModalLayer | null;
    getLastModal(): UxModal | null;
    get zIndex(): number;
    private createModalElement;
    private createCompositionContext;
    private ensureViewModel;
    open(options: UxModalServiceOptions): Promise<UxModal & UxModalServiceModal>;
    private cancelOpening;
    callCanDeactivate(layer: UxModalLayer, result: UxModalServiceResult): Promise<boolean>;
    callDetached(layer: UxModalLayer): Promise<void>;
    callDeactivate(layer: UxModalLayer, result: UxModalServiceResult): Promise<void>;
    cancel(modal?: UxModal): Promise<void>;
    ok(result?: any, modal?: UxModal): Promise<void>;
}
export {};
