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
var deadline_send_document_setting_1 = require("./deadline_send_document_setting");
var page_1 = require("../../shared/page");
var act_1 = require("../model/act");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var DeadlinesSendDocument = (function () {
    function DeadlinesSendDocument(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.deadLineDoc = new deadline_send_document_setting_1.DeadlineSendDocumentSetting();
        this.deadlinesSendDocuments = new page_1.Page();
        this.acts = new page_1.Page();
    }
    DeadlinesSendDocument.prototype.ngOnInit = function () {
        this.getDeadlinesSendDocument();
        this.getAct();
        this.deadLineDoc.act.actId = '';
    };
    DeadlinesSendDocument.prototype.save = function () {
        var _this = this;
        this.http.post('/api/administrator/deadline-send-document/save', this.deadLineDoc).subscribe(function (data) {
            _this.getDeadlinesSendDocument();
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.clearData();
        });
    };
    DeadlinesSendDocument.prototype.getDeadlinesSendDocument = function () {
        var _this = this;
        var response;
        response = this.http.get('/api/administrator/deadline-send-document/get').map(function (data) { return data.json(); });
        response.subscribe(function (data) { return _this.deadlinesSendDocuments = data; });
    };
    DeadlinesSendDocument.prototype.getAct = function () {
        var _this = this;
        var response;
        response = this.http.get('/api/act/get').map(function (data) { return data.json(); });
        response.subscribe(function (data) { return _this.acts = data; });
    };
    DeadlinesSendDocument.prototype.clickUpdate = function (value) {
        console.log(value);
        this.deadLineDoc = value;
        this.deadLineDoc.act = new act_1.Act();
        this.deadLineDoc.act.actId = value.actId;
        this.deadLineDoc.act.actDate = value.actDate;
    };
    DeadlinesSendDocument.prototype.delete = function (value) {
        var _this = this;
        this.http.post('/api/administrator/deadline-send-document/delete', value).subscribe(function (data) { return _this.getDeadlinesSendDocument(); });
    };
    DeadlinesSendDocument.prototype.clearData = function () {
        this.deadLineDoc = new deadline_send_document_setting_1.DeadlineSendDocumentSetting();
    };
    DeadlinesSendDocument.prototype.test = function (value) {
        console.log(value);
    };
    DeadlinesSendDocument = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'deadlines-send-document',
            templateUrl: 'deadlines_send_document.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], DeadlinesSendDocument);
    return DeadlinesSendDocument;
}());
exports.DeadlinesSendDocument = DeadlinesSendDocument;
//# sourceMappingURL=deadlines_send_document.component.js.map