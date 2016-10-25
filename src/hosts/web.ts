import {Host} from './host';
import {Design} from '../designs/design';
import {Platform} from '../platforms/platform';
import {inject} from 'aurelia-dependency-injection';
import {MaterialDesign} from '../designs/material-design';

@inject(MaterialDesign)
export class Web implements Host, Platform {
  type = 'web';
  isAvailable = true;

  constructor(public design: MaterialDesign) {}

  start() {
    return Promise.resolve().then(() => this);
  }
}
