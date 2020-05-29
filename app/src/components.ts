import { observable } from "aurelia-binding";
import { timingSafeEqual } from "crypto";

export class Components {

  public interests: Array<string> = ['sport'];
  public interests2: Array<string> = ['technology'];
  public ageGroup: string = '20-40';
  public ageGroup2: string = '40+';
  public lookupOptions = Array.from({ length: 20 }, (x, i) => ({ id: i, name: `option ${i}${i === 5 ? ' loooooooooooooong' : ''}` }));
  public lookupValue = this.lookupOptions[1];
  public treeViewNodes = [
    { name: 'item1', children: [{ name: 'child11', children: [{ name: 'child111' }, { name: 'child112' }] }, { name: 'child12' }] },
    { name: 'item2', children: [{ name: 'child21' }, { name: 'child22' }] }
  ];

  @observable
  public progressIndeterminate: boolean = false;
  progressIndeterminateChanged() {
    this.progressValue = this.progressIndeterminate ? undefined : 75;
  }

  public progressValue: number | undefined = 75;
}
