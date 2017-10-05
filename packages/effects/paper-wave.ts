import { PLATFORM } from 'aurelia-pal';
import { ElementRect } from './element-rect';
import { Point } from './point';

// tslint:disable:variable-name
const _window: Window = PLATFORM.global;
const  _doc = _window.document;
const  _now = PLATFORM.performance.now.bind(PLATFORM.performance);
// tslint:enable:variable-name

/**
 * Provides all the logic to produce a one-time rippling effect.
 */
export class PaperWave {
  /**
   * Gets or sets the color of the wave.
   */
  public color: string | null;

  /**
   * Gets or sets the container metrics of the wave.
   */
  public containerRect: ElementRect;

  /**
   * Determines whether the wave should be re-centered towards the center of its container.
   */
  public recenters: boolean;

  /**
   * Determines whether the wave should start a movement from the center of its container.
   */
  public center: boolean;

  /**
   * Gets initial opacity of the wave.
   */
  public initialOpacity: number;

  /**
   * Gets opacity decay velocity of the wave.
   */
  public opacityDecayVelocity: number;

  /**
   * Represents the object wrapped around the `wave` DOM element that belongs to the current instance.
   */
  public $wave: HTMLDivElement;

  /**
   * Represents the object wrapped around the main DOM element that belongs to the current instance.
   */
  public $: HTMLDivElement;

  /**
   * Represents the max possible value of the wave's radius.
   */
  public static MAX_RADIUS = 300;

  /**
   * Gets or sets max radius of the wave.
   */
  public maxRadius: number;

  /**
   * Gets or sets the time of starting interaction with the wave.
   */
  public touchDownStarted: number;

  /**
   * Gets or sets the time of ending interaction with the wave.
   */
  private touchUpStarted: number;

  /**
   * Gets or sets the start position of the wave.
   */
  private startPosition: Point;

  /**
   * Gets or sets the end position of the wave.
   */
  private endPosition: Point;

