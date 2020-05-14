import 'aurelia-polyfills';
import { initialize } from 'aurelia-pal-browser';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { WebpackLoader } from 'aurelia-loader-webpack';
import { UxDefaultModalConfiguration } from '@aurelia-ux/modal';
import { UxPositioningConfiguration } from '@aurelia-ux/positioning';
import icons from './../../packages/icons/sets/full-array.json';
import { UxDefaultSidenavConfiguration } from '../../packages/sidenav/src/ux-default-sidenav-configuration';

async function configure(aurelia: Aurelia): Promise<void> {
  aurelia
    .use
    .developmentLogging()
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/button'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/card'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/checkbox'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/chip-input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/datepicker'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/form'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/grid'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/icons'), { icons: icons })
    .plugin(PLATFORM.moduleName('@aurelia-ux/input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/input-info'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/list'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/modal'), (config: UxDefaultModalConfiguration) => {
      config.position = 'top';
      config.overlayDismiss = true;
    })
    .plugin(PLATFORM.moduleName('@aurelia-ux/positioning'), (config: UxPositioningConfiguration) => {
      config.offsetX = 10;
      config.offsetY = 10;
    })
    .plugin(PLATFORM.moduleName('@aurelia-ux/radio'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/select'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/sidenav'), (config: UxDefaultSidenavConfiguration) => {
      config.modalBreakpoint = 600;
      config.backdrop = false;
      config.over = false;
    })
    .plugin(PLATFORM.moduleName('@aurelia-ux/slider'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/switch'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/textarea'))
    .plugin(PLATFORM.moduleName('aurelia-validation'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'), document.body);
}

(async () => {
  initialize();
  const aurelia = new Aurelia(new WebpackLoader());
  await configure(aurelia);
})();
