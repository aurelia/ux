import { Container } from 'aurelia-dependency-injection';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { UXConfiguration } from './ux-configuration';
import { FrameworkConfiguration } from 'aurelia-framework';
export declare class AureliaUX {
    use: UXConfiguration;
    private availableHosts;
    host: Host;
    platform: Platform;
    design: Design;
    constructor(use: UXConfiguration, container: Container);
    start(config: FrameworkConfiguration): Promise<void>;
}