  /**
   * Initializes a new instance of the `PaperWave` class with the specified `PaperRipple` instance.
   */
  constructor(options: any) {
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

  /**
   * Gets the time in milliseconds elapsed from the moment where interaction with the wave was started.
   * @returns The time in milliseconds.
   */
  get touchDownElapsed() {
    if (!this.touchDownStarted) {
      return 0;
    }

    let elapsed = _now() - this.touchDownStarted;

    if (this.touchUpStarted) {
      elapsed -= this.touchUpElapsed;
    }

    return elapsed;
  }

  /**
   * Gets the time in milliseconds elapsed from the moment where interaction with the wave was ended.
   * @returns The time in milliseconds.
   */
  get touchUpElapsed() {
    return this.touchUpStarted ? _now() - this.touchUpStarted : 0;
  }

  /**
   * Gets the time in seconds elapsed since the moment where interaction with the wave was started.
   * @returns The time in seconds.
   */
  get touchDownElapsedSeconds() {
    return this.touchDownElapsed / 1000;
  }

  /**
   * Gets the time in seconds elapsed since the moment where interaction with the wave was ended.
   * @returns The time in seconds.
   */
  get touchUpElapsedSeconds() {
    return this.touchUpElapsed / 1000;
  }

  /**
   * Gets the total interaction time.
   * @returns The time in seconds
   */
  get mouseInteractionSeconds() {
    return this.touchDownElapsedSeconds + this.touchUpElapsedSeconds;
  }

  /**
   * Gets the wave's radius at the current time.
   *
   * @returns {Number} The value of the wave's radius.
   */
  get radius() {
    const radius = Math.min(
      Math.sqrt(Math.pow(this.containerRect.width, 2) + Math.pow(this.containerRect.height, 2)),
      PaperWave.MAX_RADIUS
    ) * 1.1 + 5;
    const elapsed = 1.1 - 0.2 * (radius / PaperWave.MAX_RADIUS);
    const currentTime = this.mouseInteractionSeconds / elapsed;
    const actualRadius = radius * (1 - Math.pow(80, -currentTime));

    return Math.abs(actualRadius);
  }

  /**
   * Gets the wave's opacity at the current time.
   * @returns The value of the wave's opacity.
   */
  get opacity() {
    if (!this.touchUpStarted) {
      return this.initialOpacity;
    }

    return Math.max(0, this.initialOpacity - this.touchUpElapsedSeconds * this.opacityDecayVelocity);
  }

  /**
   * Gets the wave's outer opacity at the current time.
   * @returns The value of the wave's outer opacity.
   */
  get outerOpacity() {
    return Math.max(0, Math.min(this.touchUpElapsedSeconds * 0.3, this.opacity));
  }

  /**
   * Determines whether the wave is fully opaque or not.
   * @returns `true`, if so, otherwise `false`.
   */
  get isWaveFullyOpaque() {
    return this.opacity < 0.01 && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
  }

  /**
   * Determines whether the wave reached its max radius or not.
   * @returns `true`, if so, otherwise `false`.
   */
  get isMaxRadiusReached() {
    return this.opacity >= this.initialOpacity && this.radius >= Math.min(this.maxRadius, PaperWave.MAX_RADIUS);
  }

  /**
   * Determines whether the animation of rippling effect completed or not.
   * @returns `true`, if so, otherwise `false`.
   */
  get isAnimationComplete() {
    return this.touchUpStarted ? this.isWaveFullyOpaque : this.isMaxRadiusReached;
  }

  /**
   * Gets the wave's translation fraction value.
   * @returns The value of the wave's translation fraction.
   */
  get translationFraction() {
    return Math.min(1, this.radius / this.containerRect.size * 2 / Math.sqrt(2));
  }

  /**
   * Gets the wave's current position.
   * @returns {{x: Number, y: Number}} Object containing coordinates of the wave's current position.
   */
  get currentPosition() {
    const translateFraction = this.translationFraction;
    let x = this.startPosition.x;
    let y = this.startPosition.y;

    if (this.endPosition.x) {
      x = this.startPosition.x + translateFraction * (this.endPosition.x - this.startPosition.x);
    }

    if (this.endPosition.y) {
      y = this.startPosition.y + translateFraction * (this.endPosition.y - this.startPosition.y);
    }

    return { x, y };
  }

  /**
   * Determines whether the pointing device is still in interaction with the current wave.
   *
   * @returns {Boolean} `true`, if so, otherwise `false`.
   */
  get isTouchDown() {
    return this.touchDownStarted && !this.touchUpStarted;
  }

  /**
   * Resets all the wave's values.
   * @returns Current instance for method chaining.
   */
  public resetDefaults() {
    this.maxRadius = 0;
    this.touchDownStarted = 0;
    this.touchUpStarted = 0;
    this.startPosition = { x: 0, y: 0 };
    this.endPosition = { x: 0, y: 0 };
    return this;
  }

  /**
   * Performs updating of the wave's values.
   * @returns Current instance for method chaining.
   */
  public draw() {
    const scaleFactor = this.radius / (this.containerRect.size / 2);
    const containerCenter = this.containerRect.center;
    const currentPos = this.currentPosition;
    const deltaPos = {
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
  }

  /**
   * Performs ripple-down effect on the current wave.
   * @param An object containing coordinates of interaction point to set start position of ripple effect.
   * @returns Current instance for method chaining.
   */
  public downAction(event: MouseEvent | null = null) {
    const containerCenter = this.containerRect.center;

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
  }

  /**
   * Performs ripple-up effect on the current wave.
   * @returns Current instance for method chaining.
   */
  public upAction() {
    if (!this.isTouchDown) {
      return this;
    }

    this.touchUpStarted = _now();

    return this;
  }

  /**
   * Removes the wave from a DOM.
   * @returns Current instance for method chaining.
   */
  public remove() {
    (this.$.parentNode as Node).removeChild(this.$);
    return this;
  }
}
