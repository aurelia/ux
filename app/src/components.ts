export class Components {

  public interests: Array<string> = ['sport'];
  public interests2: Array<string> = ['technology'];
  public ageGroup: string = '20-40';
  public ageGroup2: string = '40+';
  public lookupOptions = Array.from({ length: 20 }, (x, i) => ({ id: i, name: `option ${i}${i === 5 ? ' loooooooooooooong' : ''}` }));
  public lookupValue = this.lookupOptions[1];
}
