import { Platform } from './platform';
import { iOSDesign } from '../designs/ios-design';
export declare class iOS implements Platform {
    design: iOSDesign;
    type: string;
    constructor(design: iOSDesign);
}
