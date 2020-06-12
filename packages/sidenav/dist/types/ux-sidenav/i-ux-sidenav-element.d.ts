import { IController } from '@aurelia-ux/core';
import { UxSidenav } from "./ux-sidenav";
export interface IUxSidenavElement extends HTMLElement {
    au: {
        controller: IController<UxSidenav>;
        'ux-sidenav': IController<UxSidenav>;
    };
}
