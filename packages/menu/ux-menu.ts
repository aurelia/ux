import {
  inject,
  customElement,
  inlineView,
  ViewCompiler,
  ViewResources,
  processContent,
  ViewSlot,
  View,
  ViewCompileInstruction,
  Scope,
  ViewFactory,
  bindable,
  DOM,
  TaskQueue,
  ElementEvents,
  PLATFORM,
  bindingMode
} from 'aurelia-framework';
import * as VIEW from './ux-menu.html';

@inject(DOM.Element, TaskQueue)
@customElement('ux-menu')
@inlineView(VIEW)
@processContent(processMenuContent)
export class UxMenu {

  private menuFactory: ViewFactory;
  private menu: View | null;
  private menuSlot: ViewSlot;
  private anchor: HTMLElement;
  private shown: boolean;

  // public menuAnchor: { x: number, y: number; width: number; height: number };

  private owner: View;

  public bindingContext: any;
  public overrideContext: Scope;

  @bindable({
    defaultValue: false,
    defaultBindingMode: bindingMode.twoWay
  })
  public open: boolean | string;

  @bindable()
  public trigger: Element | string | null | undefined;

  constructor(
    public element: Element,
    private taskQueue: TaskQueue
  ) {

  }

  public created(owner: View) {
    this.owner = owner;
    this.menuFactory = menuRegistry[this.element.getAttribute(ID_ATTR)!];
  }

  public bind(bindingContext: any, overrideContext: Scope) {
    // this.isBound = true;
    this.bindingContext = bindingContext;
    this.overrideContext = overrideContext;
  }

  public attached() {
    if (!this.menuSlot) {
      const menuAnchor = this.anchor = document.createElement('div');
      menuAnchor.className = 'ux-menu-anchor';
      this.menuSlot = new ViewSlot(document.body.appendChild(menuAnchor), true);
    }
    this.openChanged();
  }

  public detached() {
    this.hide();
  }

  // If it's a string, query
  // If it's an element, use it
  // else use `<ux-menu/>` element
  private getTrigger() {
    let trigger = this.trigger;
    if (typeof trigger === 'string') {
      trigger = document.querySelector(trigger);
    }
    if (!trigger) {
      trigger = this.element;
    }
    return trigger;
  }

  private showAt(anchorTo: Element) {
    const rect = anchorTo.getBoundingClientRect();
    this.taskQueue.queueMicroTask(() => {
      Object.assign(this.anchor.style, {
        left: rect.left + 'px',
        top: rect.top + 'px',
        // width: 0,
        // height: 0,
        // width: rect.width + 'px',
        // height: rect.height + 'px'
      });
      this.anchor.classList.add('active');
      const winEvents = new ElementEvents(PLATFORM.global);
      const onInteract = (e: Event) => {
        if (e.target === PLATFORM.global || !(this.anchor.contains(e.target as Element))) {
          this.hide();
          winEvents.disposeAll();
        }
      };
      winEvents.subscribeOnce('wheel', onInteract, true);
      winEvents.subscribe('mousedown', onInteract, true);
    });
  }

  private get isOpen(): boolean {
    const open = this.open;
    return !!(open || open === '');
  }

  public openChanged() {
    if (this.isOpen) {
      this.show();
    } else {
      this.hide();
    }
  }

  public show() {
    if (this.shown) {
      return;
    }
    this.shown = true;
    let menu = this.menu;
    if (!menu) {
      menu = this.menu = this.menuFactory.create(this.owner.container);
    }
    menu.bind(this.bindingContext, this.overrideContext);
    this.menuSlot.add(menu);
    menu.attached();
    this.showAt(this.getTrigger());
  }

  public hide() {
    const menu = this.menu;
    this.anchor.classList.add('faded');
    setTimeout(() => {
      this.anchor.classList.remove('active', 'faded');
      if (menu) {
        // detached(), unbind() called inside here
        this.menuSlot.remove(menu, true, true);
        this.menu = null;
      }
      this.shown = false;
      this.open = false;
    }, 100);
  }
}

let menuRegistryId = 0;
const menuRegistry: Record<string, ViewFactory> = {};
const nextMenuId = () => '' + ++menuRegistryId;
const ID_ATTR = 'ux-menu-id';

function processMenuContent(
  compiler: ViewCompiler,
  resources: ViewResources,
  node: Element
): boolean {
  const menuItemTemplate = document.createDocumentFragment();
  const menuItemWrapper = menuItemTemplate.appendChild(document.createElement('div'));
  menuItemWrapper.className = 'ux-menu-panel';
  let item = node.firstChild;
  while (item) {
    if (item.nodeName === 'UX-MENUITEM') {
      menuItemWrapper.appendChild(item);
    } else {
      node.removeChild(item);
    }
    item = node.firstChild;
  }
  const menuId = nextMenuId();
  const factory = menuRegistry[menuId] = compiler.compile(menuItemTemplate, resources, ViewCompileInstruction.normal);
  factory.setCacheSize(1, false);
  node.setAttribute(ID_ATTR, menuId);
  return false;
}
