define('@aurelia-ux/core', ['exports', 'aurelia-dependency-injection', 'aurelia-pal', 'aurelia-logging', 'aurelia-loader', 'aurelia-binding', 'aurelia-framework', 'aurelia-templating-binding'], function (exports, aureliaDependencyInjection, aureliaPal, aureliaLogging, aureliaLoader, aureliaBinding, aureliaFramework, aureliaTemplatingBinding) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */







function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

var swatches = {
    red: {
        p50: '#FFEBEE',
        p100: '#FFCDD2',
        p200: '#EF9A9A',
        p300: '#E57373',
        p400: '#EF5350',
        p500: '#F44336',
        p600: '#E53935',
        p700: '#D32F2F',
        p800: '#C62828',
        p900: '#B71C1C',
        a100: '#FF8A80',
        a200: '#FF5252',
        a400: '#FF1744',
        a700: '#D50000'
    },
    pink: {
        p50: '#FCE4EC',
        p100: '#F8BBD0',
        p200: '#F48FB1',
        p300: '#F06292',
        p400: '#EC407A',
        p500: '#E91E63',
        p600: '#D81B60',
        p700: '#C2185B',
        p800: '#AD1457',
        p900: '#880E4F',
        a100: '#FF80AB',
        a200: '#FF4081',
        a400: '#F50057',
        a700: '#C51162'
    },
    purple: {
        p50: '#F3E5F5',
        p100: '#E1BEE7',
        p200: '#CE93D8',
        p300: '#BA68C8',
        p400: '#AB47BC',
        p500: '#9C27B0',
        p600: '#8E24AA',
        p700: '#7B1FA2',
        p800: '#6A1B9A',
        p900: '#4A148C',
        a100: '#EA80FC',
        a200: '#E040FB',
        a400: '#D500F9',
        a700: '#AA00FF'
    },
    deepPurple: {
        p50: '#EDE7F6',
        p100: '#D1C4E9',
        p200: '#B39DDB',
        p300: '#9575CD',
        p400: '#7E57C2',
        p500: '#673AB7',
        p600: '#5E35B1',
        p700: '#512DA8',
        p800: '#4527A0',
        p900: '#311B92',
        a100: '#B388FF',
        a200: '#7C4DFF',
        a400: '#651FFF',
        a700: '#6200EA'
    },
    indigo: {
        p50: '#E8EAF6',
        p100: '#C5CAE9',
        p200: '#9FA8DA',
        p300: '#7986CB',
        p400: '#5C6BC0',
        p500: '#3F51B5',
        p600: '#3949AB',
        p700: '#303F9F',
        p800: '#283593',
        p900: '#1A237E',
        a100: '#8C9EFF',
        a200: '#536DFE',
        a400: '#3D5AFE',
        a700: '#304FFE'
    },
    blue: {
        p50: '#E3F2FD',
        p100: '#BBDEFB',
        p200: '#90CAF9',
        p300: '#64B5F6',
        p400: '#42A5F5',
        p500: '#2196F3',
        p600: '#1E88E5',
        p700: '#1976D2',
        p800: '#1565C0',
        p900: '#0D47A1',
        a100: '#82B1FF',
        a200: '#448AFF',
        a400: '#2979FF',
        a700: '#2962FF'
    },
    lightBlue: {
        p50: '#E1F5FE',
        p100: '#B3E5FC',
        p200: '#81D4FA',
        p300: '#4FC3F7',
        p400: '#29B6F6',
        p500: '#03A9F4',
        p600: '#039BE5',
        p700: '#0288D1',
        p800: '#0277BD',
        p900: '#01579B',
        a100: '#80D8FF',
        a200: '#40C4FF',
        a400: '#00B0FF',
        a700: '#0091EA'
    },
    cyan: {
        p50: '#E0F7FA',
        p100: '#B2EBF2',
        p200: '#80DEEA',
        p300: '#4DD0E1',
        p400: '#26C6DA',
        p500: '#00BCD4',
        p600: '#00ACC1',
        p700: '#0097A7',
        p800: '#00838F',
        p900: '#006064',
        a100: '#84FFFF',
        a200: '#18FFFF',
        a400: '#00E5FF',
        a700: '#00B8D4'
    },
    teal: {
        p50: '#E0F2F1',
        p100: '#B2DFDB',
        p200: '#80CBC4',
        p300: '#4DB6AC',
        p400: '#26A69A',
        p500: '#009688',
        p600: '#00897B',
        p700: '#00796B',
        p800: '#00695C',
        p900: '#004D40',
        a100: '#A7FFEB',
        a200: '#64FFDA',
        a400: '#1DE9B6',
        a700: '#00BFA5'
    },
    green: {
        p50: '#E8F5E9',
        p100: '#C8E6C9',
        p200: '#A5D6A7',
        p300: '#81C784',
        p400: '#66BB6A',
        p500: '#4CAF50',
        p600: '#43A047',
        p700: '#388E3C',
        p800: '#2E7D32',
        p900: '#1B5E20',
        a100: '#B9F6CA',
        a200: '#69F0AE',
        a400: '#00E676',
        a700: '#00C853'
    },
    lightGreen: {
        p50: '#F1F8E9',
        p100: '#DCEDC8',
        p200: '#C5E1A5',
        p300: '#AED581',
        p400: '#9CCC65',
        p500: '#8BC34A',
        p600: '#7CB342',
        p700: '#689F38',
        p800: '#558B2F',
        p900: '#33691E',
        a100: '#CCFF90',
        a200: '#B2FF59',
        a400: '#76FF03',
        a700: '#64DD17'
    },
    lime: {
        p50: '#F9FBE7',
        p100: '#F0F4C3',
        p200: '#E6EE9C',
        p300: '#DCE775',
        p400: '#D4E157',
        p500: '#CDDC39',
        p600: '#C0CA33',
        p700: '#AFB42B',
        p800: '#9E9D24',
        p900: '#827717',
        a100: '#F4FF81',
        a200: '#EEFF41',
        a400: '#C6FF00',
        a700: '#AEEA00'
    },
    yellow: {
        p50: '#FFFDE7',
        p100: '#FFF9C4',
        p200: '#FFF59D',
        p300: '#FFF176',
        p400: '#FFEE58',
        p500: '#FFEB3B',
        p600: '#FDD835',
        p700: '#FBC02D',
        p800: '#F9A825',
        p900: '#F57F17',
        a100: '#FFFF8D',
        a200: '#FFFF00',
        a400: '#FFEA00',
        a700: '#FFD600'
    },
    amber: {
        p50: '#FFF8E1',
        p100: '#FFECB3',
        p200: '#FFE082',
        p300: '#FFD54F',
        p400: '#FFCA28',
        p500: '#FFC107',
        p600: '#FFB300',
        p700: '#FFA000',
        p800: '#FF8F00',
        p900: '#FF6F00',
        a100: '#FFE57F',
        a200: '#FFD740',
        a400: '#FFC400',
        a700: '#FFAB00'
    },
    orange: {
        p50: '#FFF3E0',
        p100: '#FFE0B2',
        p200: '#FFCC80',
        p300: '#FFB74D',
        p400: '#FFA726',
        p500: '#FF9800',
        p600: '#FB8C00',
        p700: '#F57C00',
        p800: '#EF6C00',
        p900: '#E65100',
        a100: '#FFD180',
        a200: '#FFAB40',
        a400: '#FF9100',
        a700: '#FF6D00'
    },
    deepOrange: {
        p50: '#FBE9E7',
        p100: '#FFCCBC',
        p200: '#FFAB91',
        p300: '#FF8A65',
        p400: '#FF7043',
        p500: '#FF5722',
        p600: '#F4511E',
        p700: '#E64A19',
        p800: '#D84315',
        p900: '#BF360C',
        a100: '#FF9E80',
        a200: '#FF6E40',
        a400: '#FF3D00',
        a700: '#DD2C00'
    },
    brown: {
        p50: '#EFEBE9',
        p100: '#D7CCC8',
        p200: '#BCAAA4',
        p300: '#A1887F',
        p400: '#8D6E63',
        p500: '#795548',
        p600: '#6D4C41',
        p700: '#5D4037',
        p800: '#4E342E',
        p900: '#3E2723'
    },
    grey: {
        p50: '#FAFAFA',
        p100: '#F5F5F5',
        p200: '#EEEEEE',
        p300: '#E0E0E0',
        p400: '#BDBDBD',
        p500: '#9E9E9E',
        p600: '#757575',
        p700: '#616161',
        p800: '#424242',
        p900: '#212121'
    },
    blueGrey: {
        p50: '#ECEFF1',
        p100: '#CFD8DC',
        p200: '#B0BEC5',
        p300: '#90A4AE',
        p400: '#78909C',
        p500: '#607D8B',
        p600: '#546E7A',
        p700: '#455A64',
        p800: '#37474F',
        p900: '#263238'
    },
    black: '#000000',
    white: '#FFFFFF'
};

var shadows = {
    depth_0: 'none',
    depth_2dp: '0 2px 2px 0 rgba(0, 0, 0, 0.14),' +
        '0 3px 1px -2px rgba(0, 0, 0, 0.2),' +
        '0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    depth_3dp: '0 3px 4px 0 rgba(0, 0, 0, 0.14),' +
        '0 3px 3px -2px rgba(0, 0, 0, 0.2),' +
        '0 1px 8px 0 rgba(0, 0, 0, 0.12)',
    depth_4dp: '0 4px 5px 0 rgba(0, 0, 0, 0.14),' +
        '0 1px 10px 0 rgba(0, 0, 0, 0.12),' +
        '0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    depth_6dp: '0 6px 10px 0 rgba(0, 0, 0, 0.14),' +
        '0 1px 18px 0 rgba(0, 0, 0, 0.12),' +
        '0 3px 5px -1px rgba(0, 0, 0, 0.2)',
    depth_8dp: '0 8px 10px 1px rgba(0, 0, 0, 0.14),' +
        '0 3px 14px 2px rgba(0, 0, 0, 0.12),' +
        '0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    depth_16dp: '0 16px 24px 2px rgba(0, 0, 0, 0.14),' +
        '0 6px 30px 5px rgba(0, 0, 0, 0.12),' +
        '0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    depth_24dp: '0 9px 46px  8px rgba(0, 0, 0, 0.14),' +
        '0 11px 15px -7px rgba(0, 0, 0, 0.12),' +
        '0 24px 38px  3px rgba(0, 0, 0, 0.2)',
    depth_focus: '0 0 8px rgba(0,0,0,.18),' +
        '0 8px 16px rgba(0,0,0,.36)'
};

var IOSDesign = /** @class */ (function () {
    function IOSDesign() {
        this.type = 'ios';
        this.appBackground = swatches.grey.p50;
        this.appForeground = swatches.grey.p900;
        this.controlBackground = swatches.white;
        this.controlForeground = swatches.grey.p900;
        this.primary = swatches.indigo.p500;
        this.primaryForeground = swatches.white;
        this.primaryLight = swatches.indigo.p100;
        this.primaryLightForeground = swatches.grey.p500;
        this.primaryDark = swatches.indigo.p700;
        this.primaryDarkForeground = swatches.white;
        this.accent = swatches.pink.a200;
        this.accentForeground = swatches.white;
        this.accentLight = swatches.pink.a100;
        this.accentLightForeground = swatches.white;
        this.accentDark = swatches.pink.a400;
        this.accentDarkForeground = swatches.white;
        this.elevationNone = shadows.depth_0;
        this.elevation2dp = shadows.depth_2dp;
        this.elevation3dp = shadows.depth_3dp;
        this.elevation4dp = shadows.depth_4dp;
        this.elevation6dp = shadows.depth_6dp;
        this.elevation8dp = shadows.depth_8dp;
        this.elevation16dp = shadows.depth_16dp;
        this.elevation24dp = shadows.depth_24dp;
        this.elevationFocus = shadows.depth_focus;
    }
    return IOSDesign;
}());

var IOS = /** @class */ (function () {
    function IOS(design) {
        this.design = design;
        this.type = 'ios';
    }
    IOS = __decorate([
        aureliaDependencyInjection.inject(IOSDesign)
    ], IOS);
    return IOS;
}());

var MaterialDesign = /** @class */ (function () {
    function MaterialDesign() {
        this.type = 'material';
        this.appBackground = swatches.grey.p50;
        this.appForeground = swatches.grey.p900;
        this.controlBackground = swatches.white;
        this.controlForeground = swatches.grey.p900;
        this.primary = swatches.indigo.p500;
        this.primaryForeground = swatches.white;
        this.primaryLight = swatches.indigo.p100;
        this.primaryLightForeground = swatches.grey.p500;
        this.primaryDark = swatches.indigo.p700;
        this.primaryDarkForeground = swatches.white;
        this.accent = swatches.pink.a200;
        this.accentForeground = swatches.white;
        this.accentLight = swatches.pink.a100;
        this.accentLightForeground = swatches.white;
        this.accentDark = swatches.pink.a400;
        this.accentDarkForeground = swatches.white;
        this.elevationNone = shadows.depth_0;
        this.elevation2dp = shadows.depth_2dp;
        this.elevation3dp = shadows.depth_3dp;
        this.elevation4dp = shadows.depth_4dp;
        this.elevation6dp = shadows.depth_6dp;
        this.elevation8dp = shadows.depth_8dp;
        this.elevation16dp = shadows.depth_16dp;
        this.elevation24dp = shadows.depth_24dp;
        this.elevationFocus = shadows.depth_focus;
    }
    return MaterialDesign;
}());

var Android = /** @class */ (function () {
    function Android(design) {
        this.design = design;
        this.type = 'android';
    }
    Android = __decorate([
        aureliaDependencyInjection.inject(MaterialDesign)
    ], Android);
    return Android;
}());

var Cordova = /** @class */ (function () {
    function Cordova(container) {
        this.container = container;
        this.type = 'cordova';
    }
    Object.defineProperty(Cordova.prototype, "isAvailable", {
        get: function () {
            return !!aureliaPal.PLATFORM.global.cordova;
        },
        enumerable: true,
        configurable: true
    });
    Cordova.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve) {
            aureliaPal.DOM.addEventListener('deviceready', function () {
                switch (_this.getPlatformType()) {
                    case 'ios':
                        resolve(_this.container.get(IOS));
                        break;
                    default:
                        resolve(_this.container.get(Android));
                        break;
                }
            }, false);
        });
    };
    Cordova.prototype.getPlatformType = function () {
        var device = aureliaPal.PLATFORM.global.device || { platform: 'android' };
        return device.platform.toLowerCase();
    };
    Cordova = __decorate([
        aureliaDependencyInjection.inject(aureliaDependencyInjection.Container)
    ], Cordova);
    return Cordova;
}());

