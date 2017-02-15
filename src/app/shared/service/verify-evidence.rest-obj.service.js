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
var router_1 = require("@angular/router");
var date_support_url_search_params_1 = require("../date-support-url-search-params");
var intercept_http_1 = require("../intercept_http");
/**
 * Created by neng on 15/11/2559.
 */
var VerifyEvidenceRestObjectService = (function () {
    function VerifyEvidenceRestObjectService(_http, _route) {
        var _this = this;
        this._http = _http;
        this._route = _route;
        this.trNos = [];
        this.officerName = '';
        this.officerPosition = '';
        this.verifyEvidences = new Array();
        this._route.events.subscribe(function (val) {
            console.log('this trNos ', _this.trNos.toString());
            if (val.url.startsWith("/verify-evidences/search") && _this.trNos.length > 0) {
                _this.searchAction({ currentPage: 0, pageSize: 10 });
            }
            else {
                _this.trNos = [];
            }
        });
    }
    VerifyEvidenceRestObjectService.prototype.searchAction = function (pageEvent) {
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("reqNos", (this.trNos.length == 0 ? null : this.trNos.toString()));
        params.set("officerName", this.officerName || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this._http.get('/api/search', { search: params }).map(function (resp) { return resp.json(); });
    };
    VerifyEvidenceRestObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, router_1.Router])
    ], VerifyEvidenceRestObjectService);
    return VerifyEvidenceRestObjectService;
}());
exports.VerifyEvidenceRestObjectService = VerifyEvidenceRestObjectService;
//# sourceMappingURL=verify-evidence.rest-obj.service.js.map