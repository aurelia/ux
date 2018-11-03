import { PaperWave } from './paper-wave';
/**
 * Provides all the logic to produce ripple visual effect.
 * Other elements can use it to simulate rippling effect emanating from the point of contact.
 */
export declare class PaperRipple {
    /**
     * Gets or sets the initial opacity of the each wave.
     */
    initialOpacity: number;
    /**
     * Gets or sets how fast (opacity per second) the wave fades out.
     */
    opacityDecayVelocity: number;
    /**
     * The object wrapper containing the `$background` DOM element belongs to the current instance.
     */
    $background: HTMLElement;
    /**
     * The object wrapper containing the waves container belongs to the current instance.
     */
    $waves: HTMLElement;
    /**
     * The object wrapper containing all the DOM elements belongs to the current instance.
     */
    $: HTMLElement;
    private waves;
    /**
     * Initializes a new instance of the `PaperRipple` class with the specified `config` object.
     */
    constructor(cfg?: any);
    /**
     * Determines whether all the waves should be re-centered towards the center of the container.
     * @returns If `true`, waves will exhibit a gravitational pull towards the center of the container as they fade away.
     */
    /**
    * Sets the value that indicates whether all the waves should be re-centered towards the center of the container.
    * @returns Nothing.
    */
    recenters: boolean;
    /**
     * Determines whether all the waves should start a movement from the center of the container.
     * @returns If `true`, waves will center inside its container
     */
    /**
    * Sets the value that indicates whether all the waves should start a movement from the center of the container.
    * @returns Nothing.
    */
    center: boolean;
    /**
     * Determines whether ripple effect should apply within a circle.
     * @returns If `true`, ripple effect will apply within a circle.
     */
    /**
    * Sets the value that indicates whether ripple effect should apply within a circle.
    * @returns Nothing.
    */
    round: boolean;
    /**
     * Determines whether the ripple should keep animating or not.
     * @returns `true`, if so, otherwise `false`.
     */
    readonly shouldKeepAnimating: boolean;
    private initTarget;
    /**
     * Adds new wave to the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    addWave(): PaperWave;
    /**
     * Produces a ripple-down effect.
     *
     * @param  ev Object containing coordinates of the point of contact.
     * @returns Current instance for method chaining.
     */
    downAction(ev: MouseEvent): this;
    /**
     * Produces a ripple-up effect.
     * @returns {PaperRipple} Current instance for method chaining.
     */
    upAction(): this;
    /**
     * Removes given wave from the list of visual ripples.
     * @param wave - The wave to remove.
     * @returns Current instance for method chaining.
     */
    removeWave(wave: PaperWave): this;
    /**
     * Animates all the waves in the list of visual ripples.
     * @returns Current instance for method chaining.
     */
    animate(): this;
}
