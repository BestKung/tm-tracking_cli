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
 * Created by neng on 2/8/17.
 */
var core_1 = require("@angular/core");
var intercept_http_1 = require("../../shared/intercept_http");
var page_1 = require("../../shared/page");
var v_k14_1 = require("./v_k14");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var search_vk14_1 = require("./search_vk14");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var SearchTimerKoh14Component = (function () {
    function SearchTimerKoh14Component(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.officers = [];
        this.filteredOfficers = [];
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
        this.searchVK14 = new search_vk14_1.SearchVK14();
    }
    SearchTimerKoh14Component.prototype.ngOnInit = function () {
        this.loadOfficerFromServer();
        this.searchVK14.status = '';
        this.searchAction();
    };
    SearchTimerKoh14Component.prototype.filterOfficers = function (event) {
        this.filteredOfficers = [];
        for (var i = 0; i < this.officers.length; i++) {
            var selectedOfficer = this.officers[i];
            if (selectedOfficer.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredOfficers.push(selectedOfficer);
            }
        }
    };
    SearchTimerKoh14Component.prototype.loadOfficerFromServer = function () {
        var _this = this;
        this.http.get("/api/officer/timer-koh14")
            .map(function (resp) { return resp.json(); })
            .subscribe(function (resp) {
            _this.officers = resp;
        });
    };
    SearchTimerKoh14Component.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("trNo", this.searchVK14.trNo);
        params.set("status", this.searchVK14.status);
        params.set("start", this.searchVK14.start);
        params.set("end", this.searchVK14.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get("/api/k14", { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.pageData = data;
        });
    };
    SearchTimerKoh14Component.prototype.handleDropdownClick = function () {
        var _this = this;
        this.filteredOfficers = [];
        setTimeout(function () {
            _this.filteredOfficers = _this.officers;
        }, 100);
    };
    SearchTimerKoh14Component.prototype.clickStopDuration = function (trNo, kId) {
        var _this = this;
        var data = { trNo: trNo, kId: kId };
        this.http.post("/api/k14/stop", data).subscribe(function (data) {
            console.log('save success');
            var pageEvent = { currentPage: _this.currentPage + 1, pageSize: _this.pageSize };
            _this.toastr.success('หยุดเวลาเเล้ว');
            _this.searchAction(pageEvent);
        });
    };
    SearchTimerKoh14Component.prototype.clickStartDuration = function (data) {
        var _this = this;
        this.http.post("/api/k14/start", this.setStopDurationK(data)).subscribe(function (data) {
            console.log('start success');
            var pageEvent = { currentPage: _this.currentPage + 1, pageSize: _this.pageSize };
            _this.toastr.success('เริ่มนับเวลาเเล้ว');
            _this.searchAction(pageEvent);
        });
    };
    SearchTimerKoh14Component.prototype.clickSuccess = function (data) {
        var _this = this;
        this.http.post("/api/k14/success", this.setStopDurationK(data)).subscribe(function (data) {
            console.log('start success');
            var pageEvent = { currentPage: _this.currentPage + 1, pageSize: _this.pageSize };
            _this.toastr.success('บันทึกข้อมูลเเล้ว');
            _this.searchAction(pageEvent);
        });
    };
    SearchTimerKoh14Component.prototype.isStopDuration = function (stopDurationK) {
        if (stopDurationK) {
            return stopDurationK.flagStart == 'stop' ? true : false;
        }
        else {
            return false;
        }
    };
    SearchTimerKoh14Component.prototype.clear = function () {
        this.searchVK14 = new search_vk14_1.SearchVK14();
        this.searchAction();
    };
    SearchTimerKoh14Component.prototype.setStopDurationK = function (vk14) {
        var k = new v_k14_1.StopDurationK();
        k.flagStart = vk14.flagStart;
        k.formType = vk14.formType;
        k.id = vk14.stopDurationKId;
        k.kId = vk14.id;
        k.numberOfDuration = vk14.numberOfDuration;
        k.startDate = vk14.startDate;
        k.stopDate = vk14.stopDate;
        k.totalDate = vk14.totalDate;
        k.trNo = vk14.trNo;
        return k;
    };
    SearchTimerKoh14Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "search-timer-koh14",
            templateUrl: "search_timer_koh14.html"
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], SearchTimerKoh14Component);
    return SearchTimerKoh14Component;
}());
exports.SearchTimerKoh14Component = SearchTimerKoh14Component;
//# sourceMappingURL=search_timer_koh14.component.js.map