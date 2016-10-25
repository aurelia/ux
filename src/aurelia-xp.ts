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
  public host: Host;
  public availableHosts: Host[];
  @observable public platform: Platform;
  @observable public design: Design;

  constructor(public use: XpConfiguration, container: Container){
    this.availableHosts = [
      container.get(Cordova),
      container.get(Web)
    ];
  }

  public platformChanged(platform: Platform) {
    this.design = platform.design;
  }

  public start(host?: string | Host) {
    let found: Host | undefined;

    if (typeof host === 'string') {
      found = this.availableHosts.find(x => x.type === host);
    } else if (!host) {
      found = this.availableHosts.find(x => x.isAvailable);
    } else {
      found = host;
    }

    if (found === undefined) {
      throw new Error('Could not determine host environment');
    }

    this.host = found;

    return this.host.start().then(platform => {
      this.platform = platform;
    });
  }
}
