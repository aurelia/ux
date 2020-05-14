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
    this.cssNormalize();
    return this;
  }

  public cssNormalize() {
    PLATFORM.moduleName('!css-loader!./styles/normalize.css');
    const fullCssPath = '@aurelia-ux/core/styles/normalize.css';
    this
      .loader
      .loadText(fullCssPath)
      .catch(err => {
        this.logger.warn('Aurelia-UX Core failed to load normalize.css, some visual errors may appear.', err);
      })
      .then(text => {
        if (text && typeof (text) === 'string') {
          this.globalStyleEngine.addOrUpdateGlobalStyle(fullCssPath, text);
        }
      });

    return this;
  }
}
