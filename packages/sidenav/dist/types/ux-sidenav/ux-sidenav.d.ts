import { TaskQueue } from "aurelia-framework";
import { UxSidenavDrawer } from "../ux-sidenav-drawer/ux-sidenav-drawer";
import { UxSidenavTheme } from "./ux-sidenav-theme";
import { StyleEngine } from "@aurelia-ux/core";
import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";
export declare class UxSidenav {
    element: HTMLElement;
    private styleEngine;
    private taskQueue;
    private defaultConfig;
    constructor(element: HTMLElement, styleEngine: StyleEngine, taskQueue: TaskQueue, defaultConfig: UxDefaultSidenavConfiguration);
    backdrop: boolean;
    width: number;
    leftDrawer: UxSidenavDrawer | undefined;
    rightDrawer: UxSidenavDrawer | undefined;
    bottomDrawer: UxSidenavDrawer | undefined;
    private _modalBreakpoint;
    modalBreakpoint: number | string;
    modalBreakpointChanged(): void;
    theme: UxSidenavTheme;
    themeChanged(newValue: UxSidenavTheme): void;
    attached(): void;
    detached(): void;
    leftDrawerOpenChanged: () => void;
    rightDrawerOpenChanged: () => void;
    bottomDrawerOpenChanged: () => void;
    updatePadding(drawer: UxSidenavDrawer): void;
    close(): void;
}
