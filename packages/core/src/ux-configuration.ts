import { inject } from 'aurelia-dependency-injection';
import { Loader } from 'aurelia-loader';
import { GlobalStyleEngine } from './styles/global-style-engine';
import './styles/normalize.css';

@inject(Loader, GlobalStyleEngine)
export class UXConfiguration {
  public defaultConfiguration() {
    return this;
  }
}
