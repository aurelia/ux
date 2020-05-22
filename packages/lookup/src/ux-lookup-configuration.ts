import { UxLookupTheme } from './ux-lookup-theme';

export class UxDefaultLookupConfiguration {
  public theme: UxLookupTheme;
  public searchingMessage: string = 'Searching...';
  public notFoundMessage: string = 'Not found';
  public debounce: number = 850;
}
