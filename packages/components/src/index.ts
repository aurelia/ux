import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';

export * from '@aurelia-ux/card';
export * from '@aurelia-ux/button';
export * from '@aurelia-ux/checkbox';
export * from '@aurelia-ux/chip-input';
export * from '@aurelia-ux/grid';
export * from '@aurelia-ux/datepicker';
export * from '@aurelia-ux/expandable';
export * from '@aurelia-ux/form';
export * from '@aurelia-ux/icons';
export * from '@aurelia-ux/input';
export * from '@aurelia-ux/input-info';
export * from '@aurelia-ux/list';
export * from '@aurelia-ux/modal';
export * from '@aurelia-ux/pagination';
export * from '@aurelia-ux/popup';
export * from '@aurelia-ux/positioning';
export * from '@aurelia-ux/progress';
export * from '@aurelia-ux/radio';
export * from '@aurelia-ux/switch';
export * from '@aurelia-ux/select';
export * from '@aurelia-ux/slider';
export * from '@aurelia-ux/textarea';
export * from '@aurelia-ux/tree-view';

export function configure(config: FrameworkConfiguration) {
  config
    .plugin(PLATFORM.moduleName('@aurelia-ux/button'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/card'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/checkbox'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/chip-input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/datepicker'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/expandable'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/grid'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/form'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/icons'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/input-info'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/list'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/modal'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/pagination'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/popup'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/positioning'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/progress'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/radio'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/switch'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/select'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/slider'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/textarea'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/tree-view'));
}
