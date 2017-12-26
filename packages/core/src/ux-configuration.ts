import { inject } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { Loader } from 'aurelia-loader';
import { PLATFORM } from 'aurelia-pal';
import { GlobalStyleEngine } from './styles/global-style-engine';

@inject(Loader, GlobalStyleEngine)
export class UXConfiguration {
  private logger = getLogger('aurelia-ux');

  constructor(private loader: Loader, private globalStyleEngine: GlobalStyleEngine) { }

  public defaultConfiguration() {
    this.cssReset();
    return this;
  }

  public cssReset() {

    PLATFORM.moduleName('./reset.css');

    this.loader.loadText('@aurelia-ux/core/reset.css')
      .catch(err => {
        this.logger.warn('Aurelia-UX Core failed to load reset.css, some visual errors may appear.', err);
      })
      .then(text => {
        if (text) {
          this.globalStyleEngine.addOrUpdateGlobalStyle('@aurelia-ux/core/reset.css', text);
        }
      });

    return this;
  }
}
