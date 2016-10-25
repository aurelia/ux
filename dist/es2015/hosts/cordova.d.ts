import { Host } from './host';
import { Container } from 'aurelia-dependency-injection';
export declare class Cordova implements Host {
    private container;
    type: string;
    constructor(container: Container);
    readonly isAvailable: boolean;
    start(): Promise<{}>;
    private getPlatformType();
}
