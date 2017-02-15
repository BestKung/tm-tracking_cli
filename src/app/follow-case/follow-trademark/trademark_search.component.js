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
var category_1 = require("../../shared/category");
var follow_search_1 = require("../../shared/follow_search");
var user_service_1 = require("../../authen/shared/user.service");
var authen_service_1 = require("../../authen/shared/authen.service");
var followtm_rest_obj_service_1 = require("../../shared/service/followtm-rest-obj.service");
var router_1 = require("@angular/router");
var TrademarkSearch = (function () {
    function TrademarkSearch(_followRestObj, _route) {
        this._followRestObj = _followRestObj;
        this._route = _route;
        this.pageData = new page_1.Page();
        this.categoryOld = new category_1.Category();
        this.categoryA59 = new category_1.Category();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    TrademarkSearch.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this._route.events.filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (val) {
            if (_this._followRestObj.searchRequest.trNo
                || _this._followRestObj.searchRequest.startDateStr
                || _this._followRestObj.searchRequest.endDateStr
                || _this._followRestObj.searchRequest.stepCode) {
                if (val.url.startsWith("/follow/trademark")) {
                    _this.searchAction();
                }
                else {
                    _this._followRestObj.clearParam();
                }
            }
        });
    };
    TrademarkSearch.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    TrademarkSearch.prototype.findDurationOfStepAndAct = function (requestDate, stepCode, index) {
        var dulationOfStep = '';
        if (requestDate >= this.categoryA59.act.actDate) {
            dulationOfStep = this.categoryA59.steps[index].totalDuration + ' ' + this.categoryA59.steps[index].durationType;
        }
        else {
            dulationOfStep = this.categoryOld.steps[index].totalDuration + ' ' + this.categoryOld.steps[index].durationType;
        }
        return dulationOfStep;
    };
    TrademarkSearch.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this._followRestObj.searchFollowTrademark(pageEvent).subscribe(function (data) {
            _this.pageData = data;
        });
    };
    TrademarkSearch.prototype.clear = function () {
        this._followRestObj.searchRequest = new follow_search_1.FollowSearch;
        this._followRestObj.searchRequest.stepCode = '';
    };
    TrademarkSearch = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'trademark-search',
            templateUrl: './trademark_search.html',
            providers: [user_service_1.UserService, authen_service_1.AuthenService]
        }), 
        __metadata('design:paramtypes', [followtm_rest_obj_service_1.FollowTrademarkRestObjectService, router_1.Router])
    ], TrademarkSearch);
    return TrademarkSearch;
}());
exports.TrademarkSearch = TrademarkSearch;
//# sourceMappingURL=trademark_search.component.js.map