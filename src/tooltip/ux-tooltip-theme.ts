import {styles} from '../styles/decorators';

@styles()
export class UxTooltipTheme {
  public effect = 'ease'; // ease or none
  public position = 'bottom'; // top, right, bottom or left

  public background: string;
  public foreground: string;
}
