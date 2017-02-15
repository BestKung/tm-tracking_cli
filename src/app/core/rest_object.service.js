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
 * Created by neng on 12/9/2559.
 */
var core_1 = require("@angular/core");
var absence_agreement_model_1 = require("../model/absence-agreement-model");
var date_support_url_search_params_1 = require("../shared/date-support-url-search-params");
var intercept_http_1 = require("../shared/intercept_http");
var RestObjectService = (function () {
    function RestObjectService(_http) {
        this._http = _http;
        this.evidences = {};
        this.pk = [];
        this.contract = new absence_agreement_model_1.Contract();
        this.ids = []; //agreement is after saved first;
        this.officerName = '';
        this.officerPosition = '';
        this.urlSearch = 'api/absence-agreement';
        console.log('RestObjectService loaded...');
    }
    RestObjectService.prototype.searchAction = function (pageEvent) {
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('requestNumber', this.trNo || null);
        params.set('startDate', this.reqDateFrom || null);
        params.set('endDate', this.reqDateTo || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        console.log("param to search " + this.trNo + " " + this.reqDateFrom + " " + this.reqDateTo);
        return this._http.get(this.urlSearch, { search: params }).map(function (resp) { return resp.json(); });
    };
    RestObjectService.formIds = ['01', '04', '05', '06', '07', '08'];
    RestObjectService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp])
    ], RestObjectService);
    return RestObjectService;
}());
exports.RestObjectService = RestObjectService;
//# sourceMappingURL=rest_object.service.js.map