import { InternalPropertyObserver } from 'aurelia-binding';

declare module 'aurelia-binding' {
  class InternalPropertyObserverImpl implements InternalPropertyObserver {
    public getValue(): any;
    public setValue(newValue: any): void;
    public handleEvent(): any;
    public subscribe(callback: (newValue: any, oldValue: any) => void): void;
    public subscribe(context: any, callable: Callable): void;
    public unsubscribe(callback: (newValue: any, oldValue: any) => void): void;
    public unsubscribe(context: any, callable: Callable): void;
  }

  export declare class CheckedObserver extends InternalPropertyObserverImpl {
    constructor(element: Element, handler: ObserverEventHandler, observerLocator: ObserverLocator);
  }
  export declare class ValueAttributeObserver extends InternalPropertyObserverImpl {
    constructor(element: Element, propertyName: string, handler: ObserverEventHandler);
  }
  export declare class SelectValueObserver extends InternalPropertyObserverImpl {
    constructor(element: Element, handler: ObserverEventHandler, observerLocator: ObserverLocator);
  }
}
