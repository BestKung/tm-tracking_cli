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
 * Created by neng on 4/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var search_print_book_inform_1 = require("../../print-inform/print_book_inform/search_print_book_inform");
var intercept_http_1 = require("../../shared/intercept_http");
var SearchAnnouncementToPopulationStatistics = (function () {
    function SearchAnnouncementToPopulationStatistics(http) {
        this.http = http;
        this.searchPrintBookInform = new search_print_book_inform_1.SearchPrintBookInform();
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    SearchAnnouncementToPopulationStatistics.prototype.ngOnInit = function () {
        this.searchPrintBookInform = new search_print_book_inform_1.SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
    };
    SearchAnnouncementToPopulationStatistics.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.searchPrintBookInform.trNo || null);
        params.set('formType', this.searchPrintBookInform.formType || null);
        params.set('startDate', this.searchPrintBookInform.startDate || null);
        params.set('endDate', this.searchPrintBookInform.endDate || null);
        params.set('whereBookAdmin', '1');
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed-template', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    SearchAnnouncementToPopulationStatistics.prototype.printPdf = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.searchPrintBookInform.trNo || null);
        params.set('form_type', this.searchPrintBookInform.formType || null);
        params.set('start_date', this.searchPrintBookInform.startDate || null);
        params.set('end_date', this.searchPrintBookInform.endDate || null);
        jQuery(window.open('/report/statistict_population.pdf?reportPath=/report/nontification_population/nontification_population.jasper'
            + '&' + params.toString()));
    };
    SearchAnnouncementToPopulationStatistics.prototype.printXlsx = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.searchPrintBookInform.trNo || null);
        params.set('form_type', this.searchPrintBookInform.formType || null);
        params.set('start_date', this.searchPrintBookInform.startDate || null);
        params.set('end_date', this.searchPrintBookInform.endDate || null);
        jQuery(window.open('/report/statistict_population.xlsx?reportPath=/report/nontification_population/nontification_population.jasper'
            + '&' + params.toString()));
    };
    SearchAnnouncementToPopulationStatistics.prototype.clear = function () {
        this.searchPrintBookInform = new search_print_book_inform_1.SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
    };
    SearchAnnouncementToPopulationStatistics = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "search-announcement-to-population-statistics",
            templateUrl: "search_announcement_to_population_statistics.html"
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp])
    ], SearchAnnouncementToPopulationStatistics);
    return SearchAnnouncementToPopulationStatistics;
}());
exports.SearchAnnouncementToPopulationStatistics = SearchAnnouncementToPopulationStatistics;
//# sourceMappingURL=search_announcement_to_population_statistics_component.js.map