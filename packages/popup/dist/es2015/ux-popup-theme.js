let UxPopupTheme = /** @class */ (() => {
    class UxPopupTheme {
        constructor() {
            this.themeKey = 'dropdown';
            this.transitionDuration = UxPopupTheme.DEFAULT_TRANSITION_DURATION;
            this.background = '#F5F5F5';
            this.foreground = '#212121';
            this.elevation = '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)';
            this.triggerDistance = UxPopupTheme.DEFAULT_TRIGGER_DISTANCE;
            this.windowEdgeDistance = UxPopupTheme.DEFAULT_WINDOW_EDGE_DISTANCE;
        }
    }
    UxPopupTheme.DEFAULT_TRIGGER_DISTANCE = 3;
    UxPopupTheme.DEFAULT_WINDOW_EDGE_DISTANCE = 15;
    UxPopupTheme.DEFAULT_TRANSITION_DURATION = '125ms';
    return UxPopupTheme;
})();
export { UxPopupTheme };
//# sourceMappingURL=ux-popup-theme.js.map