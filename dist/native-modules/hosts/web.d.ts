import { Host } from './host';
import { Platform } from '../platforms/platform';
import { MaterialDesign } from '../designs/material-design';
export declare class Web implements Host, Platform {
    design: MaterialDesign;
    type: string;
    isAvailable: boolean;
    constructor(design: MaterialDesign);
    start(): Promise<Platform>;
}
