import { observable } from "aurelia-binding";
import { timingSafeEqual } from "crypto";

export class Components {

  public interests: Array<string> = ['sport'];
  public interests2: Array<string> = ['technology'];
  public ageGroup: string = '20-40';
  public ageGroup2: string = '40+';

  @observable
  public progressIndeterminate: boolean = false;
  progressIndeterminateChanged() {
    this.progressValue = this.progressIndeterminate ? undefined : 75;
  }

  public progressValue: number | undefined = 75;
}
