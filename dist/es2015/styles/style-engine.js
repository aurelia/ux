export class StyleEngine {
    applyTheme(themable, theme) {
        let instance;
        if (typeof theme === 'string') {
            instance = themable.resources.getValue(theme);
            console.log(themable, theme, instance);
        }
    }
}
