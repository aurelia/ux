var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { protocol, Origin } from 'aurelia-metadata';
import { PLATFORM } from 'aurelia-pal';
import { StyleLocator } from './style-locator';
import { relativeToFile } from 'aurelia-path';
import { StyleCompiler } from './style-compiler';
import { Loader } from 'aurelia-loader';
import { AureliaUX } from '../aurelia-ux';
/**
 * Decorator: Indicates that the decorated class/object is a style strategy.
 */
export var styleStrategy = protocol.create('aurelia:style-strategy', {
    validate: function (target) {
        if (!(typeof target.loadStyleFactory === 'function')) {
            return 'Style strategies must implement: loadStyleFactory(): Promise<StyleFactory>';
        }
        return true;
    },
    compose: function (target) {
        if (!(typeof target.makeRelativeTo === 'function')) {
            target.makeRelativeTo = PLATFORM.noop;
        }
    }
});
var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;
function fixupCSSUrls(address, css) {
    if (typeof css !== 'string') {
        throw new Error("Failed loading required CSS file: " + address);
    }
    return css.replace(cssUrlMatcher, function (_, p1) {
        var quote = p1.charAt(0);
        if (quote === '\'' || quote === '"') {
            p1 = p1.substr(1, p1.length - 2);
        }
        return 'url(\'' + relativeToFile(p1, address) + '\')';
    });
}
/**
 * A style strategy that loads a style relative to its associated view-model.
 */
var RelativeStyleStrategy = (function () {
    /**
     * Creates an instance of RelativeStyleStrategy.
     * @param path The relative path to the styles.
     */
    function RelativeStyleStrategy(pathOrDesignMap) {
        this.pathOrDesignMap = pathOrDesignMap;
        this.absolutePath = null;
    }
    /**
     * Loads a style factory.
     */
    RelativeStyleStrategy.prototype.loadStyleFactory = function (container, styleObjectType) {
        var _this = this;
        if (this.absolutePath === null && this.moduleId) {
            var path = resolveForDesign(this.pathOrDesignMap, container);
            if (!path) {
                this.absolutePath = container.get(StyleLocator)
                    .convertOriginToStyleUrl(new Origin(this.moduleId, 'default'));
            }
            else {
                this.absolutePath = relativeToFile(path, this.moduleId);
            }
        }
        var styleUrl = this.absolutePath || resolveForDesign(this.pathOrDesignMap, container);
        return container.get(Loader)
            .loadText(styleUrl)
            .catch(function () { return null; })
            .then(function (text) {
            text = fixupCSSUrls(styleUrl, text);
            _this.css = text;
            var compiler = container.get(StyleCompiler);
            return compiler.compile(styleObjectType, _this.css);
        });
    };
    /**
     * Makes the view loaded by this strategy relative to the provided file path.
     * @param file The path to load the view relative to.
     */
    RelativeStyleStrategy.prototype.makeRelativeTo = function (file) {
        if (this.absolutePath === null) {
            this.absolutePath = relativeToFile(this.path, file);
        }
    };
    return RelativeStyleStrategy;
}());
RelativeStyleStrategy = __decorate([
    styleStrategy()
], RelativeStyleStrategy);
export { RelativeStyleStrategy };
/**
 * A styles strategy based on naming conventions.
 */
var ConventionalStyleStrategy = (function () {
    /**
     * Creates an instance of ConventionalStyleStrategy.
     * @param viewLocator The view locator service for conventionally locating the view.
     * @param origin The origin of the view model to conventionally load the view for.
     */
    function ConventionalStyleStrategy(styleLocator, origin) {
        this.moduleId = origin.moduleId;
        this.styleUrl = styleLocator.convertOriginToStyleUrl(origin);
    }
    /**
     * Loads a style factory.
     */
    ConventionalStyleStrategy.prototype.loadStyleFactory = function (container, styleObjectType) {
        var _this = this;
        return container.get(Loader)
            .loadText(this.styleUrl)
            .catch(function () { return null; })
            .then(function (text) {
            text = fixupCSSUrls(_this.styleUrl, text);
            _this.css = text;
            var compiler = container.get(StyleCompiler);
            return compiler.compile(styleObjectType, _this.css);
        });
    };
    return ConventionalStyleStrategy;
}());
ConventionalStyleStrategy = __decorate([
    styleStrategy()
], ConventionalStyleStrategy);
export { ConventionalStyleStrategy };
/**
 * A styles strategy that allows the component author to inline css.
 */
var InlineStyleStrategy = (function () {
    /**
     * Creates an instance of InlineStyleStrategy.
     */
    function InlineStyleStrategy(cssOrDesignMap) {
        this.cssOrDesignMap = cssOrDesignMap;
    }
    /**
     * Loads a style factory.
     */
    InlineStyleStrategy.prototype.loadStyleFactory = function (container, styleObjectType) {
        var css = resolveForDesign(this.cssOrDesignMap, container);
        this.transformedCSS = fixupCSSUrls(this.moduleId, css);
        var compiler = container.get(StyleCompiler);
        return Promise.resolve(compiler.compile(styleObjectType, this.transformedCSS));
    };
    return InlineStyleStrategy;
}());
InlineStyleStrategy = __decorate([
    styleStrategy()
], InlineStyleStrategy);
export { InlineStyleStrategy };
function resolveForDesign(valueOrDesignMap, container) {
    if (typeof valueOrDesignMap === 'string') {
        return valueOrDesignMap;
    }
    else {
        var designType = container.get(AureliaUX).design.type;
        return valueOrDesignMap[designType];
    }
}
