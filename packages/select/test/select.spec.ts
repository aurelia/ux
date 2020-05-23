import './setup';
import { UxSelect } from '../src/index';
import { Container, TaskQueue } from 'aurelia-framework';

describe('@aurelia-ux/select', () => {
  describe('select.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const radioEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxSelect = container.get(UxSelect);

      const spies = [
        spyOn(uxSelect, 'call'),
      ];
      uxSelect.bind();
      container.get(TaskQueue).flushMicroTaskQueue();
    
      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
