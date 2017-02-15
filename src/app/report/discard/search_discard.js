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
var core_1 = require("@angular/core");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var page_1 = require("../../shared/page");
var intercept_http_1 = require("../../shared/intercept_http");
var SearchDiscard = (function () {
    function SearchDiscard(http) {
        this.http = http;
        this.pageData = new page_1.Page();
        this.search = new SearchDiscardRequest();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    SearchDiscard.prototype.ngOnInit = function () {
    };
    SearchDiscard.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("matra", this.search.type || null);
        params.set("expireDate", this.search.expireDate || null);
        params.set("extraExpireDate", this.search.extraExpireDate || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/discard-report/search', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.pageData = resp;
        });
    };
    SearchDiscard.prototype.exportTo = function (type) {
        var outputFileName = '';
        if ("pdf" == type) {
            outputFileName = 'discard.pdf';
            jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/cancelation/discard.jasper&tr_no=' + (this.search.trNo == undefined ? '' : this.search.trNo) + '&matra=' + (this.search.type == undefined ? '' : this.search.type) + '&expire_date=' + (this.search.expireDate == undefined ? '' : this.search.expireDate) + "&extra_expire_date=" + (this.search.extraExpireDate == undefined ? '' : this.search.extraExpireDate)));
        }
        if ("xls" == type) {
            outputFileName = 'discard.xls';
            jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/cancelation/discard.jasper&tr_no=' + (this.search.trNo || null) + '&matra=' + (this.search.type || null) + '&expire_date=' + (this.search.expireDate || null) + "&extra_expire_date=" + (this.search.extraExpireDate || null)));
        }
    };
    SearchDiscard.prototype.clear = function () {
        this.search = new SearchDiscardRequest();
    };
    SearchDiscard.prototype.matraChange = function (event) {
        this.search.type = event.target.value;
    };
    SearchDiscard = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "search-discard",
            templateUrl: "search_discard.html"
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp])
    ], SearchDiscard);
    return SearchDiscard;
}());
exports.SearchDiscard = SearchDiscard;
var SearchDiscardRequest = (function () {
    function SearchDiscardRequest() {
        this.type = '56';
    }
    return SearchDiscardRequest;
}());
exports.SearchDiscardRequest = SearchDiscardRequest;
//# sourceMappingURL=search_discard.js.map