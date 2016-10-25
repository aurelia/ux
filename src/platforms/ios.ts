import {Container, inject} from 'aurelia-dependency-injection';
import {Platform} from './platform';
import {Design} from '../designs/design';
import {iOSDesign} from '../designs/ios-design';

@inject(iOSDesign)
export class iOS implements Platform {
  type = 'ios';
  constructor(public design: iOSDesign) {}
}
