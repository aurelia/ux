import { Container } from 'aurelia-dependency-injection';
import { FrameworkConfiguration } from 'aurelia-framework';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { UXConfiguration } from './ux-configuration';
import { DesignProcessor } from './designs/design-processor';
export declare class AureliaUX {
    use: UXConfiguration;
    private designProcessor;
    private availableHosts;
    host: Host;
    platform: Platform;
    design: Design;
    constructor(use: UXConfiguration, container: Container, designProcessor: DesignProcessor);
    start(config: FrameworkConfiguration): Promise<void>;
}
