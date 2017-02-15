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
var follow_search_1 = require("../../shared/follow_search");
var followchange_rest_obj_service_1 = require("../../shared/service/followchange-rest-obj.service");
var router_1 = require("@angular/router");
var intercept_http_1 = require("../../shared/intercept_http");
/**
 * Created by best on 6/10/2559.
 */
var FollowChangeSearchComponent = (function () {
    function FollowChangeSearchComponent(http, followChangeRestObj, _route) {
        this.http = http;
        this.followChangeRestObj = followChangeRestObj;
        this._route = _route;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    FollowChangeSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.followChangeRestObj.searchRequest.trNo
                || _this.followChangeRestObj.searchRequest.startDateStr
                || _this.followChangeRestObj.searchRequest.endDateStr
                || _this.followChangeRestObj.searchRequest.stepCode) {
                if (val.url.startsWith("/follow/change")) {
                    _this.searchAction();
                }
                else {
                    _this.followChangeRestObj.clearParam();
                }
            }
        });
    };
    FollowChangeSearchComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FollowChangeSearchComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followChangeRestObj.searchFollowChange(pageEvent).subscribe(function (data) {
            _this.pageData = data;
        });
    };
    FollowChangeSearchComponent.prototype.clear = function () {
        this.followChangeRestObj.searchRequest = new follow_search_1.FollowSearch();
        this.followChangeRestObj.searchRequest.stepCode = "";
    };
    FollowChangeSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'follow-search',
            templateUrl: './follow_change_search.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, followchange_rest_obj_service_1.FollowChangeRestObjectService, router_1.Router])
    ], FollowChangeSearchComponent);
    return FollowChangeSearchComponent;
}());
exports.FollowChangeSearchComponent = FollowChangeSearchComponent;
//# sourceMappingURL=follow_change_search.component.js.map