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
var followtransfer_rest_obj_service_1 = require("../../shared/service/followtransfer-rest-obj.service");
var router_1 = require("@angular/router");
/**
 * Created by best on 7/10/2559.
 */
var FollowTranferSearchComponent = (function () {
    function FollowTranferSearchComponent(followTransferRestObj, _route) {
        this.followTransferRestObj = followTransferRestObj;
        this._route = _route;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    FollowTranferSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this.followTransferRestObj.searchRequest.trNo
                || _this.followTransferRestObj.searchRequest.startDateStr
                || _this.followTransferRestObj.searchRequest.endDateStr
                || _this.followTransferRestObj.searchRequest.stepCode) {
                if (val.url.startsWith("/follow/transfer-legacy")) {
                    _this.searchAction();
                }
                else {
                    _this.followTransferRestObj.clearParam();
                }
            }
        });
    };
    FollowTranferSearchComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    FollowTranferSearchComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.followTransferRestObj.searchTransferLegacy(pageEvent).subscribe(function (resp) {
            _this.pageData = resp;
        });
    };
    FollowTranferSearchComponent.prototype.clear = function () {
        this.followTransferRestObj.searchRequest = new follow_search_1.FollowSearch();
        this.followTransferRestObj.searchRequest.stepCode = '';
    };
    FollowTranferSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'follow-tranfer-search',
            templateUrl: 'follow_tranfer_search.html'
        }), 
        __metadata('design:paramtypes', [followtransfer_rest_obj_service_1.FollowTransferRestObjectService, router_1.Router])
    ], FollowTranferSearchComponent);
    return FollowTranferSearchComponent;
}());
exports.FollowTranferSearchComponent = FollowTranferSearchComponent;
//# sourceMappingURL=follow_tranfer_search.component.js.map