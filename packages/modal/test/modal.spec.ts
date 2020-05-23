import './setup';
import { UxModal } from '../src/index';
import { Container } from 'aurelia-framework';

describe('@aurelia-ux/modal', () => {
  describe('modal.spec.ts', () => {
    it('binds/unbinds correctly', () => {
      const container = new Container();
      const host = document.createElement('div');
      container.registerInstance(Element, host);
      const uxModal = container.get(UxModal);

      const spies = [
        spyOn(uxModal, 'themeChanged'),
        spyOn(uxModal, 'setViewportType'),
        spyOn(uxModal, 'positionChanged'),
        spyOn(uxModal, 'modalBreakpointChanged'),
        spyOn(uxModal, 'hostChanged'),
        spyOn(uxModal, 'overlayDismissChanged'),
        spyOn(uxModal, 'outsideDismissChanged'),
        spyOn(uxModal, 'lockChanged'),
        spyOn(uxModal, 'keyboardChanged'),
      ];
      uxModal.bind(/* binding context */{});
    
      spies.forEach(spy => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      uxModal.unbind();
    });
  });
});
