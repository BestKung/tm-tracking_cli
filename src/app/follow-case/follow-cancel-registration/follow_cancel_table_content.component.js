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
var followcancel_rest_obj_service_1 = require("../../shared/service/followcancel-rest-obj.service");
var router_1 = require("@angular/router");
var FollowCancelTableContentComponent = (function () {
    function FollowCancelTableContentComponent(_route, followCancelRestService) {
        this._route = _route;
        this.followCancelRestService = followCancelRestService;
        this.pageData = new page_1.Page();
        this.searchRequest = new follow_search_1.FollowSearch();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    FollowCancelTableContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.followCancelRestService.searchRequest.trNo
                || _this.followCancelRestService.searchRequest.startDateStr
                || _this.followCancelRestService.searchRequest.endDateStr
                || _this.followCancelRestService.searchRequest.stepCode) {
                if (val.url.startsWith("/follow/cancel-registration/search")) {
                    _this.searchAction();
                }
                else {
                    _this.followCancelRestService.clearParam();
                }
            }
        });
    };
    FollowCancelTableContentComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FollowCancelTableContentComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followCancelRestService.searchFollowCancel(pageEvent).subscribe(function (data) {
            _this.pageData = data;
        });
    };
    FollowCancelTableContentComponent.prototype.clear = function () {
        this.followCancelRestService.searchRequest = new follow_search_1.FollowSearch();
        this.followCancelRestService.searchRequest.stepCode = '';
    };
    FollowCancelTableContentComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'table-cancel-content',
            templateUrl: './follow_cancel_table_content.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, followcancel_rest_obj_service_1.FollowCancelRestService])
    ], FollowCancelTableContentComponent);
    return FollowCancelTableContentComponent;
}());
exports.FollowCancelTableContentComponent = FollowCancelTableContentComponent;
//# sourceMappingURL=follow_cancel_table_content.component.js.map