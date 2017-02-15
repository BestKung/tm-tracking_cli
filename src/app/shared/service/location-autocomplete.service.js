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
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../date-support-url-search-params");
var ctltlocation_model_1 = require("../../model/ctltlocation-model");
/**
 * Created by neng on 8/10/2559.
 */
var LocationAutocompleteService = (function () {
    function LocationAutocompleteService(http) {
        this.http = http;
        this.result = [];
        this.location = new ctltlocation_model_1.CtltLocation();
    }
    LocationAutocompleteService.prototype.searchLocation = function (tumbon) {
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("tumbon", tumbon);
        return this.http.get('/api/location/', { search: params }).map(function (resp) { return resp.json(); });
    };
    LocationAutocompleteService.prototype.searchFullLocationFromTumbonName = function (searchLocation) {
        var _this = this;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("location", searchLocation || null);
        this.http.get('/api/location/full-location', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.location = resp;
            console.log(_this.location);
        });
    };
    LocationAutocompleteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LocationAutocompleteService);
    return LocationAutocompleteService;
}());
exports.LocationAutocompleteService = LocationAutocompleteService;
var searchResult = (function () {
    function searchResult() {
    }
    return searchResult;
}());
exports.searchResult = searchResult;
//# sourceMappingURL=location-autocomplete.service.js.map