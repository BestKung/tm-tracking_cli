/**
 * Created by pramoth on 10/16/2016 AD.
 */
import {Component, ViewEncapsulation, EventEmitter, Output, Input, OnInit} from "@angular/core";
import {Page} from "../page";
import * as _ from "underscore";
import {PageEvent} from "./page_event";


@Component({
    moduleId: module.id,
    selector: 'pagination',
    templateUrl: "pagination.html",
    encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {
    private _page: Page<any> = new Page<any>();
    private pages: number[];
    private currentPage: number = 1;
    private windowSize: number = 10;
    private pageSize = 10;
    @Input("canSelectSize")
    private canSelectSize: boolean = true;

    @Input("page")
    set page(page: Page<any>) {
        console.log("page", page);
        this._page = page;
        this.calculateWindowSize();
    }

    get page(): Page<any> {
        return this._page;
    }

    @Output("pageChange")
    private pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

    ngOnInit(): void {
        this.page.totalPages = 1;
        this.calculateWindowSize();
    }

    calculateWindowSize() {
        let startPage, endPage;
        if (this.page.totalPages <= this.windowSize) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = this.page.totalPages;
        } else {
            console.log(">>>>>>>>>>>>>>>>>> ", this.currentPage);
            // more than 10 total pages so calculate start and end pages
            if (this.currentPage <= 6) {
                startPage = 1;
                endPage = this.windowSize;
            } else if (this.currentPage + 4 >= this.page.totalPages) {
                startPage = this.page.totalPages - 9;
                endPage = this.page.totalPages;
            } else {
                startPage = this.currentPage - 5;
                endPage = this.currentPage + 4;
            }
        }
        console.log('startPage {}', startPage);
        console.log('endPage {}', endPage);
        this.pages = _.range(startPage, endPage + 1);
        console.log(this.pages);
    }

    clickItem(page: number) {
        this.currentPage = page;
        this.pageChange.next({currentPage: this.currentPage, pageSize: this.pageSize});
        this.calculateWindowSize();
        console.log("currentPage", this.currentPage);
    }

    next() {
        if (this.currentPage < this.page.totalPages) {
            this.clickItem(this.currentPage + 1);
            this.calculateWindowSize();
        }
    }

    back() {
        if (this.currentPage > 1) {
            this.clickItem(this.currentPage - 1);
            this.calculateWindowSize();
        }
    }

    setPageSize(pageSize: number) {
        this.pageSize = pageSize;
        this.clickItem(1);
    }
}
