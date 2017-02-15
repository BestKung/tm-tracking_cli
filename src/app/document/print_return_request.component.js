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
var authen_service_1 = require("../authen/shared/authen.service");
var User_1 = require("../authen/shared/User");
var intercept_http_1 = require("../shared/intercept_http");
var PrintReturnRequestComponent = (function () {
    function PrintReturnRequestComponent(_http, toastr, authenService) {
        this._http = _http;
        this.toastr = toastr;
        this.authenService = authenService;
        this.pageData = new page_1.Page();
        this.search = new SearchReturnRequest();
        this.chkListAll = false;
        this.currentPage = 0;
        this.pageSize = 10;
        this.currentUser = new User_1.User();
    }
    PrintReturnRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenService.getUser().subscribe(function (authen) {
            _this.currentUser = authen;
        });
        console.log("current user ", this.currentUser);
        this.loadOfficerFromServer();
        this.chkListAll = false;
        this.searchAction();
    };
    PrintReturnRequestComponent.prototype.loadOfficerFromServer = function () {
        var _this = this;
        this._http.get('/api/officer/').map(function (reps) { return reps.json(); }).subscribe(function (reps) {
            _this.officerName = reps.personName;
            _this.officerPosition = reps.positionName;
            console.log("current_Officer .   ", _this.officerName + " " + _this.officerPosition);
        });
    };
    PrintReturnRequestComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("returnDateFrom", this.search.returnDateFrom || null);
        params.set("returnDateTo", this.search.returnDateTo || null);
        params.set("status", this.search.status || null);
        params.set("bookStatus", this.search.bookStatus || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this._http.get('/api/return-request/search', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.pageData = resp;
            console.log(_this.pageData);
        });
    };
    PrintReturnRequestComponent.prototype.checkAll = function (event) {
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            itm.chk = event.target.checked;
        }
        console.log('check all');
    };
    PrintReturnRequestComponent.prototype.isCheckboxAll = function () {
        var countItem = 0;
        this.pageData.content.forEach(function (itm) {
            if (itm.chk) {
                countItem += 1;
            }
        });
        return (countItem == this.pageData.content.length) && (this.pageData.content.length > 0);
    };
    PrintReturnRequestComponent.prototype.saveCancel = function () {
        var _this = this;
        this._extractData('cancel');
        if (this.saveItems.length > 0) {
            this.closeConfirmModal();
            this._http.post('/api/return-request/save-cancel', this.saveItems).subscribe(function (resp) {
                _this.toastr.info('ยกเลิกหนังสือสำเร็จ');
                _this.searchAction();
            });
        }
    };
    PrintReturnRequestComponent.prototype.closeConfirmModal = function () {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    };
    PrintReturnRequestComponent.prototype.showConfirmModal = function () {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    PrintReturnRequestComponent.prototype.printAndReleaseBookM = function () {
        var _this = this;
        this._extractData('print');
        if (!this.bookDate) {
            this.toastr.warning("กรุณากรอก วันที่ออกหนังสือ");
            return;
        }
        if (this.saveItems.length > 0) {
            this._setBookDate();
            console.log("this is save itm ", this.saveItems);
            this._http.post('/api/print-document/return-request', this.saveItems).subscribe(function (resp) {
                if (resp.status == 200) {
                    _this._extractData('print');
                    console.log('page data ', _this.pageData.content);
                    var outputFileName = 'return.pdf';
                    var ids = [];
                    for (var _i = 0, _a = _this.pageData.content; _i < _a.length; _i++) {
                        var itm = _a[_i];
                        if (itm.chk) {
                            ids.push(itm.id);
                        }
                    }
                    _this.closeConfirmModal();
                    jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + ids + "&officerName=" + _this.officerName + "&officerPosition=" + _this.officerPosition));
                    _this.searchAction();
                }
            });
        }
    };
    PrintReturnRequestComponent.prototype.printAgain = function () {
        console.log('page data ', this.pageData.content);
        var outputFileName = 'return.pdf';
        var ids = [];
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            if (itm.chk == true) {
                ids.push(itm.id);
            }
        }
        if (ids.length == 0) {
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + ids + "&officerName=" + this.officerName + "&officerPosition=" + this.officerPosition));
        this.searchAction();
    };
    PrintReturnRequestComponent.prototype.bookAdminStatusChange = function (event) {
        this.search.status = event.target.value;
        console.log(this.search.status);
    };
    PrintReturnRequestComponent.prototype.bookStatusChange = function (event) {
        this.search.bookStatus = event.target.value;
        if (event.target.value == 2) {
            this.search.status = 2;
        }
        console.log("this is book status > ", this.search.bookStatus);
    };
    PrintReturnRequestComponent.prototype._setBookDate = function () {
        for (var _i = 0, _a = this.saveItems; _i < _a.length; _i++) {
            var itm = _a[_i];
            itm.bookDate = this.bookDate;
        }
        console.log("save item , ", this.saveItems);
    };
    PrintReturnRequestComponent.prototype._extractData = function (btnAction) {
        this.saveItems = new Array();
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var itm = _a[_i];
            if (itm.chk) {
                if ("cancel" == btnAction) {
                    if (!itm.canceledFlag) {
                        this.closeConfirmModal();
                        this.toastr.warning('กรุณาเลือกหนังสือที่ต้องการยกเลิก');
                        return;
                    }
                }
                this.saveItems.push(itm);
            }
        }
        if (this.saveItems.length < 1) {
            this.closeConfirmModal();
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
    };
    PrintReturnRequestComponent.prototype.onCheck = function (itm, chk) {
        itm.chk = chk;
        var count = 0;
        for (var _i = 0, _a = this.pageData.content; _i < _a.length; _i++) {
            var val = _a[_i];
            if (val.chk) {
                count += 1;
            }
        }
        console.log("count " + count + " this.returnRequests.content.length " + this.pageData.content.length);
        if (count == this.pageData.content.length) {
            jQuery(this.chkAll.nativeElement).checked = true;
        }
        else {
            jQuery(this.chkAll.nativeElement).checked = false;
        }
    };
    PrintReturnRequestComponent.prototype.clear = function () {
        this.search = new SearchReturnRequest();
        jQuery(this.statusSelection.nativeElement).val('');
        console.log(jQuery(this.statusSelection.nativeElement).val());
    };
    __decorate([
        core_1.ViewChild("chkAll"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrintReturnRequestComponent.prototype, "chkAll", void 0);
    __decorate([
        core_1.ViewChild("book_admin_status_selection"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrintReturnRequestComponent.prototype, "statusSelection", void 0);
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], PrintReturnRequestComponent.prototype, "confirmModal", void 0);
    PrintReturnRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'print-return-request',
            templateUrl: './print_return_request.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager, authen_service_1.AuthenService])
    ], PrintReturnRequestComponent);
    return PrintReturnRequestComponent;
}());
exports.PrintReturnRequestComponent = PrintReturnRequestComponent;
var SearchReturnRequest = (function () {
    function SearchReturnRequest() {
        this.status = 1;
        this.bookStatus = 1;
    }
    return SearchReturnRequest;
}());
exports.SearchReturnRequest = SearchReturnRequest;
//# sourceMappingURL=print_return_request.component.js.map