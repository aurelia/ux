import { Design } from './design';
import { swatches } from '../colors/swatches';
import { shadows } from '../colors/shadows';

export class MaterialDesign implements Design {
  public type = 'material';

  public appBackground = swatches.grey.p50;
  public appForeground = swatches.grey.p900;

  public surfaceBackground = swatches.grey.p100;
  public surfaceForeground = swatches.grey.p900;

  public controlBackground = swatches.grey.p300;
  public controlForeground = swatches.grey.p900;
  public controlLabelColor = swatches.grey.p600;

  public primary = swatches.indigo.p500;
  public primaryForeground = swatches.white;

  public primaryLight = swatches.indigo.p100;
  public primaryLightForeground = swatches.grey.p500;

  public primaryDark = swatches.indigo.p700;
  public primaryDarkForeground = swatches.white;

  public accent = swatches.pink.a200;
  public accentForeground = swatches.white;

  public accentLight = swatches.pink.a100;
  public accentLightForeground = swatches.white;

  public accentDark = swatches.pink.a400;
  public accentDarkForeground = swatches.white;

  public disabledBackground = swatches.grey.p500;
  public disabledForeground = swatches.blueGrey.p100;

  public error = swatches.red.p500;
  public onError = swatches.white;

  public elevationNone = shadows.depth_0;
  public elevation2dp = shadows.depth_2dp;
  public elevation3dp = shadows.depth_3dp;
  public elevation4dp = shadows.depth_4dp;
  public elevation6dp = shadows.depth_6dp;
  public elevation8dp = shadows.depth_8dp;
  public elevation16dp = shadows.depth_16dp;
  public elevation24dp = shadows.depth_24dp;
  public elevationFocus = shadows.depth_focus;
}
