import { UxLookupTheme } from './ux-lookup-theme';

export class UxDefaultLookupConfiguration {
  public theme?: UxLookupTheme = void 0;
  public searchingMessage?: string = 'Searching...';
  public notFoundMessage?: string = 'Not found';
  public debounce?: number = 850;
}
