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
var page_1 = require("../../../shared/page");
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../../../shared/date-support-url-search-params");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
/**
 * Created by best on 15/12/2559.
 */
var CancellationMatra40Component = (function () {
    function CancellationMatra40Component(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    CancellationMatra40Component.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('expireDate', this.expireDate);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-matra40', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    CancellationMatra40Component.prototype.cancellation = function (trNo) {
        var _this = this;
        this.http.post('/api/test-matra40', { 'trNo': trNo })
            .subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('จำหน่ายเลขคำขอ ' + trNo + ' เรีบยร้อย');
        });
    };
    CancellationMatra40Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cancellation-matra-40',
            templateUrl: 'matra40.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], CancellationMatra40Component);
    return CancellationMatra40Component;
}());
exports.CancellationMatra40Component = CancellationMatra40Component;
//# sourceMappingURL=matra40.component.js.map