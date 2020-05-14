import { PLATFORM } from 'aurelia-framework';
export * from '@aurelia-ux/card';
export * from '@aurelia-ux/button';
export * from '@aurelia-ux/checkbox';
export * from '@aurelia-ux/chip-input';
export * from '@aurelia-ux/grid';
export * from '@aurelia-ux/datepicker';
export * from '@aurelia-ux/form';
export * from '@aurelia-ux/input';
export * from '@aurelia-ux/input-info';
export * from '@aurelia-ux/list';
export * from '@aurelia-ux/radio';
export * from '@aurelia-ux/textarea';
export * from '@aurelia-ux/switch';
export * from '@aurelia-ux/select';
export * from '@aurelia-ux/slider';
export function configure(config) {
    config.plugin(PLATFORM.moduleName('@aurelia-ux/button'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/card'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/checkbox'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/chip-input'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/datepicker'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/grid'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/form'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/input'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/input-info'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/list'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/radio'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/textarea'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/switch'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/select'));
    config.plugin(PLATFORM.moduleName('@aurelia-ux/slider'));
}
//# sourceMappingURL=index.js.map