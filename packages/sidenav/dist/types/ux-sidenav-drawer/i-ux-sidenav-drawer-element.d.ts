import { IController } from '@aurelia-ux/core';
import { UxSidenavDrawer } from "./ux-sidenav-drawer";
export interface IUxSidenavDrawerElement extends HTMLElement {
    au: {
        controller: IController<UxSidenavDrawer>;
        'ux-sidenav-drawer': IController<UxSidenavDrawer>;
    };
}
