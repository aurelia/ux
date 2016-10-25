import {Design} from './design';
import {swatches} from '../colors/swatches';

export class MaterialDesign implements Design {
  type = 'material';
  p1 = swatches.blue.p500;
  p2 = swatches.blue.p100;
  p3 = swatches.blue.p400;
  a1 = swatches.pink.a200;
  a2 = swatches.pink.a100;
  a3 = swatches.pink.a400;
}
