var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", 'aurelia-metadata', 'aurelia-pal', 'aurelia-path', './style-compiler', 'aurelia-loader'], function (require, exports, aurelia_metadata_1, aurelia_pal_1, aurelia_path_1, style_compiler_1, aurelia_loader_1) {
    "use strict";
    /**
    * Decorator: Indicates that the decorated class/object is a style strategy.
    */
    exports.styleStrategy = aurelia_metadata_1.protocol.create('aurelia:style-strategy', {
        validate: function (target) {
            if (!(typeof target.loadStyleFactory === 'function')) {
                return 'Style strategies must implement: loadStyleStrateg(): Promise<StyleFactory>';
            }
            return true;
        },
        compose: function (target) {
            if (!(typeof target.makeRelativeTo === 'function')) {
                target.makeRelativeTo = aurelia_pal_1.PLATFORM.noop;
            }
        }
    });
    var cssUrlMatcher = /url\((?!['"]data)([^)]+)\)/gi;
    function fixupCSSUrls(address, css) {
        if (typeof css !== 'string') {
            throw new Error("Failed loading required CSS file: " + address);
        }
        return css.replace(cssUrlMatcher, function (match, p1) {
            var quote = p1.charAt(0);
            if (quote === '\'' || quote === '"') {
                p1 = p1.substr(1, p1.length - 2);
            }
            return 'url(\'' + aurelia_path_1.relativeToFile(p1, address) + '\')';
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
        function RelativeStyleStrategy(path) {
            this.path = path;
            this.absolutePath = null;
        }
        /**
        * Loads a style factory.
        */
        RelativeStyleStrategy.prototype.loadStyleFactory = function (container, styleObjectType) {
            var _this = this;
            if (this.absolutePath === null && this.moduleId) {
                this.absolutePath = aurelia_path_1.relativeToFile(this.path, this.moduleId);
            }
            var styleUrl = this.absolutePath || this.path;
            return container.get(aurelia_loader_1.Loader)
                .loadText(styleUrl)
                .catch(function (err) { return null; })
                .then(function (text) {
                text = fixupCSSUrls(styleUrl, text);
                _this.css = text;
                var compiler = container.get(style_compiler_1.StyleCompiler);
                return compiler.compile(styleObjectType, _this.css);
            });
        };
        /**
        * Makes the view loaded by this strategy relative to the provided file path.
        * @param file The path to load the view relative to.
        */
        RelativeStyleStrategy.prototype.makeRelativeTo = function (file) {
            if (this.absolutePath === null) {
                this.absolutePath = aurelia_path_1.relativeToFile(this.path, file);
            }
        };
        RelativeStyleStrategy = __decorate([
            exports.styleStrategy()
        ], RelativeStyleStrategy);
        return RelativeStyleStrategy;
    }());
    exports.RelativeStyleStrategy = RelativeStyleStrategy;
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
            return container.get(aurelia_loader_1.Loader)
                .loadText(this.styleUrl)
                .catch(function (err) { return null; })
                .then(function (text) {
                text = fixupCSSUrls(_this.styleUrl, text);
                _this.css = text;
                var compiler = container.get(style_compiler_1.StyleCompiler);
                return compiler.compile(styleObjectType, _this.css);
            });
        };
        ConventionalStyleStrategy = __decorate([
            exports.styleStrategy()
        ], ConventionalStyleStrategy);
        return ConventionalStyleStrategy;
    }());
    exports.ConventionalStyleStrategy = ConventionalStyleStrategy;
    /**
    * A styles strategy that allows the component author to inline css.
    */
    var InlineStyleStrategy = (function () {
        /**
        * Creates an instance of InlineStyleStrategy.
        */
        function InlineStyleStrategy(css) {
            this.css = css;
        }
        /**
        * Loads a style factory.
        */
        InlineStyleStrategy.prototype.loadStyleFactory = function (container, styleObjectType) {
            this.transformedCSS = fixupCSSUrls(this.moduleId, this.css);
            var compiler = container.get(style_compiler_1.StyleCompiler);
            return Promise.resolve(compiler.compile(styleObjectType, this.transformedCSS));
        };
        InlineStyleStrategy = __decorate([
            exports.styleStrategy()
        ], InlineStyleStrategy);
        return InlineStyleStrategy;
    }());
    exports.InlineStyleStrategy = InlineStyleStrategy;
});
