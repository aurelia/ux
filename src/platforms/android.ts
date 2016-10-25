import {Container, inject} from 'aurelia-dependency-injection';
import {Platform} from './platform';
import {Design} from '../designs/design';
import {MaterialDesign} from '../designs/material-design';

@inject(MaterialDesign)
export class Android implements Platform {
  type = 'android';
  constructor(public design: MaterialDesign) {}
}