var Web = /** @class */ (function () {
    function Web(design) {
        this.design = design;
        this.type = 'web';
        this.isAvailable = true;
    }
    Web.prototype.start = function () {
        var _this = this;
        return Promise.resolve().then(function () { return _this; });
    };
    Web = __decorate([
        aureliaDependencyInjection.inject(MaterialDesign)
    ], Web);
    return Web;
}());

var Electron = /** @class */ (function () {
    function Electron() {
        this.type = 'electron';
    }
    Object.defineProperty(Electron.prototype, "isAvailable", {
        get: function () {
            var p = aureliaPal.PLATFORM.global.process;
            return p && p.versions && p.versions.electron;
        },
        enumerable: true,
        configurable: true
    });
    Electron.prototype.start = function (config) {
        return Promise.resolve().then(function () { return config.container.get(Web); });
    };
    Electron = __decorate([
        aureliaDependencyInjection.inject(MaterialDesign)
    ], Electron);
    return Electron;
}());

var GlobalStyleEngine = /** @class */ (function () {
    function GlobalStyleEngine() {
        this.logger = aureliaLogging.getLogger('aurelia-ux');
        this.globalStyles = [];
        this.styleTag = aureliaPal.DOM.querySelector('#aurelia-ux-core');
        if (this.styleTag == null) {
            this.styleTag = aureliaPal.DOM.createElement('style');
            this.styleTag.type = 'text/css';
            this.styleTag.id = 'aurelia-ux-core';
            aureliaPal.DOM.appendNode(this.styleTag, document.head);
        }
    }
    GlobalStyleEngine.prototype.addOrUpdateGlobalStyle = function (id, css, tagGroup) {
        if (id === undefined || css === undefined) {
            this.logger.warn('AddOrUpdateGlobalStyle: The parameters id and css must both be provided.', { id: id, css: css });
        }
        var index = this.globalStyles.findIndex(function (t) { return t.id === id; });
        if (index > -1) {
            var globalStyle = this.globalStyles[index];
            globalStyle.css = css;
            globalStyle.tagGroup = tagGroup;
        }
        else {
            this.globalStyles.push({ id: id, css: css, tagGroup: tagGroup });
        }
        this.updateGlobalStyleElement();
    };
    GlobalStyleEngine.prototype.removeGlobalStyle = function (id) {
        if (id === undefined) {
            this.logger.warn('removeGlobalStyle: The id parameter must be provided.', { id: id });
        }
        var index = this.globalStyles.findIndex(function (t) { return t.id === id; });
        if (index > -1) {
            this.globalStyles.splice(index, 1);
        }
        this.updateGlobalStyleElement();
    };
    GlobalStyleEngine.prototype.updateGlobalStyleElement = function () {
        var globalStyleGroups = this.globalStyles.reduce(function (groups, globalStyle) {
            var tagGroup = globalStyle['tagGroup'] || '';
            groups[tagGroup] = groups[tagGroup] || [];
            groups[tagGroup].push(globalStyle);
            return groups;
        }, {});
        var innerHtml = '';
        for (var _i = 0, _a = Object.keys(globalStyleGroups); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key !== '') {
                innerHtml += key + " {\r\n";
            }
            for (var _b = 0, _c = globalStyleGroups[key]; _b < _c.length; _b++) {
                var globalStyle = _c[_b];
                innerHtml += "/*** " + globalStyle.id + " styles ***/\r\n";
                innerHtml += globalStyle.css + "\r\n\r\n";
            }
            if (key !== '') {
                innerHtml += '}';
            }
        }
        this.styleTag.innerHTML = innerHtml;
    };
    return GlobalStyleEngine;
}());

