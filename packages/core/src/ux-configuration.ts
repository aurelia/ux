import { inject } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { Loader } from 'aurelia-loader';
import { DOM } from 'aurelia-pal';

@inject(Loader)
export class UXConfiguration {
  private logger = getLogger('aurelia-ux');

  constructor(private loader: Loader) { }

  public defaultConfiguration() {
    this.cssReset();
    return this;
  }

  public cssReset() {
    this.loader.loadText('@aurelia-ux/core/reset.css')
      .catch(err => {
        this.logger.warn('Aurelia-UX Core failed to load reset.css, some visual errors may appear.', err);
      })
      .then(text => {
        if (text) {
          DOM.injectStyles(text);
        }
      });

    return this;
  }
}
