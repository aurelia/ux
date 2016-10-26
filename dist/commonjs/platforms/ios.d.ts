import { Platform } from './platform';
import { IOSDesign } from '../designs/ios-design';
export declare class IOS implements Platform {
    design: IOSDesign;
    type: string;
    constructor(design: IOSDesign);
}