var UXConfiguration = /** @class */ (function () {
    function UXConfiguration(loader, globalStyleEngine) {
        this.loader = loader;
        this.globalStyleEngine = globalStyleEngine;
        this.logger = aureliaLogging.getLogger('aurelia-ux');
    }
    UXConfiguration.prototype.defaultConfiguration = function () {
        this.cssNormalize();
        return this;
    };
    UXConfiguration.prototype.cssNormalize = function () {
        var _this = this;
        aureliaPal.PLATFORM.moduleName('./styles/normalize.css');
        this.loader.loadText('@aurelia-ux/core/styles/normalize.css')
            .catch(function (err) {
            _this.logger.warn('Aurelia-UX Core failed to load normalize.css, some visual errors may appear.', err);
        })
            .then(function (text) {
            if (text) {
                _this.globalStyleEngine.addOrUpdateGlobalStyle('@aurelia-ux/core/styles/normalize.css', text);
            }
        });
        return this;
    };
    UXConfiguration = __decorate([
        aureliaDependencyInjection.inject(aureliaLoader.Loader, GlobalStyleEngine)
    ], UXConfiguration);
    return UXConfiguration;
}());

var DesignProcessor = /** @class */ (function () {
    function DesignProcessor(observerLocator, globalStyleEngine) {
        this.observerLocator = observerLocator;
        this.globalStyleEngine = globalStyleEngine;
    }
    DesignProcessor.prototype.setSwatchVariables = function () {
        var swatchClasses = '';
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch)) {
                if (typeof swatches[swatch] === 'string') {
                    swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + ": " + swatches[swatch] + ";\r\n";
                    continue;
                }
                for (var key in swatches[swatch]) {
                    if (swatches[swatch].hasOwnProperty(key)) {
                        swatchClasses += "  --ux-swatch--" + kebabCase(swatch) + "-" + kebabCase(key) + ": " + swatches[swatch][key] + ";\r\n";
                    }
                }
            }
        }
        this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux swatches", swatchClasses, ':root');
    };
    DesignProcessor.prototype.setDesignVariables = function (design) {
        this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux design styles", this.buildInnerHTML(design), ':root');
    };
    DesignProcessor.prototype.setDesignWatches = function (design) {
        var _this = this;
        for (var key in design) {
            if (design.hasOwnProperty(key)) {
                this.observerLocator.getObserver(design, key)
                    .subscribe(function () {
                    _this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux design styles", _this.buildInnerHTML(design), ':root');
                });
            }
        }
    };
    DesignProcessor.prototype.buildInnerHTML = function (design) {
        var designInnerHtml = '';
        for (var key in design) {
            if (design.hasOwnProperty(key)) {
                designInnerHtml += "  --aurelia-ux--design-" + kebabCase(key) + ": " + design[key] + ";\r\n";
            }
        }
        return designInnerHtml;
    };
    DesignProcessor = __decorate([
        aureliaDependencyInjection.inject(aureliaBinding.ObserverLocator, GlobalStyleEngine)
    ], DesignProcessor);
    return DesignProcessor;
}());
function kebabCase(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}

