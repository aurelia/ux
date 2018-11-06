import { Platform } from '../platforms/platform';
import { FrameworkConfiguration } from 'aurelia-framework';

export interface Host {
  type: string;
  isAvailable: boolean;
  start(config: FrameworkConfiguration): Promise<Platform>;
}
