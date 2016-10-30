import { ViewResources, View } from 'aurelia-templating';
import { TaskQueue } from 'aurelia-task-queue';
import { Container } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { StyleFactory } from './style-factory';
export interface Themable {
    resources: ViewResources;
    view: View;
}
export declare class StyleEngine {
    private container;
    private taskQueue;
    constructor(container: Container, taskQueue: TaskQueue);
    applyTheme(themable: Themable, theme: string | Object): void;
    getOrCreateStlyeController(view: View, factory: StyleFactory): StyleController;
    renderingInShadowDOM(view: View): boolean;
}