var AureliaUX = /** @class */ (function () {
    function AureliaUX(use, container, designProcessor, observerLocator) {
        this.use = use;
        this.designProcessor = designProcessor;
        this.observerLocator = observerLocator;
        this.adapterCreated = false;
        this.adapters = {};
        this.availableHosts = [
            container.get(Cordova),
            container.get(Electron),
            container.get(Web)
        ];
    }
    AureliaUX.prototype.createAdapter = function () {
        var _this = this;
        this.observerLocator.addAdapter({
            getObserver: function (obj, propertyName, descriptor) {
                if (obj instanceof Element) {
                    var tagName = obj.getAttribute('as-element') || obj.tagName;
                    var elAdapters = _this.adapters[tagName];
                    if (!elAdapters) {
                        return null;
                    }
                    var propertyAdapter = elAdapters.properties[propertyName];
                    if (propertyAdapter) {
                        var observer = propertyAdapter.getObserver(obj, propertyName, _this.observerLocator, descriptor);
                        if (observer) {
                            return observer;
                        }
                    }
                }
                return null;
            }
        });
    };
    AureliaUX.prototype.getOrCreateUxElementAdapters = function (tagName) {
        if (!this.adapterCreated) {
            this.createAdapter();
            this.adapterCreated = true;
        }
        var adapters = this.adapters;
        var elementAdapters = adapters[tagName] || adapters[tagName.toLowerCase()];
        if (!elementAdapters) {
            elementAdapters = adapters[tagName] = adapters[tagName.toLowerCase()] = { tagName: tagName, properties: {} };
        }
        return elementAdapters;
    };
    AureliaUX.prototype.interceptDetermineDefaultBindingMode = function () {
        // tslint:disable-next-line
        var ux = this;
        var originalFn = aureliaTemplatingBinding.SyntaxInterpreter.prototype.determineDefaultBindingMode;
        aureliaTemplatingBinding.SyntaxInterpreter.prototype.determineDefaultBindingMode = function (element, attrName, context) {
            var tagName = element.getAttribute('as-element') || element.tagName;
            var elAdapters = ux.adapters[tagName];
            if (elAdapters) {
                var propertyAdapter = elAdapters.properties[attrName];
                if (propertyAdapter) {
                    return propertyAdapter.defaultBindingMode;
                }
            }
            return originalFn.call(this, element, attrName, context);
        };
    };
    AureliaUX.prototype.start = function (config) {
        var _this = this;
        var found = this.availableHosts.find(function (x) { return x.isAvailable; });
        if (found === undefined) {
            throw new Error('Could not determine host environment');
        }
        this.host = found;
        return this.host.start(config).then(function (platform) {
            _this.platform = platform;
            _this.design = platform.design;
            _this.designProcessor.setSwatchVariables();
            _this.designProcessor.setDesignVariables(platform.design);
            _this.designProcessor.setDesignWatches(platform.design);
            return _this;
        });
    };
    AureliaUX.prototype.addUxElementObserverAdapter = function (tagName, properties) {
        if (!this.adapterCreated) {
            this.createAdapter();
            this.adapterCreated = true;
        }
        var elementAdapters = this.getOrCreateUxElementAdapters(tagName);
        Object.assign(elementAdapters.properties, properties);
    };
    AureliaUX.prototype.registerUxElementConfig = function (observerAdapter) {
        if (!this.bindingModeIntercepted) {
            this.interceptDetermineDefaultBindingMode();
            this.bindingModeIntercepted = true;
        }
        this.addUxElementObserverAdapter(observerAdapter.tagName.toUpperCase(), observerAdapter.properties);
    };
    AureliaUX = __decorate([
        aureliaDependencyInjection.inject(UXConfiguration, aureliaDependencyInjection.Container, DesignProcessor, aureliaFramework.ObserverLocator)
    ], AureliaUX);
    return AureliaUX;
}());

