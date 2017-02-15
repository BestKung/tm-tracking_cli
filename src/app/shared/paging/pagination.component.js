"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Created by pramoth on 10/16/2016 AD.
 */
var core_1 = require("@angular/core");
var page_1 = require("../page");
var _ = require("underscore");
var PaginationComponent = (function () {
    function PaginationComponent() {
        this._page = new page_1.Page();
        this.currentPage = 1;
        this.windowSize = 10;
        this.pageSize = 10;
        this.canSelectSize = true;
        this.pageChange = new core_1.EventEmitter();
    }
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (page) {
            console.log("page", page);
            this._page = page;
            this.calculateWindowSize();
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngOnInit = function () {
        this.page.totalPages = 1;
        this.calculateWindowSize();
    };
    PaginationComponent.prototype.calculateWindowSize = function () {
        var startPage, endPage;
        if (this.page.totalPages <= this.windowSize) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = this.page.totalPages;
        }
        else {
            console.log(">>>>>>>>>>>>>>>>>> ", this.currentPage);
            // more than 10 total pages so calculate start and end pages
            if (this.currentPage <= 6) {
                startPage = 1;
                endPage = this.windowSize;
            }
            else if (this.currentPage + 4 >= this.page.totalPages) {
                startPage = this.page.totalPages - 9;
                endPage = this.page.totalPages;
            }
            else {
                startPage = this.currentPage - 5;
                endPage = this.currentPage + 4;
            }
        }
        console.log('startPage {}', startPage);
        console.log('endPage {}', endPage);
        this.pages = _.range(startPage, endPage + 1);
        console.log(this.pages);
    };
    PaginationComponent.prototype.clickItem = function (page) {
        this.currentPage = page;
        this.pageChange.next({ currentPage: this.currentPage, pageSize: this.pageSize });
        this.calculateWindowSize();
        console.log("currentPage", this.currentPage);
    };
    PaginationComponent.prototype.next = function () {
        if (this.currentPage < this.page.totalPages) {
            this.clickItem(this.currentPage + 1);
            this.calculateWindowSize();
        }
    };
    PaginationComponent.prototype.back = function () {
        if (this.currentPage > 1) {
            this.clickItem(this.currentPage - 1);
            this.calculateWindowSize();
        }
    };
    PaginationComponent.prototype.setPageSize = function (pageSize) {
        this.pageSize = pageSize;
        this.clickItem(1);
    };
    __decorate([
        core_1.Input("canSelectSize"), 
        __metadata('design:type', Boolean)
    ], PaginationComponent.prototype, "canSelectSize", void 0);
    __decorate([
        core_1.Input("page"), 
        __metadata('design:type', page_1.Page), 
        __metadata('design:paramtypes', [page_1.Page])
    ], PaginationComponent.prototype, "page", null);
    __decorate([
        core_1.Output("pageChange"), 
        __metadata('design:type', core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageChange", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'pagination',
            templateUrl: "pagination.html",
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map