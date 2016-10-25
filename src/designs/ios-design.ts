import {Design} from './design';
import {swatches} from '../colors/swatches';

export class IOSDesign implements Design {
  public type = 'ios';
  public p1 = swatches.blue.p500;
  public p2 = swatches.blue.p100;
  public p3 = swatches.blue.p400;
  public a1 = swatches.pink.a200;
  public a2 = swatches.pink.a100;
  public a3 = swatches.pink.a400;
}
