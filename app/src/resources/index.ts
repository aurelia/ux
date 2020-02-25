import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/code-block'),

    // UX Components in development
    PLATFORM.moduleName('./elements/ux/ux-drawer/ux-drawer'),
    PLATFORM.moduleName('./elements/ux/toolbar/ux-toolbar'),
    PLATFORM.moduleName('./elements/ux/tabs/ux-tabs')
  ]);
}
