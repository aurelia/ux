import {
  InternalPropertyObserver
} from 'aurelia-binding';

declare module 'aurelia-binding' {
  // tslint:disable-next-line:no-empty-interface
  export interface CheckedObserver extends InternalPropertyObserver {}

  export interface ValueAttributeObserver extends InternalPropertyObserver {}

  export interface SelectValueObserver extends InternalPropertyObserver {}
}
