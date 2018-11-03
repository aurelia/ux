import { Host } from './host';
import { Container } from 'aurelia-dependency-injection';
import { Platform } from '../platforms/platform';
export declare class Cordova implements Host {
    private container;
    type: string;
    constructor(container: Container);
    readonly isAvailable: boolean;
    start(): Promise<Platform>;
    private getPlatformType;
}
