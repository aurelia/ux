import './setup';
import { createFixture } from "../util";
import { PLATFORM } from 'aurelia-pal';
import { inlineView } from 'aurelia-framework';

describe('__tests__/input.integration.spec.ts', () => {
  it('works in basic scenario', async () => {

    @inlineView('<template>${message}<ux-input value.bind="message">')
    class App {
      message = 'hello'
    }

    const {
      host,
      dispose
    } = await createFixture(
      App,
      [],
      aurelia => {
        aurelia.use
          .feature(PLATFORM.moduleName('@aurelia-ux/core/index'))
          .feature(PLATFORM.moduleName('@aurelia-ux/input/index'))
      }
    );

    expect(host.textContent!.trim()).toBe('hello');
    expect(host.querySelector('input')!.value).toBe('hello');

    dispose();
  });
});
