import { inject } from 'aurelia-dependency-injection';
import { Platform } from './platform';
import { MaterialDesign } from '../designs/material-design';

@inject(MaterialDesign)
export class Android implements Platform {
  public type = 'android';
  constructor(public design: MaterialDesign) { }
}
