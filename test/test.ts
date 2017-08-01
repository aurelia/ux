import { IOSDesign } from './../src/designs/ios-design';

describe('The IOS design', () => {
  let iosDesign: IOSDesign;

  beforeEach(() => {
    iosDesign = new IOSDesign();
  });

  it('constructor is  efined', () => {
    expect(iosDesign.constructor).toBeDefined();
  });
});
