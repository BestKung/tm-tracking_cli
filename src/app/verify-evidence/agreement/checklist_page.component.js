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
 * Created by neng on 20/9/2559.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var rest_object_service_1 = require("../../core/rest_object.service");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var CheckListPageComponent = (function () {
    function CheckListPageComponent(restObjectService, route, http) {
        this.restObjectService = restObjectService;
        this.route = route;
        this.http = http;
    }
    CheckListPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.filter(function (p) { return p['formId']; }).forEach(function (p) { return _this.formTypeId = p['formId']; });
        if (this.restObjectService.evidences[this.formTypeId]) {
            this.evidence = this.restObjectService.evidences[this.formTypeId];
        }
        else {
            this.loadEvidencesFromServer();
        }
    };
    CheckListPageComponent.prototype.loadEvidencesFromServer = function () {
        var _this = this;
        if (this.restObjectService.agreementId) {
            var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
            params.set("agreementId", this.restObjectService.agreementId);
            params.set("formTypeId", this.formTypeId);
            this.http.get('/api/absence-evidence/find-absence-evidences', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (evidence) {
                _this.evidence = evidence;
                console.log("evidence loaded 1 ", _this.evidence);
            });
        }
        else {
            this.http.get("/api/evidence/" + this.formTypeId)
                .map(function (response) { return response.json(); })
                .subscribe(function (evidence) {
                _this.evidence = evidence;
                console.log("evidence loaded 2 ", _this.evidence);
            });
        }
    };
    CheckListPageComponent.prototype.addChecklistToRest = function () {
        this.restObjectService.evidences[this.formTypeId] = this.evidence;
        this.back();
    };
    CheckListPageComponent.prototype.handleError = function (error) {
        console.log("Error occured ! >> " + error);
        return rxjs_1.Observable.throw(error);
    };
    CheckListPageComponent.prototype.clearChecklist = function () {
        console.log('in clear');
        this.loadEvidencesFromServer();
    };
    CheckListPageComponent.prototype.back = function () {
        window.history.back();
    };
    CheckListPageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "checklist-page",
            templateUrl: "checklist_page.html"
        }), 
        __metadata('design:paramtypes', [rest_object_service_1.RestObjectService, router_1.ActivatedRoute, http_1.Http])
    ], CheckListPageComponent);
    return CheckListPageComponent;
}());
exports.CheckListPageComponent = CheckListPageComponent;
//# sourceMappingURL=checklist_page.component.js.map