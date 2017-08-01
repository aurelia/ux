import { BindingEngine, Disposable } from 'aurelia-framework';
import { AutoSelectionStrategy, autoSelectionStrategies } from './auto-selection-strategy';
import { SelectablesObserver } from './selectables-observer';
import { UxTab } from '../ux-tab';

export class SelectionManager implements Disposable {

  constructor(
    private readonly bindingEngine: BindingEngine,
    private readonly selectedTabChanged?: (oldTab: UxTab|null, newTab: UxTab|null) => void
  ) {}

  private tabs: UxTab[];

  public selectedTab: UxTab|null = null;
  private selectedIndex = -1;
  private selectedTabDisabledDisposable: Disposable|null = null;

  private isUpdatingSelected = false;

  private readonly tabsSelectionObserver = new SelectablesObserver<UxTab>(
    this.bindingEngine,
    tab => this.tabSelectedChanged(tab));

  public autoSelectionStrategy: AutoSelectionStrategy = autoSelectionStrategies.first;

  public setTabs(tabs: UxTab[]) {
    this.tabs = tabs;
    this.tabsSelectionObserver.update(this.tabs);

    this.tabs.filter(t => t.selected && t.disabled).forEach(t => { this.setSelected(t, false); });

    if (!this.selectedTab || !this.tabs.includes(this.selectedTab)) {
      const selected = this.tabs.filter(t => t.selected);
      while (selected.length > 1) {
        this.setSelected(selected.shift() as UxTab, false);
      }
      if (selected.length === 1) {
        this.select(this.tabs.indexOf(selected[0]));
      } else {
        this.autoSelect();
      }
    } else {
      const newSelected = this.tabs.filter(t => t.selected && t !== this.selectedTab);
      while (newSelected.length > 1) {
        this.setSelected(newSelected.shift() as UxTab, false);
      }
      if (newSelected.length === 1) {
        this.select(this.tabs.indexOf(newSelected[0]));
      }
    }
  }

  private setSelected(tab: UxTab, value: boolean) {
    this.isUpdatingSelected = true;
    tab.selected = value;
    this.isUpdatingSelected = false;
  }

  private selectedTabDisabledChanged() {
    if (this.selectedTab && this.selectedTab.disabled) {
      this.autoSelect();
    }
  }

  private tabSelectedChanged(tab: UxTab) {
    if (this.isUpdatingSelected) {
      return;
    }

    if (tab === this.selectedTab && !tab.selected) {
      this.autoSelect(autoSelectionStrategies.first);
    } else if (tab !== this.selectedTab && tab.selected) {
      if (!this.trySelect(tab)) {
        tab.selected = false;
      }
    }
  }

  private autoSelect(strategy?: AutoSelectionStrategy) {
    const indexOfTabToSelect = (strategy || this.autoSelectionStrategy)(this.tabs, this.selectedIndex);
    this.select(indexOfTabToSelect);
  }

  private trySelect(tab: UxTab) {
    if (tab.disabled) {
      return false;
    }
    if (this.selectedTab === tab) {
      return true;
    }

    const index = this.tabs.indexOf(tab);
    if (index < 0) {
      return false;
    }

    this.select(index);
    return true;
  }

  private unselect() {
    if (this.selectedTab) {
      this.setSelected(this.selectedTab, false);
      this.selectedTab = null;
      this.selectedIndex = -1;
      if (this.selectedTabDisabledDisposable) {
        this.selectedTabDisabledDisposable.dispose();
        this.selectedTabDisabledDisposable = null;
      }
    }
  }

  private select(index: number) {
    const oldTab = this.selectedTab;
    this.unselect();

    let tab = null;
    if (index >= 0 && index < this.tabs.length) {
      tab = this.tabs[index];
      this.selectedTab = tab;
      this.selectedIndex = index;
      this.selectedTabDisabledDisposable = this.bindingEngine
        .propertyObserver(tab, 'disabled')
        .subscribe(() => this.selectedTabDisabledChanged());
      this.setSelected(tab, true);
    }

    if (this.selectedTabChanged && (oldTab || tab) && (oldTab !== tab)) {
      this.selectedTabChanged(oldTab, tab);
    }
  }

  public dispose() {
    this.unselect();
    this.tabsSelectionObserver.clear();
  }
}
