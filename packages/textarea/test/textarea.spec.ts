import './setup';
import { UxTextArea } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/textarea', () => {
  describe('textarea.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      const textboxEl = host.appendChild(document.createElement('textarea'));
      container.registerInstance(Element, host);
      const uxTextArea = container.get(UxTextArea);
      uxTextArea['textbox'] = textboxEl;

      const spies = [
        spyOn(uxTextArea, 'themeChanged'),
        spyOn(uxTextArea, 'autocompleteChanged')
      ];

      uxTextArea.bind();

      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
