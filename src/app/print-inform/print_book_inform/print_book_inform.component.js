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
var print_book_inform_1 = require("./print_book_inform");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var search_print_book_inform_1 = require("./search_print_book_inform");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var intercept_http_1 = require("../../shared/intercept_http");
/**
 * Created by best on 21/10/2559.
 */
var PrintBookInformComponent = (function () {
    function PrintBookInformComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.searchPrintBookInform = new search_print_book_inform_1.SearchPrintBookInform();
        this.printBookInform = new print_book_inform_1.PrintBookInform();
        this.isNotSpecBookDate = false;
        this.isNotSelectBook = false;
        this.currentPage = 0;
        this.pageSize = 10;
    }
    PrintBookInformComponent.prototype.ngOnInit = function () {
        this.searchPrintBookInform.whereBookAdmin = '0';
        this.searchPrintBookInform.formType = '';
        this.chkAll = false;
        this.isNotSpecBookDate = false;
    };
    PrintBookInformComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.chkAll = false;
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.searchPrintBookInform.trNo || null);
        params.set('whereBookAdmin', this.searchPrintBookInform.whereBookAdmin || null);
        params.set('formType', this.searchPrintBookInform.formType || null);
        params.set('startDateStr', this.searchPrintBookInform.startDate || null);
        params.set('endDateStr', this.searchPrintBookInform.endDate || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed-template', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    PrintBookInformComponent.prototype.clickCancelBook = function (value) {
        this.printBookInform = value;
        jQuery(this.modalConfirmCancel.nativeElement).modal({ closable: false }).modal('toggle');
    };
    PrintBookInformComponent.prototype.cancelBook = function () {
        var _this = this;
        this.printBookInform.flagCancleBook = true;
        this.http.post('/api/nontification-delayed-template', this.printBookInform)
            .subscribe(function (data) {
            _this.toastr.info('ยกเลิกหนังสือสำเร็จ');
            _this.searchAction();
        });
    };
    PrintBookInformComponent.prototype.draftBook = function (data) {
        var countSelect = 0;
        jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + data.id));
    };
    PrintBookInformComponent.prototype.draftBookAll = function () {
        var countSelect = 0;
        var ids = new Array();
        var printBookInforms = new Array();
        for (var i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                this.pageData.content[i].bookDate = this.bookDate;
                printBookInforms.push(this.pageData.content[i]);
                ids.push(this.pageData.content[i].id + '');
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.toastr.warning('เลื่อกหนังสืออย่างน้อย 1');
            this.isNotSelectBook = true;
            return;
        }
        else {
            this.isNotSelectBook = false;
        }
        jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + ids));
    };
    PrintBookInformComponent.prototype.clear = function () {
        this.searchPrintBookInform = new search_print_book_inform_1.SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
        this.searchPrintBookInform.whereBookAdmin = '0';
        this.searchAction();
    };
    PrintBookInformComponent.prototype.checkAll = function (data) {
        console.log(data);
        for (var i = 0; i < this.pageData.content.length; i++) {
            this.pageData.content[i].chk = data.target.checked;
        }
    };
    PrintBookInformComponent.prototype.cancelCheckAll = function (value) {
        if (!value.target.checked) {
            this.chkAll = false;
        }
    };
    PrintBookInformComponent.prototype.clickPrintBook = function (inform) {
        var _this = this;
        if (!this.bookDate) {
            this.isNotSpecBookDate = true;
            this.toastr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        inform.bookDate = this.bookDate;
        this.http.post('/api/nontification-delayed-template/print', inform).subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('บันทึกเลข พณ สำเร็จ');
            jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + inform.id));
        });
    };
    PrintBookInformComponent.prototype.clickPrintBookAll = function () {
        var _this = this;
        var countSelect = 0;
        if (!this.bookDate) {
            this.isNotSpecBookDate = true;
            this.toastr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        var ids = new Array();
        var printBookInforms = new Array();
        for (var i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                this.pageData.content[i].bookDate = this.bookDate;
                printBookInforms.push(this.pageData.content[i]);
                ids.push(this.pageData.content[i].id + '');
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.toastr.warning('เลื่อกหนังสืออย่างน้อย 1');
            this.isNotSelectBook = true;
            return;
        }
        else {
            this.isNotSelectBook = false;
        }
        this.http.post('/api/nontification-delayed-template/print-list', printBookInforms).subscribe(function (data) {
            _this.searchAction();
            _this.toastr.success('บันทึกเลข พณ สำเร็จ');
            jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + ids));
        });
    };
    __decorate([
        core_1.ViewChild("modal_confirm_cancel"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrintBookInformComponent.prototype, "modalConfirmCancel", void 0);
    PrintBookInformComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'print-book-inform',
            templateUrl: 'print_book_inform.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], PrintBookInformComponent);
    return PrintBookInformComponent;
}());
exports.PrintBookInformComponent = PrintBookInformComponent;
//# sourceMappingURL=print_book_inform.component.js.map