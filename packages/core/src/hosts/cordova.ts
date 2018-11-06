import { Host } from './host';
import { Container, inject } from 'aurelia-dependency-injection';
import { DOM, PLATFORM } from 'aurelia-pal';
import { Platform } from '../platforms/platform';
import { IOS } from '../platforms/ios';
import { Android } from '../platforms/android';

@inject(Container)
export class Cordova implements Host {
  public type = 'cordova';

  constructor(private container: Container) { }

  get isAvailable() {
    return !!PLATFORM.global.cordova;
  }

  public start(): Promise<Platform> {
    return new Promise((resolve) => {
      DOM.addEventListener('deviceready', () => {

        switch (this.getPlatformType()) {
          case 'ios':
            resolve(this.container.get(IOS));
            break;
          default:
            resolve(this.container.get(Android));
            break;
        }
      }, false);
    });
  }

  private getPlatformType() {
    const device = PLATFORM.global.device || { platform: 'android' };
    return device.platform.toLowerCase();
  }
}
