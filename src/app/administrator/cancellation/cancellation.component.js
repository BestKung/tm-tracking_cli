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
 * Created by best on 9/12/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var CancellationComponent = (function () {
    function CancellationComponent(http, toaStr) {
        this.http = http;
        this.toaStr = toaStr;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    CancellationComponent.prototype.ngOnInit = function () {
    };
    CancellationComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('expireDate', this.expireDate);
        params.set('sort', 'trNo,DESC');
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-matra56', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    CancellationComponent.prototype.cancellation = function (trNo) {
        var _this = this;
        var params = { trNo: null };
        params.trNo = trNo;
        this.http.post('/api/test-matra56', params).subscribe(function (data) {
            _this.searchAction();
            _this.toaStr.success('เพิกถอนเลข ' + trNo + ' เเล้ว');
        });
    };
    CancellationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cancellation',
            templateUrl: 'cancellation.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], CancellationComponent);
    return CancellationComponent;
}());
exports.CancellationComponent = CancellationComponent;
//# sourceMappingURL=cancellation.component.js.map