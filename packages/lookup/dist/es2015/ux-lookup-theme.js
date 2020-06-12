let UxLookupTheme = /** @class */ (() => {
    class UxLookupTheme {
        constructor() {
            this.themeKey = 'lookup';
            this.transitionDuration = UxLookupTheme.DEFAULT_TRANSITION_DURATION;
            this.background = '#F5F5F5';
            this.foreground = '#212121';
            this.elevation = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
            this.optionHoverBackground = 'rgba(0, 0, 0, 0.05)';
            this.optionFocusedBackground = 'rgba(0, 0, 0, 0.1)';
            this.inputDistance = UxLookupTheme.DEFAULT_INPUT_DISTANCE;
            this.windowEdgeDistance = UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE;
            this.bottomHeightThreshold = UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD;
        }
    }
    UxLookupTheme.DEFAULT_INPUT_DISTANCE = 3;
    UxLookupTheme.DEFAULT_WINDOW_EDGE_DISTANCE = 15;
    UxLookupTheme.DEFAULT_BOTTOM_HEIGHT_THRESHOLD = 100;
    UxLookupTheme.DEFAULT_TRANSITION_DURATION = '125ms';
    return UxLookupTheme;
})();
export { UxLookupTheme };
//# sourceMappingURL=ux-lookup-theme.js.map