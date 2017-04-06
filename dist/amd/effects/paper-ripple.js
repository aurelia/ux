define(["require", "exports", "./paper-wave", "aurelia-pal"], function (require, exports, paper_wave_1, aurelia_pal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Provides all the logic to produce ripple visual effect.
     * Other elements can use it to simulate rippling effect emanating from the point of contact.
     */
    var PaperRipple = (function () {
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
            var doc = aurelia_pal_1.PLATFORM.global.document;
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
            var wave = new paper_wave_1.PaperWave(this);
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
                aurelia_pal_1.PLATFORM.requestAnimationFrame(this.animate.bind(this));
            }
            return this;
        };
        return PaperRipple;
    }());
    exports.PaperRipple = PaperRipple;
});
