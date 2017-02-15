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
 * Created by best on 10/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var document_for_show_1 = require("./document_for_show");
var DocumentComponent = (function () {
    function DocumentComponent(http) {
        this.http = http;
        this.documentsForShow = new Array();
    }
    DocumentComponent.prototype.ngOnInit = function () {
        this.descriptionMain = '';
        this.documentTypeMain = 'ทั้งหมด';
        this.descriptionSub = '';
        this.documentTypeSub = 'ทั้งหมด';
        this.documentCategory = 'ก.01';
        this.getDocument();
        this.searchDescription = "";
        this.searchType = "";
        this.searchCategory = "";
    };
    DocumentComponent.prototype.saveDocument = function () {
        var _this = this;
        this.document = {
            idMain: this.idDocumentMain,
            idSub: this.idDocumentSub,
            descriptionMain: this.descriptionMain,
            documentTypeMain: this.documentTypeMain,
            descriptionSub: this.descriptionSub,
            documentTypeSub: this.documentTypeSub,
            documentCategory: this.documentCategory
        };
        this.http.post('/api/administrator/document/save-document', this.document).subscribe(function (data) {
            _this.getDocument();
            _this.clearDataAddDocument();
        });
    };
    DocumentComponent.prototype.getDocument = function () {
        var _this = this;
        var documentObserv;
        documentObserv = this.http.get('/api/administrator/document/get-document')
            .map(function (data) { return data.json().content; });
        documentObserv.subscribe(function (data) { return _this.setDocumentForShow(data); });
    };
    DocumentComponent.prototype.setDocumentForShow = function (data) {
        this.documentsForShow = [];
        for (var i = 0; i < data.length; i++) {
            var docsMain = new document_for_show_1.DocumentForShow();
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
            if (!!data[i].descriptionSub) {
                var docsSub = new document_for_show_1.DocumentForShow();
                docsSub.flagHasSub = false;
                docsSub.category = data[i].category;
                docsSub.descriptionMain = data[i].descriptionSub;
                docsSub.typeMain = data[i].typeSub;
                this.documentsForShow.push(docsSub);
            }
        }
    };
    DocumentComponent.prototype.delete = function (doc) {
        var _this = this;
        this.http.post('/api/administrator/document/delete-document', { id: doc.idSub }).subscribe(function (data) { return _this.getDocument(); });
    };
    DocumentComponent.prototype.clickUpdate = function (doc) {
        this.idDocumentSub = doc.idMain;
        this.idDocumentMain = doc.idSub;
        this.descriptionMain = doc.descriptionMain;
        this.documentTypeMain = doc.typeMain;
        this.descriptionSub = doc.descriptionSub;
        this.documentTypeSub = doc.typeSub;
        this.documentCategory = doc.category;
    };
    DocumentComponent.prototype.clearDataAddDocument = function () {
        this.idDocumentSub = null;
        this.idDocumentMain = null;
        this.descriptionMain = "";
        this.documentTypeMain = "ทั้งหมด";
        this.descriptionSub = "";
        this.documentTypeSub = "ทั้งหมด";
        this.documentCategory = "ก.01";
    };
    DocumentComponent.prototype.clearDataSearch = function () {
        this.searchDescription = "";
        this.searchType = "";
        this.searchCategory = "";
        this.getDocument();
    };
    DocumentComponent.prototype.searchDocument = function () {
        var _this = this;
        var documentObserv;
        var params = {
            descriptionMain: this.searchDescription,
            typeMain: this.searchType,
            descriptionSub: this.searchDescription,
            typeSub: this.searchType,
            category: this.searchCategory
        };
        documentObserv = this.http.post('/api/administrator/document/search-document', params).map(function (data) { return data.json().content; });
        documentObserv.subscribe(function (data) { return _this.setDocumentForShow(data); });
    };
    return DocumentComponent;
}());
DocumentComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'administrator-document',
        templateUrl: 'administrator_document.html'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], DocumentComponent);
exports.DocumentComponent = DocumentComponent;
//# sourceMappingURL=administrator_document.component.js.map