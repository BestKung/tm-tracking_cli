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
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var date_support_url_search_params_1 = require("../shared/date-support-url-search-params");
var intercept_http_1 = require("../shared/intercept_http");
var SearchLetterInformComponent = (function () {
    function SearchLetterInformComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.pageData = new page_1.Page();
        this.saveLetters = [];
        this.search = new SearchLetterInform();
        this.bookDate = new Date();
        this.currentPage = 0;
        this.pageSize = 10;
        this.chkListAll = false;
    }
    SearchLetterInformComponent.prototype.ngOnInit = function () {
        this.searchAction();
    };
    SearchLetterInformComponent.prototype.saveAction = function () {
        var _this = this;
        if (!this._getOnlyCheckItemToSave()) {
            return;
        }
        else {
            console.log("letters select before save  ", this.saveLetters);
            this.http.post('/api/letter/save-inform', this.saveLetters).subscribe(function (resp) {
                console.log(resp);
                _this.closeConfirmDialog();
                if (resp.status = 200) {
                    _this.toastr.success('บันทึกข้อมูลสำเร็จ');
                    _this.searchAction();
                }
            });
        }
    };
    SearchLetterInformComponent.prototype.checkAll = function (event) {
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            itm.chk = event.target.checked;
        }
    };
    SearchLetterInformComponent.prototype.check = function (value) {
        var count = 0;
        if (!value.target.checked) {
            this.chkListAll = false;
        }
        else {
            for (var i = 0; i < this.pageData.content.length; i++) {
                if (this.pageData.content[i].chk) {
                    count++;
                    if (count == this.pageData.content.length - 1) {
                        this.chkListAll = true;
                    }
                }
            }
        }
    };
    SearchLetterInformComponent.prototype.printLetterInformCard = function () {
        if (!this._getOnlyCheckItemToSave()) {
            return;
        }
        else {
            var outputFileName = "letter_inform_card.pdf";
            var ids = [];
            for (var _i = 0, _a = this.saveLetters; _i < _a.length; _i++) {
                var itm = _a[_i];
                if (itm.chk) {
                    ids.push(itm.id);
                }
            }
            if (ids == undefined || ids.length == 0) {
                this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
                this.closeConfirmDialog();
                return;
            }
            else {
                jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/letterinform-card.jasper&return_req_id=' + ids));
            }
        }
    };
    SearchLetterInformComponent.prototype.printWaybill = function () {
        if (!this._getOnlyCheckItemToSave()) {
            return;
        }
        else {
            var ids = [];
            for (var _i = 0, _a = this.saveLetters; _i < _a.length; _i++) {
                var itm = _a[_i];
                if (itm.chk) {
                    ids.push(itm.id);
                }
            }
            if (ids == undefined || ids.length == 0) {
                this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
                this.closeConfirmDialog();
                return;
            }
            else {
                jQuery(window.open('/api/return-request/letter-inform/export-to-xls?ids=' + (ids.length > 0 ? ids.toString() : null)));
            }
        }
    };
    SearchLetterInformComponent.prototype._getOnlyCheckItemToSave = function () {
        this.saveLetters = [];
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            if (itm.chk == true) {
                console.log("itm.receivedMethod >>> ", itm.receivedMethod);
                if ((itm.receivedMethod == false) && !itm.trackingNo) {
                    this.toastr.warning("กรุณาเลือกการดำเนินการ");
                    this.closeConfirmDialog();
                    return false;
                }
                else {
                    itm.bookDate = this.bookDate;
                    this.saveLetters.push(itm);
                }
            }
        }
        if (this.saveLetters == undefined || this.saveLetters.length == 0) {
            this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
            this.closeConfirmDialog();
            return false;
        }
        else {
            return true;
        }
    };
    SearchLetterInformComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("bookDateFrom", this.search.bookDateFrom || null);
        params.set("bookDateTo", this.search.bookDateTo || null);
        params.set("status", this.search.status || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/return-request/letter-inform/search', { search: params }).map(function (resp) { return resp.json(); })
            .subscribe(function (resp) {
            _this.pageData = resp;
            if (_this.pageData.content.length < 1 && _this.chkListAll == true) {
                _this.chkListAll = false;
            }
            console.log("return request search result ", _this.pageData);
            // this._unpackData();
        });
    };
    SearchLetterInformComponent.prototype.isCheckboxAll = function () {
        var countItem = 0;
        this.pageData.content.forEach(function (itm) {
            if (itm.chk) {
                countItem += 1;
            }
        });
        return (countItem == this.pageData.content.length) && (this.pageData.content.length > 0);
    };
    SearchLetterInformComponent.prototype.statusChange = function (event) {
        this.search.status = event.target.value;
    };
    SearchLetterInformComponent.prototype.clearInputs = function () {
        console.log("clear input ...");
        this.search = new SearchLetterInform();
    };
    SearchLetterInformComponent.prototype.showConfirmDialog = function () {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    SearchLetterInformComponent.prototype.closeConfirmDialog = function () {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    };
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], SearchLetterInformComponent.prototype, "confirmModal", void 0);
    SearchLetterInformComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-letter-inform',
            templateUrl: 'search_letter_inform.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], SearchLetterInformComponent);
    return SearchLetterInformComponent;
}());
exports.SearchLetterInformComponent = SearchLetterInformComponent;
var SearchLetterInform = (function () {
    function SearchLetterInform() {
        this.status = 2;
    }
    return SearchLetterInform;
}());
exports.SearchLetterInform = SearchLetterInform;
//# sourceMappingURL=search_letter_inform.component.js.map