import { autoinject } from 'aurelia-framework';
import { UxResponsiveUtilities } from '@aurelia-ux/grid';

@autoinject()
export class Grid {
  
  constructor(public uxResponsive: UxResponsiveUtilities) {}
}
