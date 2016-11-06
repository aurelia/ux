import { ElementRect } from './element-rect';
/**
 * Provides all the logic to produce a one-time rippling effect.
 */
export declare class PaperWave {
    /**
     * Gets or sets the color of the wave.
     */
    color: string | null;
    /**
     * Gets or sets the container metrics of the wave.
     */
    containerRect: ElementRect;
    /**
     * Determines whether the wave should be re-centered towards the center of its container.
     */
    recenters: boolean;
    /**
     * Determines whether the wave should start a movement from the center of its container.
     */
    center: boolean;
    /**
     * Gets initial opacity of the wave.
     */
    initialOpacity: number;
    /**
     * Gets opacity decay velocity of the wave.
     */
    opacityDecayVelocity: number;
    /**
     * Represents the object wrapped around the `wave` DOM element that belongs to the current instance.
     */
    $wave: HTMLDivElement;
    /**
     * Represents the object wrapped around the main DOM element that belongs to the current instance.
     */
    $: HTMLDivElement;
    /**
     * Represents the max possible value of the wave's radius.
     */
    static MAX_RADIUS: number;
    /**
     * Gets or sets max radius of the wave.
     */
    maxRadius: number;
    /**
     * Gets or sets the time of starting interaction with the wave.
     */
    touchDownStarted: number;
    /**
     * Gets or sets the time of ending interaction with the wave.
     */
    private touchUpStarted;
    /**
     * Gets or sets the start position of the wave.
     */
    private startPosition;
    /**
     * Gets or sets the end position of the wave.
     */
    private endPosition;
    /**
     * Initializes a new instance of the `PaperWave` class with the specified `PaperRipple` instance.
     */
    constructor(options: any);
    /**
     * Gets the time in milliseconds elapsed from the moment where interaction with the wave was started.
     * @returns The time in milliseconds.
     */
    readonly touchDownElapsed: number;
    /**
     * Gets the time in milliseconds elapsed from the moment where interaction with the wave was ended.
     * @returns The time in milliseconds.
     */
    readonly touchUpElapsed: number;
    /**
     * Gets the time in seconds elapsed since the moment where interaction with the wave was started.
     * @returns The time in seconds.
     */
    readonly touchDownElapsedSeconds: number;
    /**
     * Gets the time in seconds elapsed since the moment where interaction with the wave was ended.
     * @returns The time in seconds.
     */
    readonly touchUpElapsedSeconds: number;
    /**
     * Gets the total interaction time.
     * @returns The time in seconds
     */
    readonly mouseInteractionSeconds: number;
    /**
     * Gets the wave's radius at the current time.
     *
     * @returns {Number} The value of the wave's radius.
     */
    readonly radius: number;
    /**
     * Gets the wave's opacity at the current time.
     * @returns The value of the wave's opacity.
     */
    readonly opacity: number;
    /**
     * Gets the wave's outer opacity at the current time.
     * @returns The value of the wave's outer opacity.
     */
    readonly outerOpacity: number;
    /**
     * Determines whether the wave is fully opaque or not.
     * @returns `true`, if so, otherwise `false`.
     */
    readonly isWaveFullyOpaque: boolean;
    /**
     * Determines whether the wave reached its max radius or not.
     * @returns `true`, if so, otherwise `false`.
     */
    readonly isMaxRadiusReached: boolean;
    /**
     * Determines whether the animation of rippling effect completed or not.
     * @returns `true`, if so, otherwise `false`.
     */
    readonly isAnimationComplete: boolean;
    /**
     * Gets the wave's translation fraction value.
     * @returns The value of the wave's translation fraction.
     */
    readonly translationFraction: number;
    /**
     * Gets the wave's current position.
     * @returns {{x: Number, y: Number}} Object containing coordinates of the wave's current position.
     */
    readonly currentPosition: {
        x: number;
        y: number;
    };
    /**
     * Determines whether the pointing device is still in interaction with the current wave.
     *
     * @returns {Boolean} `true`, if so, otherwise `false`.
     */
    readonly isTouchDown: boolean | 0;
    /**
     * Resets all the wave's values.
     * @returns Current instance for method chaining.
     */
    resetDefaults(): this;
    /**
     * Performs updating of the wave's values.
     * @returns Current instance for method chaining.
     */
    draw(): this;
    /**
     * Performs ripple-down effect on the current wave.
     * @param An object containing coordinates of interaction point to set start position of ripple effect.
     * @returns Current instance for method chaining.
     */
    downAction(event?: MouseEvent | null): this;
    /**
     * Performs ripple-up effect on the current wave.
     * @returns Current instance for method chaining.
     */
    upAction(): this;
    /**
     * Removes the wave from a DOM.
     * @returns Current instance for method chaining.
     */
    remove(): this;
}
