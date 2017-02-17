import {styles} from '../styles/decorators';

@styles()
export class UxInputTheme {
  public type = 'single-line'; // flat, raised or fab

  public background: string;
  public foreground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;
}
