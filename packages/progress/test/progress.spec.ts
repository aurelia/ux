import './setup';
import { UxProgress } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/progress', () => {
  describe('progress.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxProgress = container.get(UxProgress);

      const spies = [
        spyOn(uxProgress as any, 'update'),
      ];
      uxProgress.bind();
    
      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
