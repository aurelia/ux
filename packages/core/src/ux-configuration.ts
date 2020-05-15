import { inject } from 'aurelia-dependency-injection';
import { getLogger } from 'aurelia-logging';
import { Loader } from 'aurelia-loader';
import { GlobalStyleEngine } from './styles/global-style-engine';
import './styles/normalize.css';

@inject(Loader, GlobalStyleEngine)
export class UXConfiguration {
  private logger = getLogger('aurelia-ux');

  constructor(private loader: Loader, private globalStyleEngine: GlobalStyleEngine) { }

  public defaultConfiguration() {
    return this;
  }
}
