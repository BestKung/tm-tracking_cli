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
var search_report_1 = require("../../report/search_report");
var http_1 = require("@angular/http");
/**
 * Created by neng on 21/11/2559.
 */
var NotificationRestObjectService = (function () {
    function NotificationRestObjectService(http) {
        this.http = http;
        this.searchReport = new search_report_1.SearchReport();
    }
    NotificationRestObjectService.prototype.clearParam = function () {
        this.searchReport = new search_report_1.SearchReport();
    };
    NotificationRestObjectService.prototype.searchNotification = function (pageEvent) {
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.searchReport.trNo || null);
        params.set('formType', this.searchReport.formType || null);
        params.set('startDate', this.searchReport.startDate || null);
        params.set('endDate', this.searchReport.endDate || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/report-follow', { search: params }).map(function (data) { return data.json(); });
    };
    NotificationRestObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], NotificationRestObjectService);
    return NotificationRestObjectService;
}());
exports.NotificationRestObjectService = NotificationRestObjectService;
//# sourceMappingURL=notification-rest-obj.service.js.map