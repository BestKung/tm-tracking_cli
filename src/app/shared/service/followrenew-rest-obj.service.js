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
var FollowRenewRestObjectService = (function () {
    function FollowRenewRestObjectService(http) {
        this.http = http;
        this.search = new follow_search_1.FollowSearch();
    }
    FollowRenewRestObjectService.prototype.searchFollowRenew = function (pageEvent) {
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('trNo', this.search.trNo || null);
        params.set('stepCode', this.search.stepCode || null);
        params.set('startDate', this.search.startDateStr || null);
        params.set('endDate', this.search.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-renew/search', { search: params }).map(function (data) { return data.json(); });
    };
    FollowRenewRestObjectService.prototype.clearParam = function () {
        this.search = new follow_search_1.FollowSearch();
    };
    FollowRenewRestObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FollowRenewRestObjectService);
    return FollowRenewRestObjectService;
}());
exports.FollowRenewRestObjectService = FollowRenewRestObjectService;
//# sourceMappingURL=followrenew-rest-obj.service.js.map