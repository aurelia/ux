import {styles} from '../styles/decorators';

@styles()
export class UxButtonTheme {
  public type = 'raised'; // flat, raised or fab
  public size = 'medium'; // small, medium or large
  public effect = 'ripple'; // ripple or none

  public background: string;
  public foreground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;
}
