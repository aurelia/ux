import {styles} from '../styles/decorators';

@styles()
export class UxInputTheme {
  public background: string = 'transparent';
  public foreground: string;

  public backgroundDisabled: string;
  public foregroundDisabled: string;

  public errorAccent: string;
}
