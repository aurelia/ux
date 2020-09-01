import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export { UxPagination } from './ux-pagination';

export function configure(frameworkConfig: FrameworkConfiguration) {
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./ux-pagination')
  ]);
}
