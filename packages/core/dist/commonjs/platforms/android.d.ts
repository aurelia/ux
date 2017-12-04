import { Platform } from './platform';
import { MaterialDesign } from '../designs/material-design';
export declare class Android implements Platform {
    design: MaterialDesign;
    type: string;
    constructor(design: MaterialDesign);
}
