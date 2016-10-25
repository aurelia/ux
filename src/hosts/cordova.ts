import {Host} from './host';
import {Design} from '../designs/design';
import {Platform} from '../platforms/platform';
import {Container, inject} from 'aurelia-dependency-injection';
import {DOM, PLATFORM} from 'aurelia-pal';
import {iOS} from '../platforms/ios';
import {Android} from '../platforms/android';

@inject(Container)
export class Cordova implements Host {
  type = 'cordova';

  constructor(private container: Container) {}

  get isAvailable() {
    return !!PLATFORM.global.cordova;
  }

  start() {
    return new Promise((resolve, reject) => {
      DOM.addEventListener('deviceready', () => {

        switch(this.getPlatformType()) {
          case 'ios':
            resolve(this.container.get(iOS));
            break;
          default:
            resolve(this.container.get(Android));
            break;
        }
      }, false);
    });
  }

  private getPlatformType() {
    let device = PLATFORM.global.device || {platform:'android'};
    return device.platform.toLowerCase()
  }
}
