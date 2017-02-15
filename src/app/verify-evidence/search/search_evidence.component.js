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
var router_1 = require("@angular/router");
var verify_evidence_model_1 = require("../../model/verify-evidence-model");
var rest_object_service_1 = require("../../core/rest_object.service");
var absence_agreement_model_1 = require("../../model/absence-agreement-model");
var verify_evidence_rest_obj_service_1 = require("../../shared/service/verify-evidence.rest-obj.service");
var intercept_http_1 = require("../../shared/intercept_http");
/**
 * Created by pramoth on 8/29/2016 AD.
 */
var SearchComponent = (function () {
    function SearchComponent(router, http, restObject, verifyEvidenceRestObj) {
        this.router = router;
        this.http = http;
        this.restObject = restObject;
        this.verifyEvidenceRestObj = verifyEvidenceRestObj;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
        this.officers = [];
        if (this.verifyEvidenceRestObj.verifyEvidences.length == 0) {
            this.addVerifyEvidenceModel();
        }
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.restObject.evidences = {};
        this.restObject.pk = [];
        // this.searchAction();
        this.loadOfficerServiceFloor3FromServer();
    };
    SearchComponent.prototype.loadOfficerServiceFloor3FromServer = function () {
        var _this = this;
        this.http.get('/api/officer/service-floor3').map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.officers = [];
            resp.forEach(function (e) { return _this.officers.push({ label: e.label, value: e.value }); });
        });
    };
    SearchComponent.prototype.clear = function () {
        this.verifyEvidenceRestObj.verifyEvidences = new Array();
        this.verifyEvidenceRestObj.trNos = [];
        this.verifyEvidenceRestObj.officerName = '';
        this.verifyEvidenceRestObj.officerPosition = '';
        this.selectedOfficer = this.verifyEvidenceRestObj.officerName;
        console.log('this.selectedOfficer >> ', this.selectedOfficer);
        this.addVerifyEvidenceModel();
    };
    SearchComponent.prototype.addVerifyEvidenceModel = function () {
        for (var i = 0; i < 5; i++) {
            var verifyEvidence = new verify_evidence_model_1.VerifyEvidenceModel();
            this.verifyEvidenceRestObj.verifyEvidences.push(verifyEvidence);
        }
    };
    SearchComponent.prototype.removeVerifyEvidenceModel = function (index) {
        this.verifyEvidenceRestObj.verifyEvidences.splice(index, 1);
    };
    SearchComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        console.log('this.selectedOfficer > ', this.selectedOfficer);
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.verifyEvidenceRestObj.trNos = this.extractTrNoArrayBeforeSearch();
        this.verifyEvidenceRestObj.officerName = this.selectedOfficer;
        this.verifyEvidenceRestObj.searchAction(pageEvent).subscribe(function (result) {
            _this.pageData = result;
            console.log(_this.pageData);
        });
    };
    SearchComponent.prototype.onChangeSearchOwnerName = function (verif, trNo) {
        verif.trNo = trNo;
        if (trNo) {
            this.http.get("/api/search-ownername/" + trNo).subscribe(function (result) {
                verif.ownerName = result.text();
            });
        }
        else {
            verif.ownerName = "";
        }
        console.log(verif);
    };
    SearchComponent.prototype.verifySelect = function (pk) {
        this.clearRestObjectService();
        this.restObject.pk.push(pk);
        var redirectToUrl = ['verify-evidences/agreement/'];
        this.router.navigate(redirectToUrl);
    };
    SearchComponent.prototype.verifyAll = function (verifyEvidences) {
        console.log(verifyEvidences);
        this.clearRestObjectService();
        for (var _i = 0, verifyEvidences_1 = verifyEvidences; _i < verifyEvidences_1.length; _i++) {
            var itm = verifyEvidences_1[_i];
            this.restObject.pk.push(itm.verifyEvidencePk);
        }
        var redirectToUrl = ['verify-evidences/agreement/'];
        this.router.navigate(redirectToUrl);
    };
    SearchComponent.prototype.clearRestObjectService = function () {
        this.restObject.pk = [];
        this.restObject.evidences = {};
        this.restObject.contract = new absence_agreement_model_1.Contract();
        this.restObject.agreementId = undefined;
        this.restObject.ids = [];
    };
    SearchComponent.prototype.extractTrNoArrayBeforeSearch = function () {
        var arrayOfReqNo = [];
        for (var idx = 0; idx < this.verifyEvidenceRestObj.verifyEvidences.length; idx++) {
            if (this.verifyEvidenceRestObj.verifyEvidences[idx].trNo != undefined) {
                arrayOfReqNo.push(this.verifyEvidenceRestObj.verifyEvidences[idx].trNo);
            }
        }
        return arrayOfReqNo;
    };
    SearchComponent.prototype.getFormTypesSeq = function (formTypes) {
        if (formTypes) {
            return formTypes.replace('0', 'ก.0');
        }
        else {
            return '';
        }
    };
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-evidence',
            templateUrl: 'search_evidence.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, intercept_http_1.InterceptHttp, rest_object_service_1.RestObjectService, verify_evidence_rest_obj_service_1.VerifyEvidenceRestObjectService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
var OfficerSearch = (function () {
    function OfficerSearch() {
    }
    return OfficerSearch;
}());
exports.OfficerSearch = OfficerSearch;
//# sourceMappingURL=search_evidence.component.js.map