var BooleanBB = /** @class */ (function () {
    function BooleanBB() {
    }
    BooleanBB.prototype.bind = function (binding) {
        binding.targetObserver = new BooleanAttributeObserver(binding.target, binding.targetProperty);
    };
    BooleanBB.prototype.unbind = function () {
        // Empty
    };
    BooleanBB = __decorate([
        aureliaBinding.bindingBehavior('booleanAttr')
    ], BooleanBB);
    return BooleanBB;
}());
var BooleanAttributeObserver = /** @class */ (function () {
    function BooleanAttributeObserver(element, attr) {
        this.element = element;
        this.attr = attr;
        this.useString = /(?:^data-)|(?:^aria-)|\w+:/.test(attr);
    }
    BooleanAttributeObserver.prototype.getValue = function () {
        var val = this.element.getAttribute(this.attr);
        return val || val === '' ? true : false;
    };
    BooleanAttributeObserver.prototype.setValue = function (newValue) {
        if (newValue || newValue === '') {
            return this.element.setAttribute(this.attr, this.useString ? 'true' : '');
        }
        return this.useString ? this.element.setAttribute(this.attr, 'false') : this.element.removeAttribute(this.attr);
    };
    BooleanAttributeObserver.prototype.subscribe = function () {
        var msg = "Observation of a \"" + this.element.nodeName + "\" element's \"" + this.attr + "\" attribute is not supported.";
        throw new Error(msg);
    };
    return BooleanAttributeObserver;
}());

function processDesignAttributes(_, __, node, attributes, ___) {
    var prefix = 'material-'; // TODO: get this from somewhere
    var length = prefix.length;
    // tslint:disable:prefer-const
    for (var i = 0, ii = attributes.length; i < ii; ++i) {
        var current = attributes[i];
        if (current.name.indexOf(prefix) === 0) {
            var realName = current.name.substring(length);
            node.setAttribute(realName, current.value);
        }
    }
    // tslint:enable:prefer-const
    return true;
}

/**
 * Provides the utilities for getting element's metrics.
 */
