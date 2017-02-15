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
var verify_document_1 = require("../verify_document");
var vertify_document_service_1 = require("../service/vertify-document.service");
var page_1 = require("../../shared/page");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
/**
 * Created by pramoth on 8/29/2016 AD.
 */
var SearchComponent = (function () {
    function SearchComponent(vertifyService, router, http) {
        this.vertifyService = vertifyService;
        this.router = router;
        this.http = http;
        this.verifyDocuments = new Array();
        this.resp = new page_1.Page();
        for (var i = 0; i < 5; i++) {
            var verifyDocument = new verify_document_1.VerifyDocument();
            this.verifyDocuments.push(verifyDocument);
        }
    }
    SearchComponent.prototype.ngOnInit = function () {
    };
    SearchComponent.prototype.clear = function () {
        this.verifyDocuments.forEach(function (doc) {
            doc.reqNo = null;
        });
    };
    SearchComponent.prototype.addVerifyDocument = function () {
        for (var i = 0; i < 5; i++) {
            var verifyDocument = new verify_document_1.VerifyDocument();
            this.verifyDocuments.push(verifyDocument);
        }
    };
    SearchComponent.prototype.removeVerifyDocument = function (index) {
        this.verifyDocuments.splice(index, 1);
    };
    SearchComponent.prototype.searchVertifyDocument = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        var reqNos = this.extractReqNoArrayBeforeSearch();
        params.set("reqNos", reqNos.toString() || "");
        var observableObj = this.http.get('/api/vertify-document/searchVerifyDocument', { search: params }).map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) { return console.log(result); });
        observableObj.subscribe(function (result) { return _this.resp = result; });
    };
    SearchComponent.prototype.onChange = function (vertif, val) {
        vertif.reqNo = val;
    };
    SearchComponent.prototype.gotoVerifyDetails = function (reqId) {
        var redirectToUrl = ['/verify-documents/agreement', reqId];
        this.router.navigate(redirectToUrl);
    };
    SearchComponent.prototype.extractReqNoArrayBeforeSearch = function () {
        var arrayOfReqNo = new Array();
        for (var idx = 0; idx < this.verifyDocuments.length; idx++) {
            if (this.verifyDocuments[idx].reqNo != undefined) {
                arrayOfReqNo.push(this.verifyDocuments[idx].reqNo);
            }
        }
        return arrayOfReqNo;
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search-document',
        templateUrl: 'search_document.html'
    }),
    __metadata("design:paramtypes", [vertify_document_service_1.VertifyDocumentService, router_1.Router, http_1.Http])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search_ducument.component.js.map