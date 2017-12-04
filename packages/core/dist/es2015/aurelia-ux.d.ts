import { Container } from 'aurelia-dependency-injection';
import { FrameworkConfiguration } from 'aurelia-framework';
import { Design } from './designs/design';
import { Host } from './hosts/host';
import { Platform } from './platforms/platform';
import { DesignProcessor } from './designs/design-processor';
export declare class AureliaUX {
    private designProcessor;
    private availableHosts;
    host: Host;
    platform: Platform;
    design: Design;
    constructor(container: Container, designProcessor: DesignProcessor);
    start(config: FrameworkConfiguration): Promise<void>;
}
