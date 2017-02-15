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
///<reference path="inform_template.ts"/>
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../shared/page");
var inform_template_1 = require("./inform_template");
var print_book_inform_1 = require("./print_book_inform/print_book_inform");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var intercept_http_1 = require("../shared/intercept_http");
var SearchInformComponent = (function () {
    function SearchInformComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.informMessages = new page_1.Page();
        this.pageModal = 0;
        this.totalPageModal = 0;
        this.informTemplate = new inform_template_1.InformTemplate();
        this.informTemplatePrint = new print_book_inform_1.PrintBookInform();
        this.isClickMessageAll = false;
        this.chkAll = false;
        this.isNotChackMessageBook = false;
        this.currentPage = 0;
        this.pageSize = 10;
    }
    SearchInformComponent.prototype.ngOnInit = function () {
        this.formType = '';
        this.chkAll = false;
        this.isNotChackMessageBook = false;
    };
    SearchInformComponent.prototype.clear = function () {
        this.trNo = '';
        this.formType = '';
        this.searchAction();
    };
    SearchInformComponent.prototype.search = function () {
        var _this = this;
        console.log('click----------');
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo || null);
        params.set('formType', this.formType || null);
        params.set("page", "" + 1);
        params.set("size", "" + 10);
        this.http.get('/api/nontification-delayed', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    SearchInformComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.chkAll = false;
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo || null);
        params.set('formType', this.formType || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    SearchInformComponent.prototype.clickMessage = function (inform) {
        this.isClickMessageAll = false;
        this.pageModal = 0;
        this.totalPageModal = 0;
        this.getInformMessage();
        this.informTemplatePrint.formType = inform.formType;
        this.informTemplatePrint.trNo = inform.trNo;
        this.informTemplatePrint.textRemark = 'ตามที่(ผู้ยื่นคำขอ/บริษัท) ' + inform.conName + ' ได้ยื่นจดทะเบียนเลขที่คำขอ ' + inform.trNo + ' เเละพนักงานเจ้าหน้าที่ได้รับคำขอของท่านเพื่อดำเนินการเเล้ว นั้น';
        this.informTemplatePrint.conName = inform.conName;
        jQuery(this.addMessage.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
    };
    SearchInformComponent.prototype.getInformMessage = function () {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('size', '5');
        params.set('page', this.pageModal + '');
        this.http.get('/api/message-print-inform', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.informMessages = data;
            _this.totalPageModal = data.totalPages;
        });
    };
    SearchInformComponent.prototype.nextPageModal = function () {
        ++this.pageModal;
        this.getInformMessage();
    };
    SearchInformComponent.prototype.prePageModal = function () {
        --this.pageModal;
        this.getInformMessage();
    };
    SearchInformComponent.prototype.selectMessage = function (message) {
        if (this.informTemplatePrint.text) {
            message = '\n' + message;
        }
        this.informTemplatePrint.text = (this.informTemplatePrint.text || '') + message;
    };
    SearchInformComponent.prototype.saveMessage = function () {
        var _this = this;
        this.http.post('/api/nontification-delayed-template', this.informTemplatePrint)
            .subscribe(function (data) {
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.searchAction();
            _this.informTemplatePrint = new print_book_inform_1.PrintBookInform();
        });
    };
    SearchInformComponent.prototype.clearMessage = function () {
        this.informTemplatePrint = new print_book_inform_1.PrintBookInform();
    };
    SearchInformComponent.prototype.checkAll = function (value) {
        for (var i = 0; i < this.pageData.content.length; i++) {
            this.pageData.content[i].chk = value.target.checked;
        }
    };
    SearchInformComponent.prototype.cancelCheckAll = function (value) {
        if (!value.target.checked) {
            this.chkAll = false;
        }
    };
    SearchInformComponent.prototype.clickMessageAll = function (inform) {
        var countSelect = 0;
        for (var i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.isNotChackMessageBook = true;
            this.toastr.warning('เลือกข้อความที่ต้องการบันทึกอย่างน้อย 1');
            return;
        }
        else {
            this.isNotChackMessageBook = false;
        }
        this.isClickMessageAll = true;
        this.informTemplate = new inform_template_1.InformTemplate();
        this.pageModal = 0;
        this.totalPageModal = 0;
        this.getInformMessage();
        jQuery(this.addMessage.nativeElement).modal({ observeChanges: false }).modal({ closable: false }).modal('toggle');
    };
    SearchInformComponent.prototype.saveAll = function () {
        var _this = this;
        var printInformTemplates = new Array();
        for (var i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                var printBookInform = new print_book_inform_1.PrintBookInform();
                printBookInform.text = this.informTemplatePrint.text;
                printBookInform.conName = this.pageData.content[i].conName;
                printBookInform.textRemark = 'ตามที่(ผู้ยื่นคำขอ/บริษัท) ' + this.pageData.content[i].conName + ' ดำเนิน สมเกียรติและบุญมา จำกัด ได้ยื่นจดทะเบียนเลขที่คำขอ ' + this.pageData.content[i].trNo + ' เเละพนักงานเจ้าหน้าที่ได้รับคำขอของท่านเพื่อดำเนินการเเล้ว นั้น';
                printBookInform.trNo = this.pageData.content[i].trNo;
                printBookInform.formType = this.pageData.content[i].formType;
                printInformTemplates.push(printBookInform);
            }
        }
        this.http.post('/api/nontification-delayed-template/list', printInformTemplates)
            .subscribe(function (data) {
            _this.informTemplatePrint = new print_book_inform_1.PrintBookInform();
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.searchAction();
        });
    };
    SearchInformComponent.prototype.clickPrintInform = function (inform) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set('trNo', inform.trNo.toString());
        params.set('formType', inform.formType);
        this.http.get('/api/inform-template/print', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            var response = data.content[0] || new inform_template_1.InformTemplate();
            _this.informTemplatePrint.bookDate = response.bookDate;
            _this.informTemplatePrint.formType = response.formType;
            _this.informTemplatePrint.text = response.message;
            _this.informTemplatePrint.textRemark = response.remark;
            _this.informTemplatePrint.trNo = response.trNo;
            _this.informTemplatePrint.conName = inform.conName;
            _this.http.post('/api/nontification-delayed-template', _this.informTemplatePrint)
                .map(function (data) { return data.json(); })
                .subscribe(function (data) {
                jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&book_admin=' + data.bookAdmin));
            });
        });
    };
    __decorate([
        core_1.ViewChild('add_message'), 
        __metadata('design:type', core_1.ElementRef)
    ], SearchInformComponent.prototype, "addMessage", void 0);
    SearchInformComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-inform',
            templateUrl: './search_inform.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], SearchInformComponent);
    return SearchInformComponent;
}());
exports.SearchInformComponent = SearchInformComponent;
//# sourceMappingURL=search_inform.component.js.map