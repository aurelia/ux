import { ViewResources, View } from 'aurelia-templating';
export interface Themable {
    resources: ViewResources;
    view: View;
}
export declare class StyleEngine {
    applyTheme(themable: Themable, theme: any): void;
}
