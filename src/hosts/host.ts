import {Design} from '../designs/design';
import {Platform} from '../platforms/platform';

export interface Host {
  type: string;
  isAvailable: boolean;
  start(): Promise<Platform>;
}
