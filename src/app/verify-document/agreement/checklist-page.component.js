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
var vertify_document_service_1 = require("../service/vertify-document.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var document_view_model_1 = require("../../model/document-view-model");
var CheckListPageComponent = (function () {
    function CheckListPageComponent(verifyService, route, http) {
        this.verifyService = verifyService;
        this.route = route;
        this.http = http;
        this.checkMenuscript = 'ต้นฉบับ';
        this.checkCopy = 'สำเนา';
        this.checkAll = 'ทั้งหมด';
        this.documentsForShow = new Array();
    }
    CheckListPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchByDocType();
        this.route.params.forEach(function (params) {
            var reqNo = params['reqNo'];
            _this.reqNo = reqNo;
        });
        var param = new http_1.URLSearchParams();
    };
    CheckListPageComponent.prototype.searchByDocType = function () {
        var _this = this;
        this.prepareSearchParams();
        var param = new http_1.URLSearchParams();
        param.set("docType", this.docType.toString() || "");
        var observableObj = this.http.get('/api/vertify-document/searchDocument', { search: param }).map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) { return console.log(result); });
        observableObj.subscribe(function (result) {
            _this.setCheckListView(result);
        });
    };
    CheckListPageComponent.prototype.saveCheckList = function (checkList) {
        console.log('loading ' + this.reqNo);
        console.log(checkList);
        var body = JSON.stringify({
            reqNo: this.reqNo,
            gCheckList: checkList
        });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(body);
        this.http.post('/api/vertify-document/saveCheckList', body, options)
            .map(this.extractData)
            .subscribe(function (resp) { return console.log(resp); });
    };
    CheckListPageComponent.prototype.handleError = function (error) {
        console.log("Error occured ! >> " + error.message);
        return rxjs_1.Observable.throw(error.message);
    };
    CheckListPageComponent.prototype.extractData = function (response) {
        var dataObj = response.json();
        console.log("Extract from resp : \n");
        return dataObj || {};
    };
    CheckListPageComponent.prototype.prepareSearchParams = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var docType = params['docType'];
            console.log('docType = ' + docType);
            _this.docType = docType;
        });
    };
    CheckListPageComponent.prototype.selectedDoc = function (doc) {
        this.currentDoc = doc;
    };
    CheckListPageComponent.prototype.clear = function () {
        this.documentsForShow.forEach(function (doc) {
            doc.flagHasNo = false;
            doc.remark = null;
        });
    };
    CheckListPageComponent.prototype.back = function () {
        window.history.back();
    };
    CheckListPageComponent.prototype.setCheckListView = function (data) {
        this.documentsForShow = [];
        for (var i = 0; i < data.length; i++) {
            var docsMain = new document_view_model_1.DocumentViewModel();
            docsMain.index = i + 1;
            docsMain.category = data[i].category;
            docsMain.descriptionMain = data[i].descriptionMain;
            docsMain.descriptionSub = data[i].descriptionSub;
            docsMain.flagHasSub = data[i].flagHasSub;
            docsMain.idMain = data[i].idMain;
            docsMain.idSub = data[i].idSub;
            docsMain.refDocumentId = data[i].refDocumentId;
            docsMain.typeMain = data[i].typeMain;
            docsMain.typeSub = data[i].typeSub;
            this.documentsForShow.push(docsMain);
            console.log(docsMain + "---------------main");
            if (!!data[i].descriptionSub) {
                var docsSub = new document_view_model_1.DocumentViewModel();
                docsSub.flagHasSub = false;
                docsSub.category = data[i].category;
                docsSub.descriptionMain = data[i].descriptionSub;
                docsSub.typeMain = data[i].typeSub;
                this.documentsForShow.push(docsSub);
                console.log(docsSub + "-------------sub");
            }
        }
        console.log(this.documentsForShow);
    };
    return CheckListPageComponent;
}());
CheckListPageComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "checklist-page",
        templateUrl: "checklist-page.html"
    }),
    __metadata("design:paramtypes", [vertify_document_service_1.VertifyDocumentService,
        router_1.ActivatedRoute,
        http_1.Http])
], CheckListPageComponent);
exports.CheckListPageComponent = CheckListPageComponent;
//# sourceMappingURL=checklist-page.component.js.map