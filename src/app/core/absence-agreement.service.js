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
var intercept_http_1 = require("../shared/intercept_http");
var AbsenceAgreementService = (function () {
    function AbsenceAgreementService(_http) {
        this._http = _http;
        this.requestUrl = 'api/absence-agreement';
        this.absenceAgreementUrl = 'api/absence-agreement/id';
        this.saveRequestUrl = 'api/absence-agreement/save';
        this.saveByThirdFloorUrl = 'api/absence-agreement/3nd-save';
        this.saveReturnedRequestUrl = 'api/return-request/save';
    }
    AbsenceAgreementService.prototype.search = function (params) {
        return this._http.get(this.requestUrl, { search: params })
            .map(function (response) { return response.json(); })
            .do(function (data) {
            console.log(data);
        });
    };
    AbsenceAgreementService.prototype.searchReturnRequest = function (params) {
        return this._http.get(this.absenceAgreementUrl, { search: params })
            .map(function (response) { return response.json(); });
    };
    AbsenceAgreementService.prototype.saveReturnedRequest = function (returnedRequest) {
        return this._http.post(this.saveReturnedRequestUrl, returnedRequest)
            .map(function (response) { return response.json(); });
    };
    AbsenceAgreementService.prototype.saveAbsenceAgreement = function (requests) {
        return this._http.post(this.saveRequestUrl, requests)
            .map(function (response) { return response.json(); });
    };
    AbsenceAgreementService.prototype.saveAbsenceAgreementByThirdFloor = function (absenceAgreement) {
        return this._http.post(this.saveByThirdFloorUrl, absenceAgreement)
            .map(function (response) { return response.json(); });
    };
    AbsenceAgreementService.prototype.handleError = function (error) {
        console.log(error);
    };
    AbsenceAgreementService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp])
    ], AbsenceAgreementService);
    return AbsenceAgreementService;
}());
exports.AbsenceAgreementService = AbsenceAgreementService;
//# sourceMappingURL=absence-agreement.service.js.map