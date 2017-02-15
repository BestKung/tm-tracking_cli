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
 * Created by best on 29/11/2559.
 */
var core_1 = require("@angular/core");
var manage_stop_duration_1 = require("./manage_stop_duration");
var page_1 = require("../../shared/page");
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ManageStopDurationComponent = (function () {
    function ManageStopDurationComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.manageStopDuration = new manage_stop_duration_1.ManageStopDuration();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    ManageStopDurationComponent.prototype.ngOnInit = function () {
        this.searchAction();
    };
    ManageStopDurationComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('sort', 'id,desc');
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/manage-stop-duration', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    ManageStopDurationComponent.prototype.save = function () {
        var _this = this;
        this.manageStopDuration.createDate = new Date();
        this.http.post('/api/manage-stop-duration', this.manageStopDuration)
            .subscribe(function (data) {
            _this.manageStopDuration = new manage_stop_duration_1.ManageStopDuration();
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.searchAction();
        });
    };
    ManageStopDurationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manage-stop-duration',
            templateUrl: 'manage_stop_duration.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], ManageStopDurationComponent);
    return ManageStopDurationComponent;
}());
exports.ManageStopDurationComponent = ManageStopDurationComponent;
//# sourceMappingURL=menage_stop_duration.component.js.map