import { Host } from './host';
import { Platform } from '../platforms/platform';
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';

@inject(MaterialDesign)
export class Web implements Host, Platform {
  public type = 'web';
  public isAvailable = true;

  constructor(public design: MaterialDesign) { }

  public start(): Promise<Platform> {
    return Promise.resolve().then(() => this);
  }
}
