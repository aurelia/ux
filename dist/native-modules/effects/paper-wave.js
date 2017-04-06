import { PLATFORM } from 'aurelia-pal';
import { ElementRect } from './element-rect';
// tslint:disable:variable-name
var _window = PLATFORM.global;
var _doc = _window.document;
var _now = PLATFORM.performance.now.bind(PLATFORM.performance);
// tslint:enable:variable-name
/**
 * Provides all the logic to produce a one-time rippling effect.
 */
var PaperWave = (function () {
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
    return PaperWave;
}());
export { PaperWave };
/**
 * Represents the max possible value of the wave's radius.
 */
PaperWave.MAX_RADIUS = 300;
