import { customElement, useView, PLATFORM, bindingMode } from 'aurelia-framework';
import { bindable } from 'aurelia-typed-observable-plugin';

@customElement('ux-pagination')
@useView(PLATFORM.moduleName('./ux-pagination.html'))
export class UxPagination {
	@bindable({ defaultBindingMode: bindingMode.twoWay })
	activePage: number = 1;

	@bindable.number
	pages: number = 5;
	pagesChanged() {
		this.setActivePage(1);
	}

	@bindable.number
	visiblePages: number = 15;
	visiblePagesChanged() {
		this.pageLinks = this.generatePageLinks();
	}

	pageLinks: number[] = [];

	@bindable.booleanAttr
	showFirstLast: boolean = true;

	@bindable.booleanAttr
	showPrevNext: boolean = true;

	@bindable.booleanAttr
	showPageLinks: boolean = true;

	bind() {
		this.pageLinks = this.generatePageLinks();
	}

	setActivePage(page: number) {
		this.activePage = page;
		this.pageLinks = this.generatePageLinks();
	}

	setFirstPage() {
		if (this.activePage > 1) {
			this.setActivePage(1);
		}
	}

	setLastPage() {
		if (this.activePage < this.pages) {
			this.setActivePage(this.pages);
		}
	}

	setPreviousPage() {
		if (this.activePage > 1) {
			this.setActivePage(this.activePage - 1);
		}
	}

	setNextPage() {
		if (this.activePage < this.pages) {
			this.setActivePage(this.activePage + 1);
		}
	}

	private generatePageLinks(): number[] {
		const numberOfLinks = Math.min(this.visiblePages, this.pages);
		const midPoint = Math.ceil(numberOfLinks / 2);
		let start = Math.max(this.activePage - midPoint, 1);
		// respect visible links
		if (start + midPoint * 2 > this.pages) {
			start = Math.max(this.pages + 1 - midPoint * 2, 1);
		}
		const end = Math.min(start + numberOfLinks - 1, this.pages);

		const list: number[] = [];
		for (let i = start; i <= end; i++) {
			list.push(i);
		}

		return list;
	}
}
