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
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../date-support-url-search-params");
var core_1 = require("@angular/core");
/**
 * Created by neng on 6/11/2559.
 */
var ContractAutoCompleteService = (function () {
    function ContractAutoCompleteService(_http) {
        this._http = _http;
    }
    ContractAutoCompleteService.prototype.searchContractName = function (contractName, pageEvent) {
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 5 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("contractName", contractName || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this._http.get('api/contract', { search: params }).map(function (resp) { return resp.json(); });
    };
    ContractAutoCompleteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ContractAutoCompleteService);
    return ContractAutoCompleteService;
}());
exports.ContractAutoCompleteService = ContractAutoCompleteService;
//# sourceMappingURL=contract-autocomplete.service.js.map