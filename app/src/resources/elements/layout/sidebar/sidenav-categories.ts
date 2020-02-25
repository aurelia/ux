import { NavModel } from 'aurelia-router';

export class SidenavCategoriesValueConverter {

  public toView(navModels: NavModel[]) {
    console.log('navModels', navModels);
    console.log('array', Array.isArray(navModels));
    const categories = new Map();
    if (!Array.isArray(navModels)) {
      return categories;
    }

    for (const model of navModels) {
      if (model.settings.category === undefined && model.config.nav === true) {
        model.settings.category = null;
      }

      let routes = categories.get(model.settings.category);

      if (!routes) {
        categories.set(model.settings.category, routes = []);
      }

      routes.push(model);
    }
    console.log('categories');
    return categories;
  }
}
