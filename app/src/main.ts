import 'aurelia-polyfills';
import { initialize } from 'aurelia-pal-browser';
import { Aurelia, PLATFORM } from 'aurelia-framework';
import { WebpackLoader } from 'aurelia-loader-webpack';
// import { ConsoleAppender } from 'aurelia-logging-console';
// import {} from 'aureliatemp'

async function configure(aurelia: Aurelia): Promise<void> {
  aurelia
    .use
    .developmentLogging()
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/button'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/textarea'))

  await aurelia.start()
  await aurelia.setRoot(PLATFORM.moduleName('app'), document.body)
};

(async () => {
  initialize();
  const aurelia = new Aurelia(new WebpackLoader());
  await configure(aurelia);
})();
