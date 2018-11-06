import { Container } from 'aurelia-dependency-injection';
import { FrameworkConfiguration, bindingMode, ObserverLocator, InternalPropertyObserver } from 'aurelia-framework';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { UXConfiguration } from './ux-configuration';
import { DesignProcessor } from './designs/design-processor';
export declare type GetElementObserver = (obj: Element, propertyName: string, observerLocator: ObserverLocator, descriptor?: PropertyDescriptor | null) => InternalPropertyObserver | null;
export interface UxElementObserverAdapter {
    tagName: string;
    properties: Record<string, UxElementPropertyObserver>;
}
export interface UxElementPropertyObserver {
    defaultBindingMode: bindingMode;
    getObserver: GetElementObserver;
}
export declare class AureliaUX {
    use: UXConfiguration;
    private designProcessor;
    private observerLocator;
    private availableHosts;
    private adapterCreated;
    private adapters;
    private bindingModeIntercepted;
    host: Host;
    platform: Platform;
    design: Design;
    constructor(use: UXConfiguration, container: Container, designProcessor: DesignProcessor, observerLocator: ObserverLocator);
    private createAdapter;
    private getOrCreateUxElementAdapters;
    private interceptDetermineDefaultBindingMode;
    start(config: FrameworkConfiguration): Promise<this>;
    addUxElementObserverAdapter(tagName: string, properties: Record<string, UxElementPropertyObserver>): void;
    registerUxElementConfig(observerAdapter: UxElementObserverAdapter): void;
}
