import { Container } from 'aurelia-dependency-injection';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { XpConfiguration } from './xp-configuration';
import { FrameworkConfiguration } from 'aurelia-framework';
export declare class AureliaXP {
    use: XpConfiguration;
    private availableHosts;
    host: Host;
    platform: Platform;
    design: Design;
    constructor(use: XpConfiguration, container: Container);
    start(config: FrameworkConfiguration): Promise<void>;
}
