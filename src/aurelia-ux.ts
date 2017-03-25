import {Container, inject} from 'aurelia-dependency-injection';
import {Design} from './designs/design';
import {Host} from './hosts/host';
import {Platform} from './platforms/platform';
import {Cordova} from './hosts/cordova';
import {Web} from './hosts/web';
import {Electron} from './hosts/electron';
import {UXConfiguration} from './ux-configuration';
import {FrameworkConfiguration} from 'aurelia-framework';

@inject(UXConfiguration, Container)
export class AureliaUX {
  private availableHosts: Host[];

  public host: Host;
  public platform: Platform;
  public design: Design;

  constructor(public use: UXConfiguration, container: Container) {
    this.availableHosts = [
      container.get(Cordova),
      container.get(Electron),
      container.get(Web)
    ];
  }

  public start(config: FrameworkConfiguration) {
    const found = this.availableHosts.find(x => x.isAvailable);

    if (found === undefined) {
      throw new Error('Could not determine host environment');
    }

    this.host = found;

    return this.host.start(config).then(platform => {
      this.platform = platform;
      this.design = platform.design;
    });
  }
}
