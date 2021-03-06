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
var page_1 = require("../../shared/page");
var cancellation_backup_1 = require("../cancellation_backup");
var search_cancellation_1 = require("../search_cancellation");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var intercept_http_1 = require("../../shared/intercept_http");
/**
 * Created by best on 16/12/2559.
 */
var Matra40Component = (function () {
    function Matra40Component(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.search = new search_cancellation_1.SearchCancellation();
        this.backStatus = new cancellation_backup_1.CancellationBackup();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    Matra40Component.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('trNo', this.search.trNo);
        params.set('start', this.search.start);
        params.set('end', this.search.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/matra40', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    Matra40Component.prototype.clear = function () {
        this.search = new search_cancellation_1.SearchCancellation();
    };
    Matra40Component.prototype.clickBackStatus = function () {
        var _this = this;
        this.http.post('/api/matra40', this.backStatus)
            .subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('ถอยสถานะเรียบร้อย');
        });
    };
    Matra40Component.prototype.clickBackStatusAll = function () {
        var _this = this;
        this.http.post('/api/matra40/all', this.search)
            .subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('ถอยสถานะเรียบร้อย');
        });
    };
    Matra40Component.prototype.openModalConfirm = function (blackCancellation) {
        this.backStatus = blackCancellation;
        jQuery(this.confirm.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
    };
    Matra40Component.prototype.openModalConfirmAll = function () {
        jQuery(this.confirmAll.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
    };
    __decorate([
        core_1.ViewChild('confirm'), 
        __metadata('design:type', core_1.ElementRef)
    ], Matra40Component.prototype, "confirm", void 0);
    __decorate([
        core_1.ViewChild('confirm_all'), 
        __metadata('design:type', core_1.ElementRef)
    ], Matra40Component.prototype, "confirmAll", void 0);
    Matra40Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'matra40',
            templateUrl: 'matra40.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], Matra40Component);
    return Matra40Component;
}());
exports.Matra40Component = Matra40Component;
//# sourceMappingURL=matra40.component.js.map