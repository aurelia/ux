import {Design} from './design';
import {swatches} from '../colors/swatches';

export class IOSDesign implements Design {
  public type = 'ios';

  public primary = swatches.indigo.p500;
  public primaryForeground = swatches.white;

  public primaryLight = swatches.indigo.p100;
  public primaryLightForeground  = swatches.grey.p500;

  public primaryDark = swatches.indigo.p700;
  public primaryDarkForeground = swatches.white;

  public accent = swatches.pink.a200;
  public accentForeground = swatches.white;

  public accentLight = swatches.pink.a100;
  public accentLightForeground = swatches.white;

  public accentDark = swatches.pink.a400;
  public accentDarkForeground = swatches.white;
}
