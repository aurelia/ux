import {styles} from '../styles/decorators';

@styles()
export class UxButtonTheme {
  public type = 'raised';
  public size = 'medium';

  public background: string;
  public foreground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;
}
