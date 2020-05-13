import { Host } from './host';
import { Platform } from '../platforms/platform';
import { FrameworkConfiguration } from 'aurelia-framework';
export declare class Electron implements Host {
    type: string;
    get isAvailable(): any;
    start(config: FrameworkConfiguration): Promise<Platform>;
}
