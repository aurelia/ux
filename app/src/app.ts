import { ThemeService } from './theme-service';
import { inject } from 'aurelia-dependency-injection';
import { RouterConfiguration, Router } from 'aurelia-router';
import { routes } from './routes';

@inject(ThemeService)
export class App {
  public router: Router;

  constructor(private themeService: ThemeService) {
    this.themeService.init();
  }

  public activate() {
    document.body.classList.add('theming');
  }

  public deactivate() {
    document.body.classList.remove('theming');
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    this.router = router;

    config.options.root = '/';

    config.map(routes);
  }
}
