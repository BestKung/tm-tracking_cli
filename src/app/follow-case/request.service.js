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
var core_1 = require("@angular/core");
var RequestService = (function () {
    function RequestService(_http) {
        this._http = _http;
        this.requestUrl = 'api/request';
        this.saveRequestUrl = 'api/request/save';
        this.returnedRequestUrl = 'api/return-request';
        this.saveReturnedRequestUrl = 'api/return-request/save';
    }
    RequestService.prototype.getRequests = function (params) {
        return this._http.get(this.requestUrl, { search: params })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); });
        //.catch(this.handleError);
    };
    RequestService.prototype.searchReturnRequest = function (params) {
        return this._http.get(this.returnedRequestUrl, { search: params })
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); });
    };
    RequestService.prototype.saveReturnedRequest = function (returnedRequest) {
        return this._http.post(this.saveReturnedRequestUrl, returnedRequest)
            .map(function (response) { return response.json(); });
    };
    RequestService.prototype.saveRequest = function (requests) {
        return this._http.post(this.saveRequestUrl, requests)
            .map(function (response) { return response.json(); });
    };
    RequestService.prototype.handleError = function (error) {
        console.log(error);
    };
    return RequestService;
}());
RequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RequestService);
exports.RequestService = RequestService;
//# sourceMappingURL=request.service.js.map