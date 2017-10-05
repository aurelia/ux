export interface UxButtonTheme {
  type?: string;   // = 'raised'; // flat, raised or fab
  size?: string;   // = 'medium'; // small, medium or large
  effect?: string; // = 'ripple'; // ripple or none

  background?: string;
  foreground?: string;

  backgroundDisabled?: string;
  foregroundDisabled?: string;
}
