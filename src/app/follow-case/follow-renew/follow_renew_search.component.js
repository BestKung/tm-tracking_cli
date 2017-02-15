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
 * Created by best on 15/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var follow_search_1 = require("../../shared/follow_search");
var followrenew_rest_obj_service_1 = require("../../shared/service/followrenew-rest-obj.service");
var router_1 = require("@angular/router");
var FollowRenewSearchComponent = (function () {
    function FollowRenewSearchComponent(http, _route, followRenewRestObjService) {
        this.http = http;
        this._route = _route;
        this.followRenewRestObjService = followRenewRestObjService;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    FollowRenewSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.followRenewRestObjService.search.trNo
                || _this.followRenewRestObjService.search.startDateStr
                || _this.followRenewRestObjService.search.endDateStr
                || _this.followRenewRestObjService.search.stepCode) {
                if (val.url.startsWith("/follow/renew")) {
                    _this.searchAction();
                }
                else {
                    _this.followRenewRestObjService.clearParam();
                }
            }
        });
    };
    FollowRenewSearchComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FollowRenewSearchComponent.prototype.getFollowRenew = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        this.http.get('/api/follow-renew', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    FollowRenewSearchComponent.prototype.findStepDescByStepCode = function (stepCode) {
        var stepDesc = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือสำคัญแสดงการจดทะเบียน';
        }
        return stepDesc;
    };
    FollowRenewSearchComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followRenewRestObjService.searchFollowRenew(pageEvent).subscribe(function (resp) { return _this.pageData = resp; });
    };
    FollowRenewSearchComponent.prototype.clear = function () {
        this.followRenewRestObjService.search = new follow_search_1.FollowSearch();
        this.followRenewRestObjService.search.stepCode = '';
    };
    FollowRenewSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'follow-renew-search',
            templateUrl: 'follow_renew_search.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, followrenew_rest_obj_service_1.FollowRenewRestObjectService])
    ], FollowRenewSearchComponent);
    return FollowRenewSearchComponent;
}());
exports.FollowRenewSearchComponent = FollowRenewSearchComponent;
//# sourceMappingURL=follow_renew_search.component.js.map