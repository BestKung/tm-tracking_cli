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
var page_1 = require("../shared/page");
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var search_letter_inform_component_1 = require("../letter-inform/search_letter_inform.component");
var intercept_http_1 = require("../shared/intercept_http");
var AcknowledgementComponent = (function () {
    function AcknowledgementComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.saveLetters = [];
        this.letterStatus = [
            "ปกติ", "จดหมายตีกลับ", "ไม่ได้รับหนังสือ"
        ];
        this.search = new search_letter_inform_component_1.SearchLetterInform();
        this.currentPage = 0;
        this.pageSize = 10;
        this.cbAll = false;
    }
    AcknowledgementComponent.prototype.ngOnInit = function () {
        // this.searchAction();
    };
    AcknowledgementComponent.prototype.saveAction = function () {
        var _this = this;
        if (!this._getOnlyCheckItemToSave()) {
            return false;
        }
        if (this.saveLetters.length == 0) {
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
        this.http.post('/api/letter/save-ack', this.saveLetters).subscribe(function (resp) {
            console.log(resp);
            if (resp.status = 200) {
                _this.toastr.success('บันทึกข้อมูลสำเร็จ');
                _this.searchAction();
            }
        });
    };
    AcknowledgementComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new http_1.URLSearchParams();
        params.set("trNo", (this.search.trNo == undefined ? null : this.search.trNo + "" || null));
        params.set("bookDateFrom", (this.search.bookDateFrom == undefined ? null : this.search.bookDateFrom + "" || null));
        params.set("bookDateTo", (this.search.bookDateTo == undefined ? null : this.search.bookDateTo + "" || null));
        params.set("bookAdmin", (this.search.bookAdmin == undefined ? null : this.search.bookAdmin + "" || null));
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        params.set("status", (this.search.status == null ? null : this.search.status + ""));
        params.set("sort", "returnRequest.bookNo,ASC");
        this.http.get('/api/letter/search', { search: params })
            .map(function (resp) { return resp.json(); })
            .subscribe(function (resp) {
            _this.pageData = resp;
            if (_this.pageData.content.length < 1 && _this.cbAll == true) {
                _this.cbAll = false;
            }
            _this._unpackResult();
        });
    };
    AcknowledgementComponent.prototype._unpackResult = function () {
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            itm.flagRecv = (itm.letterStatus == null ? false : true);
        }
        console.log(this.pageData.content);
    };
    AcknowledgementComponent.prototype._getOnlyCheckItemToSave = function () {
        this.saveLetters = [];
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            if (itm.chk == true) {
                if (!itm.status) {
                    this.toastr.warning('กรุณาเลือกสถานะใบตอบรับ');
                    return false;
                }
                if (!itm.recvDate) {
                    this.toastr.warning('กรุณาเลือกวันที่ตอบรับ');
                    return false;
                }
                itm.dueDate = null;
                this.saveLetters.push(itm);
            }
        }
        return true;
    };
    AcknowledgementComponent.prototype.checkAll = function (event) {
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            itm.chk = event.checked;
        }
    };
    AcknowledgementComponent.prototype.statusChange = function (event) {
        this.search.status = event.target.value;
    };
    AcknowledgementComponent.prototype.check = function (letter, event) {
        letter.chk = event.checked;
    };
    AcknowledgementComponent.prototype.setLetterStatus = function (letter, event) {
        console.log("selected letter status = ", event.target.value);
        letter.status = event.target.value;
        letter.dueDate = null;
    };
    AcknowledgementComponent.prototype.changeReturnDueDate = function (itm) {
        if (itm.status == 'ปกติ' && itm.recvDate) {
            itm.dueDate = itm.recvDate;
            itm.dueDate = new Date(itm.dueDate.toString());
            itm.dueDate.setDate(new Date(itm.dueDate.toString()).getDate() + AcknowledgementComponent.DATE_PLUS_15);
        }
    };
    AcknowledgementComponent.prototype.clear = function () {
        this.search = new search_letter_inform_component_1.SearchLetterInform();
    };
    AcknowledgementComponent.DATE_PLUS_15 = 15;
    AcknowledgementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'acknowledgement',
            templateUrl: 'acknowledgement.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], AcknowledgementComponent);
    return AcknowledgementComponent;
}());
exports.AcknowledgementComponent = AcknowledgementComponent;
//# sourceMappingURL=acknowledgement.component.js.map