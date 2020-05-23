import './setup';
import { configure, UxButton } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/button/test/index.spec.ts', () => {
  it('binds/unbinds correctly', () => {
    const container = new Container();
    const host = document.createElement('div');
    container.registerInstance(Element, host);
    const btn = container.get(UxButton);

    spyOn(btn, 'disabledChanged');
    spyOn(btn, 'effectChanged');
    spyOn(btn, 'sizeChanged');
    spyOn(btn, 'typeChanged');
    spyOn(btn, 'themeChanged');

    btn.bind();
    expect(btn.disabled).toBe(false);
    expect(btn.disabledChanged).toHaveBeenCalledTimes(0);
    expect(btn.effectChanged).toHaveBeenCalledTimes(1);
    expect(btn.sizeChanged).toHaveBeenCalledTimes(1);
    expect(btn.typeChanged).toHaveBeenCalledTimes(1);
    expect(btn.themeChanged).toHaveBeenCalledTimes(1);
  });
});
