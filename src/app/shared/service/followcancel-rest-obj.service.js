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
var follow_search_1 = require("../follow_search");
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../date-support-url-search-params");
/**
 * Created by neng on 16/11/2559.
 */
var FollowCancelRestService = (function () {
    function FollowCancelRestService(http) {
        this.http = http;
        this.searchRequest = new follow_search_1.FollowSearch();
        this.stepDesc = {
            '101': 'ตรวจสอบเอกสารรับคำขอ',
            '202': 'นายทะเบียนพิจารณา'
        };
    }
    FollowCancelRestService.prototype.searchFollowCancel = function (pageEvent) {
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('trNo', this.searchRequest.trNo || null);
        params.set('stepCode', this.searchRequest.stepCode || null);
        params.set('startDate', this.searchRequest.startDateStr || null);
        params.set('endDate', this.searchRequest.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-cancel-registration', { search: params })
            .map(function (data) { return data.json(); });
    };
    FollowCancelRestService.prototype.clearParam = function () {
        this.searchRequest = new follow_search_1.FollowSearch();
    };
    FollowCancelRestService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FollowCancelRestService);
    return FollowCancelRestService;
}());
exports.FollowCancelRestService = FollowCancelRestService;
//# sourceMappingURL=followcancel-rest-obj.service.js.map