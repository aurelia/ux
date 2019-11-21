/**
 * A style to be applied to the global style list.
 *
 * When a tagGroup is present, the styles will be grouped with
 * other elements that share the same base tag.
 */
export interface GlobalStyle {
    /** ID of the style, used for unique identification and labels */
    id: string;
    /** Css value that will be inserted into the global style tag */
    css: string;
    /**
     * Causes the css to be grouped with all other global styles
     * that share the same tag
     */
    tagGroup?: string;
}