var ElementRect = /** @class */ (function () {
    /**
     * Initializes a new instance of the `ElementRect` class with the specified `element`.
     */
    function ElementRect(element) {
        this.element = element;
        this.width = this.boundingRect.width;
        this.height = this.boundingRect.height;
        this.size = Math.max(this.width, this.height);
    }
    Object.defineProperty(ElementRect.prototype, "center", {
        /**
         * Returns the center coordinates of the current element.
         */
        get: function () {
            return {
                x: this.width / 2,
                y: this.height / 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementRect.prototype, "boundingRect", {
        /**
         * Returns the size of the current element and its position relative to the viewport.
         */
        get: function () {
            return this.element.getBoundingClientRect();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calculates euclidean distance between two points.
     * @param point1 - Start point
     * @param point2 - End point
     * @returns Distance between two points.
     */
    ElementRect.euclideanDistance = function (point1, point2) {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    };
    /**
     * Calculates the distance between given point and farthest corner of the current element.
     * @param The point object containing x and y coordinates.
     * @returns Distance from a point to the container's farthest corner.
     */
    ElementRect.prototype.distanceToFarthestCorner = function (_a) {
        var _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c;
        return Math.max(ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: 0 }), ElementRect.euclideanDistance({ x: x, y: y }, { x: 0, y: this.height }), ElementRect.euclideanDistance({ x: x, y: y }, { x: this.width, y: this.height }));
    };
    /**
     * Determines if the specified point is contained within this element.
     * @param {(Event|Object)} ev - The object containing coordinates of the point.
     * @param {Number} ev.x - The `x` coordinate of the point.
     * @param {Number} ev.y - The `y` coordinate of the point.
     * @param {Number} ev.clientX - The `x` coordinate of the point.
     * @param {Number} ev.clientY - The `y` coordinate of the point.
     * @returns {Boolean} Returns `true` if the `x` and `y` coordinates of point is a
     * point inside this element's rectangle, otherwise `false`.
     */
    ElementRect.prototype.contains = function (ev) {
        var l = this.boundingRect.left;
        var t = this.boundingRect.top;
        var w = this.boundingRect.width;
        var h = this.boundingRect.height;
        var x = ev.x || ev.clientX || 0;
        var y = ev.y || ev.clientY || 0;
        return x >= l && x <= l + w && y >= t && y <= t + h;
    };
    return ElementRect;
}());

// tslint:disable:variable-name
var _window = aureliaPal.PLATFORM.global;
var _doc = _window.document;
var _now = aureliaPal.PLATFORM.performance.now.bind(aureliaPal.PLATFORM.performance);
// tslint:enable:variable-name
/**
 * Provides all the logic to produce a one-time rippling effect.
 */
var PaperWave = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PaperWave` class with the specified `PaperRipple` instance.
     */
    function PaperWave(options) {
        this.color = _window.getComputedStyle(options.$).color;
        this.containerRect = new ElementRect(options.$);
        this.recenters = options.recenters || false;
        this.center = options.center || false;
        this.initialOpacity = options.initialOpacity || 0.25;
        this.opacityDecayVelocity = options.opacityDecayVelocity || 0.8;
        this.$wave = _doc.createElement('div');
        this.$wave.classList.add('paper-ripple__wave');
        this.$wave.style.backgroundColor = this.color;
        this.$ = _doc.createElement('div');
        this.$.classList.add('paper-ripple__wave-container');
        this.$.appendChild(this.$wave);
        this.resetDefaults();
    }
    Object.defineProperty(PaperWave.prototype, "touchDownElapsed", {
        /**
         * Gets the time in milliseconds elapsed from the moment where interaction with the wave was started.
         * @returns The time in milliseconds.
         */
        get: function () {
            if (!this.touchDownStarted) {
                return 0;
            }
            var elapsed = _now() - this.touchDownStarted;
            if (this.touchUpStarted) {
                elapsed -= this.touchUpElapsed;
            }
            return elapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "touchUpElapsed", {
        /**
         * Gets the time in milliseconds elapsed from the moment where interaction with the wave was ended.
         * @returns The time in milliseconds.
         */
        get: function () {
            return this.touchUpStarted ? _now() - this.touchUpStarted : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "touchDownElapsedSeconds", {
        /**
         * Gets the time in seconds elapsed since the moment where interaction with the wave was started.
         * @returns The time in seconds.
         */
        get: function () {
            return this.touchDownElapsed / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "touchUpElapsedSeconds", {
        /**
         * Gets the time in seconds elapsed since the moment where interaction with the wave was ended.
         * @returns The time in seconds.
         */
        get: function () {
            return this.touchUpElapsed / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "mouseInteractionSeconds", {
        /**
         * Gets the total interaction time.
         * @returns The time in seconds
         */
        get: function () {
            return this.touchDownElapsedSeconds + this.touchUpElapsedSeconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "radius", {
        /**
         * Gets the wave's radius at the current time.
         *
         * @returns {Number} The value of the wave's radius.
         */
        get: function () {
            var radius = Math.min(Math.sqrt(Math.pow(this.containerRect.width, 2) + Math.pow(this.containerRect.height, 2)), PaperWave.MAX_RADIUS) * 1.1 + 5;
            var elapsed = 1.1 - 0.2 * (radius / PaperWave.MAX_RADIUS);
            var currentTime = this.mouseInteractionSeconds / elapsed;
            var actualRadius = radius * (1 - Math.pow(80, -currentTime));
            return Math.abs(actualRadius);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "opacity", {
        /**
         * Gets the wave's opacity at the current time.
         * @returns The value of the wave's opacity.
         */
        get: function () {
            if (!this.touchUpStarted) {
                return this.initialOpacity;
            }
            return Math.max(0, this.initialOpacity - this.touchUpElapsedSeconds * this.opacityDecayVelocity);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "outerOpacity", {
        /**
         * Gets the wave's outer opacity at the current time.
         * @returns The value of the wave's outer opacity.
         */
        get: function () {
            return Math.max(0, Math.min(this.touchUpElapsedSeconds * 0.3, this.opacity));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "isWaveFullyOpaque", {
        /**
         * Determines whether the wave is fully opaque or not.
         * @returns `true`, if so, otherwise `false`.
         */
        get: function () {
            return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "isMaxRadiusReached", {
        /**
         * Determines whether the wave reached its max radius or not.
         * @returns `true`, if so, otherwise `false`.
         */
        get: function () {
            return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "isAnimationComplete", {
        /**
         * Determines whether the animation of rippling effect completed or not.
         * @returns `true`, if so, otherwise `false`.
         */
        get: function () {
            return this.touchUpStarted ? this.isWaveFullyOpaque : this.isMaxRadiusReached;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "translationFraction", {
        /**
         * Gets the wave's translation fraction value.
         * @returns The value of the wave's translation fraction.
         */
        get: function () {
            return Math.min(1, this.radius / this.containerRect.size * 2 / Math.sqrt(2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "currentPosition", {
        /**
         * Gets the wave's current position.
         * @returns {{x: Number, y: Number}} Object containing coordinates of the wave's current position.
         */
        get: function () {
            var translateFraction = this.translationFraction;
            var x = this.startPosition.x;
            var y = this.startPosition.y;
            if (this.endPosition.x) {
                x = this.startPosition.x + translateFraction * (this.endPosition.x - this.startPosition.x);
            }
            if (this.endPosition.y) {
                y = this.startPosition.y + translateFraction * (this.endPosition.y - this.startPosition.y);
            }
            return { x: x, y: y };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperWave.prototype, "isTouchDown", {
        /**
         * Determines whether the pointing device is still in interaction with the current wave.
         *
         * @returns {Boolean} `true`, if so, otherwise `false`.
         */
        get: function () {
            return this.touchDownStarted && !this.touchUpStarted;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets all the wave's values.
     * @returns Current instance for method chaining.
     */
    PaperWave.prototype.resetDefaults = function () {
        this.maxRadius = 0;
        this.touchDownStarted = 0;
        this.touchUpStarted = 0;
        this.startPosition = { x: 0, y: 0 };
        this.endPosition = { x: 0, y: 0 };
        return this;
    };
    /**
     * Performs updating of the wave's values.
     * @returns Current instance for method chaining.
     */
    PaperWave.prototype.draw = function () {
        var scaleFactor = this.radius / (this.containerRect.size / 2);
        var containerCenter = this.containerRect.center;
        var currentPos = this.currentPosition;
        var deltaPos = {
            x: currentPos.x - containerCenter.x,
            y: currentPos.y - containerCenter.y
        };
        this.$wave.style.opacity = this.opacity.toString();
        // cssString = 'translate(' + deltaPos.x + 'px, ' + deltaPos.y + 'px)';
        // this.$.style.webkitTransform = cssString;
        // this.$.style.mozTransform = cssString;
        // this.$.style.msTransform = cssString;
        // this.$.style.oTransform = cssString;
        this.$.style.transform = 'translate3d(' + deltaPos.x + 'px, ' + deltaPos.y + 'px, 0)';
        // cssString = 'scale(' + scaleFactor + ',' + scaleFactor + ')';
        // this.$wave.style.webkitTransform = cssString;
        // this.$wave.style.mozTransform = cssString;
        // this.$wave.style.msTransform = cssString;
        // this.$wave.style.oTransform = cssString;
        this.$wave.style.transform = 'scale3d(' + scaleFactor + ',' + scaleFactor + ', 1)';
        return this;
    };
    /**
     * Performs ripple-down effect on the current wave.
     * @param An object containing coordinates of interaction point to set start position of ripple effect.
     * @returns Current instance for method chaining.
     */
    PaperWave.prototype.downAction = function (event) {
        if (event === void 0) { event = null; }
        var containerCenter = this.containerRect.center;
        this.resetDefaults();
        this.touchDownStarted = _now();
        this.startPosition = this.center || !event ?
            containerCenter :
            {
                x: (event.clientX || event.x) - this.containerRect.boundingRect.left,
                y: (event.clientY || event.y) - this.containerRect.boundingRect.top
            };
        this.endPosition = this.recenters ? containerCenter : this.endPosition;
        this.maxRadius = this.containerRect.distanceToFarthestCorner(this.startPosition);
        this.$.style.top = (this.containerRect.height - this.containerRect.size) / 2 + 'px';
        this.$.style.left = (this.containerRect.width - this.containerRect.size) / 2 + 'px';
        this.$.style.width = this.containerRect.size + 'px';
        this.$.style.height = this.containerRect.size + 'px';
        return this;
    };
    /**
     * Performs ripple-up effect on the current wave.
     * @returns Current instance for method chaining.
     */
    PaperWave.prototype.upAction = function () {
        if (!this.isTouchDown) {
            return this;
        }
        this.touchUpStarted = _now();
        return this;
    };
    /**
     * Removes the wave from a DOM.
     * @returns Current instance for method chaining.
     */
    PaperWave.prototype.remove = function () {
        this.$.parentNode.removeChild(this.$);
        return this;
    };
    /**
     * Represents the max possible value of the wave's radius.
     */
    PaperWave.MAX_RADIUS = 300;
    return PaperWave;
}());

/**
 * Provides all the logic to produce ripple visual effect.
 * Other elements can use it to simulate rippling effect emanating from the point of contact.
 */
var PaperRipple = /** @class */ (function () {
    /**
     * Initializes a new instance of the `PaperRipple` class with the specified `config` object.
     */
    function PaperRipple(cfg) {
        if (cfg === void 0) { cfg = {}; }
        this.waves = [];
        this.initialOpacity = cfg.initialOpacity || 0.25;
        this.opacityDecayVelocity = cfg.opacityDecayVelocity || 0.8;
        this.initTarget(cfg && cfg.nodeType ? cfg : cfg.target && cfg.target.nodeType ? cfg.target : null);
        this.recenters = cfg.recenters || this.recenters;
        this.center = cfg.center || this.center;
        this.round = cfg.round || this.round;
    }
    Object.defineProperty(PaperRipple.prototype, "recenters", {
        /**
         * Determines whether all the waves should be re-centered towards the center of the container.
         * @returns If `true`, waves will exhibit a gravitational pull towards the center of the container as they fade away.
         */
        get: function () {
            return this.$.hasAttribute('recenters');
        },
        /**
         * Sets the value that indicates whether all the waves should be re-centered towards the center of the container.
         * @returns Nothing.
         */
        set: function (newValue) {
            if (newValue) {
                this.$.setAttribute('recenters', '');
            }
            else {
                this.$.removeAttribute('recenters');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperRipple.prototype, "center", {
        /**
         * Determines whether all the waves should start a movement from the center of the container.
         * @returns If `true`, waves will center inside its container
         */
        get: function () {
            return this.$.hasAttribute('center');
        },
        /**
         * Sets the value that indicates whether all the waves should start a movement from the center of the container.
         * @returns Nothing.
         */
        set: function (newValue) {
            if (newValue) {
                this.$.setAttribute('center', '');
            }
            else {
                this.$.removeAttribute('center');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperRipple.prototype, "round", {
        /**
         * Determines whether ripple effect should apply within a circle.
         * @returns If `true`, ripple effect will apply within a circle.
         */
        get: function () {
            return this.$.classList.contains('paper-ripple--round');
        },
        /**
         * Sets the value that indicates whether ripple effect should apply within a circle.
         * @returns Nothing.
         */
        set: function (newValue) {
            this.$.classList.toggle('paper-ripple--round', newValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaperRipple.prototype, "shouldKeepAnimating", {
        /**
         * Determines whether the ripple should keep animating or not.
         * @returns `true`, if so, otherwise `false`.
         */
        get: function () {
            return this.waves.some(function (wave) { return !wave.isAnimationComplete; });
        },
        enumerable: true,
        configurable: true
    });
    PaperRipple.prototype.initTarget = function (target) {
        if (target === void 0) { target = null; }
        var doc = aureliaPal.PLATFORM.global.document;
        this.$ = target || doc.createElement('div');
        this.$.classList.add('paper-ripple');
        if (!this.$background) {
            this.$background = target &&
                target.querySelector('.paper-ripple__background') || doc.createElement('div');
            this.$background.classList.add('paper-ripple__background');
            this.$.appendChild(this.$background);
        }
        if (!this.$waves) {
            this.$waves = target &&
                target.querySelector('.paper-ripple__waves') || doc.createElement('div');
            this.$waves.classList.add('paper-ripple__waves');
            this.$.appendChild(this.$waves);
        }
        return this;
    };
    /**
     * Adds new wave to the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    PaperRipple.prototype.addWave = function () {
        var wave = new PaperWave(this);
        this.$waves.appendChild(wave.$);
        this.$background.style.backgroundColor = wave.color;
        this.waves.push(wave);
        return wave;
    };
    /**
     * Produces a ripple-down effect.
     *
     * @param  ev Object containing coordinates of the point of contact.
     * @returns Current instance for method chaining.
     */
    PaperRipple.prototype.downAction = function (ev) {
        var wave = this.addWave();
        wave.downAction(ev);
        this.animate();
        return this;
    };
    /**
     * Produces a ripple-up effect.
     * @returns {PaperRipple} Current instance for method chaining.
     */
    PaperRipple.prototype.upAction = function () {
        this.waves.forEach(function (wave) { wave.upAction(); });
        this.animate();
        return this;
    };
    /**
     * Removes given wave from the list of visual ripples.
     * @param wave - The wave to remove.
     * @returns Current instance for method chaining.
     */
    PaperRipple.prototype.removeWave = function (wave) {
        var waveIndex = this.waves.indexOf(wave);
        if (waveIndex < 0) {
            return this;
        }
        this.waves.splice(waveIndex, 1);
        wave.remove();
        return this;
    };
    /**
     * Animates all the waves in the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    PaperRipple.prototype.animate = function () {
        // tslint:disable:prefer-const
        for (var i = 0, l = this.waves.length; i < l; i++) {
            var wave = this.waves[i];
            if (wave) {
                wave.draw();
                this.$background.style.opacity = wave.outerOpacity.toString();
                if (wave.isWaveFullyOpaque && !wave.isMaxRadiusReached) {
                    this.removeWave(wave);
                }
            }
        }
        // tslint:enable:prefer-const
        if (!this.shouldKeepAnimating && this.waves.length === 0) {
            this.$background.style.backgroundColor = null;
        }
        else {
            aureliaPal.PLATFORM.requestAnimationFrame(this.animate.bind(this));
        }
        return this;
    };
    return PaperRipple;
}());

/**
 * @description This function will ensure that we propertly treat a potential string value for a boolean attribute
 * as the boolean representation
 *
 * @param {string} attributeName Name of the boolean attribute we are normalizing for
 * @param {boolean|string} value Existing value of the boolean html attribute represented as a boolean or string
 *
 * @returns {boolean}
 */
function normalizeBooleanAttribute(attributeName, value) {
    var ret;
    // tslint:disable-next-line
    if (typeof value === 'string') {
        ret = value === '' || value.toLocaleLowerCase() === attributeName.toLocaleLowerCase();
    }
    else {
        ret = value;
    }
    return ret;
}

var StyleController = /** @class */ (function () {
    function StyleController(observerLocator, globalStyleEngine, ux) {
        this.observerLocator = observerLocator;
        this.globalStyleEngine = globalStyleEngine;
        this.ux = ux;
        this.themes = [];
    }
    StyleController.prototype.updateTheme = function (theme, element) {
        var baseTheme = { themeKey: 'base-theme' };
        if (theme.themeKey == null) {
            throw new Error('Provided theme has no themeKey property.');
        }
        if (theme.themeKey === 'design') {
            for (var key in theme) {
                if (key !== 'themeKey') {
                    this.ux.design[key] = theme[key];
                }
            }
        }
        else if (element != null) {
            for (var key in theme) {
                if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                    element.style.setProperty(this.generateCssVariableName(theme.themeKey, key), theme[key]);
                }
            }
        }
        else {
            var uxTheme = this.themes.splice(this.themes.indexOf(this.themes[theme.themeKey]))[0];
            if (uxTheme != null) {
                this.removeWatches(uxTheme);
            }
            this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, this.processInnerHtml(theme), ':root');
            this.setWatches(theme);
            this.themes[theme.themeKey] = theme;
        }
    };
    StyleController.prototype.getThemeKeys = function (theme) {
        var baseTheme = { themeKey: 'base-theme' };
        var themeKeys = [];
        for (var key in theme) {
            if (theme.hasOwnProperty(key) && baseTheme.hasOwnProperty(key) === false) {
                themeKeys.push(key);
            }
        }
        return themeKeys;
    };
    StyleController.prototype.generateCssVariableName = function (themeKey, propertyKey) {
        return "--aurelia-ux--" + themeKey + "-" + kebabCase$1(propertyKey);
    };
    StyleController.prototype.generateCssVariable = function (themeKey, propertyKey, value) {
        return "--aurelia-ux--" + themeKey + "-" + kebabCase$1(propertyKey) + ": " + value + ";";
    };
    StyleController.prototype.setWatches = function (theme) {
        var _this = this;
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            this.observerLocator.getObserver(theme, key).subscribe(function () { return _this.themePropertyChanged(theme); });
        }
    };
    StyleController.prototype.removeWatches = function (theme) {
        var _this = this;
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            this.observerLocator.getObserver(theme, key).unsubscribe(function () { return _this.themePropertyChanged(theme); });
        }
    };
    StyleController.prototype.themePropertyChanged = function (theme) {
        this.globalStyleEngine.addOrUpdateGlobalStyle("aurelia-ux theme " + theme.themeKey, this.processInnerHtml(theme), ':root');
    };
    StyleController.prototype.processInnerHtml = function (theme) {
        var designInnerHtml = '';
        for (var _i = 0, _a = this.getThemeKeys(theme); _i < _a.length; _i++) {
            var key = _a[_i];
            designInnerHtml += "  " + this.generateCssVariable(theme.themeKey, key, theme[key]) + "\r\n";
        }
        return designInnerHtml;
    };
    StyleController = __decorate([
        aureliaDependencyInjection.inject(aureliaBinding.ObserverLocator, GlobalStyleEngine, AureliaUX)
    ], StyleController);
    return StyleController;
}());
function kebabCase$1(value) {
    value = value.charAt(0).toLowerCase() + value.slice(1);
    return value.replace(/([A-Z])/g, function (match) { return "-" + match[0].toLowerCase(); });
}

var StyleEngine = /** @class */ (function () {
    function StyleEngine(styleController) {
        this.styleController = styleController;
    }
    /**
     * Processes a UxTheme into the corresponding CSS Variables
     * and applies them to the provided element. If no theme is
     * provided then the theme will be setup as a default theme
     * and set CSS Variables in the document head.
     *
     * @param element Element to apply the processed UxTheme to.
     * @param theme UxTheme to process.
     */
    StyleEngine.prototype.applyTheme = function (theme, element) {
        if (theme == null || theme.themeKey == null) {
            return;
        }
        this.styleController.updateTheme(theme, element);
    };
    /**
     * Applies an array of themes. This is to enable the creation of
     * large theme sets that can be easily applied with one call.
     *
     * @param themes Array of UxThemes to be applied.
     */
    StyleEngine.prototype.applyThemeGroup = function (themes) {
        for (var _i = 0, themes_1 = themes; _i < themes_1.length; _i++) {
            var theme = themes_1[_i];
            this.applyTheme(theme);
        }
    };
    /**
     * Retrieves the default theme object for the provided key that can then be updated.
     *
     * @param key Key of the theme to be retrieved.
     */
    StyleEngine.prototype.getDefaultTheme = function (key) {
        return this.styleController.themes[key];
    };
    StyleEngine = __decorate([
        aureliaDependencyInjection.inject(StyleController)
    ], StyleEngine);
    return StyleEngine;
}());

var uxCorePromise;
function configure(config, callback) {
    if (uxCorePromise) {
        return uxCorePromise;
    }
    var ux = config.container.get(AureliaUX);
    var boolAttr = new aureliaFramework.BindingBehaviorResource('');
    boolAttr.initialize(config.container, BooleanBB);
    boolAttr.register(config.aurelia.resources, 'booleanAttr');
    if (typeof callback === 'function') {
        return uxCorePromise = Promise.resolve(callback(ux))
            .then(function () { return ux.start(config); });
    }
    else {
        ux.use.defaultConfiguration();
        return uxCorePromise = ux.start(config);
    }
}

exports.configure = configure;
exports.swatches = swatches;
exports.shadows = shadows;
exports.processDesignAttributes = processDesignAttributes;
exports.PaperRipple = PaperRipple;
exports.normalizeBooleanAttribute = normalizeBooleanAttribute;
exports.StyleEngine = StyleEngine;
exports.GlobalStyleEngine = GlobalStyleEngine;
exports.AureliaUX = AureliaUX;
exports.UXConfiguration = UXConfiguration;

Object.defineProperty(exports, '__esModule', { value: true });

});
