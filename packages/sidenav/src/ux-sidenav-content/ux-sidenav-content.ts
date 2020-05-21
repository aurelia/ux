import { useView, customElement, PLATFORM, inject } from "aurelia-framework";

@inject(Element)
@customElement('ux-sidenav-content')
@useView(PLATFORM.moduleName('./ux-sidenav-content.html'))
export class UxSidenavContent {
  constructor(public element: HTMLElement) { }
}
