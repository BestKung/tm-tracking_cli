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
var followapprove_rest_obj_service_1 = require("../../shared/service/followapprove-rest-obj.service");
var router_1 = require("@angular/router");
/**
 * Created by best on 13/10/2559.
 */
var FollowApproveSearchComponent = (function () {
    function FollowApproveSearchComponent(followApprvRestObj, _route) {
        this.followApprvRestObj = followApprvRestObj;
        this._route = _route;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    FollowApproveSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.followApprvRestObj.searchRequest.trNo
                || _this.followApprvRestObj.searchRequest.startDateStr
                || _this.followApprvRestObj.searchRequest.endDateStr
                || _this.followApprvRestObj.searchRequest.stepCode) {
                if (val.url.startsWith("/follow/approve")) {
                    _this.searchAction();
                }
                else {
                    _this.followApprvRestObj.clearParam();
                }
            }
        });
    };
    FollowApproveSearchComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FollowApproveSearchComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followApprvRestObj.searchFollowApprove(pageEvent)
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    FollowApproveSearchComponent.prototype.clear = function () {
        this.followApprvRestObj.searchRequest = new follow_search_1.FollowSearch();
        this.followApprvRestObj.searchRequest.stepCode = '';
    };
    FollowApproveSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'follow-approve-search',
            templateUrl: 'follow_approve_search.html'
        }), 
        __metadata('design:paramtypes', [followapprove_rest_obj_service_1.FollowApproveRestObjectService, router_1.Router])
    ], FollowApproveSearchComponent);
    return FollowApproveSearchComponent;
}());
exports.FollowApproveSearchComponent = FollowApproveSearchComponent;
//# sourceMappingURL=follow_approve_search.component.js.map