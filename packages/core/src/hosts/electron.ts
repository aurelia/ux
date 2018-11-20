import { Host } from './host';
import { Platform } from '../platforms/platform';
import { inject } from 'aurelia-dependency-injection';
import { MaterialDesign } from '../designs/material-design';
import { FrameworkConfiguration } from 'aurelia-framework';
import { Web } from './web';
import { PLATFORM } from 'aurelia-pal';

@inject(MaterialDesign)
export class Electron implements Host {
  public type = 'electron';

  public get isAvailable() {
    const p = PLATFORM.global.process;
    return p && p.versions && p.versions.electron;
  }

  public start(config: FrameworkConfiguration): Promise<Platform> {
    return Promise.resolve().then(() => config.container.get(Web));
  }
}
