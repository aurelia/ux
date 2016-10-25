import {Container, inject} from 'aurelia-dependency-injection';
import {Design} from './designs/design';
import {Host} from './hosts/host';
import {Platform} from './platforms/platform';
import {observable} from 'aurelia-binding';
import {Cordova} from './hosts/cordova';
import {Web} from './hosts/web';
import {XpConfiguration} from './xp-configuration';

@inject(XpConfiguration, Container)
export class AureliaXP {
  host: Host;
  availableHosts: Host[];
  @observable platform: Platform;
  @observable design: Design;

  constructor(public use: XpConfiguration, private container: Container){
    this.availableHosts = [
      container.get(Cordova),
      container.get(Web)
    ];
  }

  private platformChanged(platform: Platform) {
    this.design = platform.design;
  }

  start(host?: string | Host) {
    if (typeof host === 'string') {
      this.host = this.availableHosts.find(x => x.type === host);
    } else if (!host) {
      this.host = this.availableHosts.find(x => x.isAvailable);
    } else {
      this.host = host;
    }

    return this.host.start().then(platform => {
      this.platform = platform;
    });
  }
}
