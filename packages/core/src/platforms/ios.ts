import { inject } from 'aurelia-dependency-injection';
import { Platform } from './platform';
import { IOSDesign } from '../designs/ios-design';

@inject(IOSDesign)
export class IOS implements Platform {
  public type = 'ios';
  constructor(public design: IOSDesign) { }
}
