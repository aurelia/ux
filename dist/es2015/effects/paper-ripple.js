import { PaperWave } from './paper-wave';
import { PLATFORM } from 'aurelia-pal';
/**
 * Provides all the logic to produce ripple visual effect.
 * Other elements can use it to simulate rippling effect emanating from the point of contact.
 */
export class PaperRipple {
    /**
     * Initializes a new instance of the `PaperRipple` class with the specified `config` object.
     */
    constructor(cfg = {}) {
        this.waves = [];
        this.initialOpacity = cfg.initialOpacity || 0.25;
        this.opacityDecayVelocity = cfg.opacityDecayVelocity || 0.8;
        this.initTarget(cfg && cfg.nodeType ? cfg : cfg.target && cfg.target.nodeType ? cfg.target : null);
        this.recenters = cfg.recenters || this.recenters;
        this.center = cfg.center || this.center;
        this.round = cfg.round || this.round;
    }
    /**
     * Determines whether all the waves should be re-centered towards the center of the container.
     * @returns If `true`, waves will exhibit a gravitational pull towards the center of the container as they fade away.
     */
    get recenters() {
        return this.$.hasAttribute('recenters');
    }
    /**
     * Sets the value that indicates whether all the waves should be re-centered towards the center of the container.
     * @returns Nothing.
     */
    set recenters(newValue) {
        if (newValue) {
            this.$.setAttribute('recenters', '');
        }
        else {
            this.$.removeAttribute('recenters');
        }
    }
    /**
     * Determines whether all the waves should start a movement from the center of the container.
     * @returns If `true`, waves will center inside its container
     */
    get center() {
        return this.$.hasAttribute('center');
    }
    /**
     * Sets the value that indicates whether all the waves should start a movement from the center of the container.
     * @returns Nothing.
     */
    set center(newValue) {
        if (newValue) {
            this.$.setAttribute('center', '');
        }
        else {
            this.$.removeAttribute('center');
        }
    }
    /**
     * Determines whether ripple effect should apply within a circle.
     * @returns If `true`, ripple effect will apply within a circle.
     */
    get round() {
        return this.$.classList.contains('paper-ripple--round');
    }
    /**
     * Sets the value that indicates whether ripple effect should apply within a circle.
     * @returns Nothing.
     */
    set round(newValue) {
        this.$.classList.toggle('paper-ripple--round', newValue);
    }
    /**
     * Determines whether the ripple should keep animating or not.
     * @returns `true`, if so, otherwise `false`.
     */
    get shouldKeepAnimating() {
        return this.waves.some(wave => !wave.isAnimationComplete);
    }
    initTarget(target = null) {
        const doc = PLATFORM.global.document;
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
    }
    /**
     * Adds new wave to the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    addWave() {
        const wave = new PaperWave(this);
        this.$waves.appendChild(wave.$);
        this.$background.style.backgroundColor = wave.color;
        this.waves.push(wave);
        return wave;
    }
    /**
     * Produces a ripple-down effect.
     *
     * @param  ev Object containing coordinates of the point of contact.
     * @returns Current instance for method chaining.
     */
    downAction(ev) {
        const wave = this.addWave();
        wave.downAction(ev);
        this.animate();
        return this;
    }
    /**
     * Produces a ripple-up effect.
     * @returns {PaperRipple} Current instance for method chaining.
     */
    upAction() {
        this.waves.forEach(wave => { wave.upAction(); });
        this.animate();
        return this;
    }
    /**
     * Removes given wave from the list of visual ripples.
     * @param wave - The wave to remove.
     * @returns Current instance for method chaining.
     */
    removeWave(wave) {
        const waveIndex = this.waves.indexOf(wave);
        if (waveIndex < 0) {
            return this;
        }
        this.waves.splice(waveIndex, 1);
        wave.remove();
        return this;
    }
    /**
     * Animates all the waves in the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    animate() {
        // tslint:disable:prefer-const
        for (let i = 0, l = this.waves.length; i < l; i++) {
            const wave = this.waves[i];
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
            PLATFORM.requestAnimationFrame(this.animate.bind(this));
        }
        return this;
    }
}
