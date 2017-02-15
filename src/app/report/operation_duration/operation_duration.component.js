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
var search_report_1 = require("../search_report");
var page_1 = require("../../shared/page");
var http_1 = require("@angular/http");
var notification_rest_obj_service_1 = require("../../shared/service/notification-rest-obj.service");
var router_1 = require("@angular/router");
var intercept_http_1 = require("../../shared/intercept_http");
var OperationDurationComponent = (function () {
    function OperationDurationComponent(http, notifRestService, _route) {
        this.http = http;
        this.notifRestService = notifRestService;
        this._route = _route;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    OperationDurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.notifRestService.searchReport.trNo
                || _this.notifRestService.searchReport.endDate
                || _this.notifRestService.searchReport.startDate
                || _this.notifRestService.searchReport.formType) {
                if (val.url.startsWith("/reports/operation-duration")) {
                    _this.searchAction();
                }
                else {
                    _this.notifRestService.clearParam();
                }
            }
        });
    };
    OperationDurationComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    OperationDurationComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.notifRestService.searchNotification(pageEvent).subscribe(function (data) {
            _this.pageData = data;
        });
    };
    OperationDurationComponent.prototype.clear = function () {
        this.notifRestService.searchReport = new search_report_1.SearchReport();
        this.notifRestService.searchReport.formType = '';
    };
    OperationDurationComponent.prototype.excelDownload = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.notifRestService.searchReport.trNo || null);
        params.set('form_type', this.notifRestService.searchReport.formType || null);
        params.set('start_date', this.notifRestService.searchReport.startDate || null);
        params.set('end_date', this.notifRestService.searchReport.endDate || null);
        jQuery(window.open('/report/flow.xlsx?reportPath=/report/report_flow/report_flow.jasper&'
            + params.toString()));
    };
    OperationDurationComponent.prototype.pdfDownload = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.notifRestService.searchReport.trNo || null);
        params.set('form_type', this.notifRestService.searchReport.formType || null);
        params.set('start_date', this.notifRestService.searchReport.startDate || null);
        params.set('end_date', this.notifRestService.searchReport.endDate || null);
        jQuery(window.open('/report/flow.pdf?reportPath=/report/report_flow/report_flow.jasper&'
            + params.toString()));
    };
    OperationDurationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'operation-duration',
            templateUrl: 'operation_duration.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, notification_rest_obj_service_1.NotificationRestObjectService, router_1.Router])
    ], OperationDurationComponent);
    return OperationDurationComponent;
}());
exports.OperationDurationComponent = OperationDurationComponent;
//# sourceMappingURL=operation_duration.component.js.map