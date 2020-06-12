import { UxDefaultSidenavConfiguration } from "../ux-default-sidenav-configuration";
export declare class UxSidenavDrawer {
    element: HTMLElement;
    private defaultConfig;
    constructor(element: HTMLElement, defaultConfig: UxDefaultSidenavConfiguration);
    static OPEN_CHANGED_EVENT: string;
    side: 'left' | 'right' | 'bottom';
    openBoolean: boolean;
    open: boolean | string;
    openChanged(): void;
    over: boolean | string;
    isOver(): boolean;
    backdrop: boolean | string;
    isBackdrop(): boolean;
    toggle(): void;
}
