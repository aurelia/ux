import './setup';
import { UxSelect, UxSelectElement } from '../src/index';
import { Container, TaskQueue } from 'aurelia-framework';

describe('@aurelia-ux/select', () => {
  describe('select.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div') as unknown as UxSelectElement;
      const radioEl = host.appendChild(document.createElement('input'));
      container.registerInstance(Element, host);
      const uxSelect = container.get(UxSelect);
      host['au'] = {
        controller: { viewModel: uxSelect }
      };

      const spies = [
        spyOn(uxSelect, 'call'),
      ];
      uxSelect.bind();
      container.get(TaskQueue).flushMicroTaskQueue();
    
      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      const getValueSpy = spyOn(uxSelect, 'getValue');
      const setValueSpy = spyOn(uxSelect, 'setValue');
      const getOptionsSpy = spyOn(uxSelect, 'getOptions').and.callThrough();

      const options = host.options;
      expect(options instanceof Array).toBe(true);
      expect(getOptionsSpy).toHaveBeenCalledTimes(1);

      expect(getValueSpy).toHaveBeenCalledTimes(0);
      const value = host.value;
      expect(getValueSpy).toHaveBeenCalledTimes(1);

      expect(setValueSpy).toHaveBeenCalledTimes(0);
      host.value = value;
      expect(setValueSpy).toHaveBeenCalledTimes(1);
    });
  });
});
