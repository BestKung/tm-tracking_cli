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
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var search_k_1 = require("./search_k");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var SearchTimerKohsComponent = (function () {
    function SearchTimerKohsComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.officers = [];
        this.filteredOfficers = [];
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
        this.search = new search_k_1.SearchK();
    }
    SearchTimerKohsComponent.prototype.ngOnInit = function () {
        this.search.formTypeStop = "";
        this.loadOfficerFromServer();
        this.searchAction();
    };
    SearchTimerKohsComponent.prototype.filterOfficers = function (event) {
        this.filteredOfficers = [];
        for (var i = 0; i < this.officers.length; i++) {
            var selectedOfficer = this.officers[i];
            if (selectedOfficer.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredOfficers.push(selectedOfficer);
            }
        }
    };
    SearchTimerKohsComponent.prototype.loadOfficerFromServer = function () {
        var _this = this;
        this.http.get("/api/officer/timer-koh14")
            .map(function (resp) { return resp.json(); })
            .subscribe(function (resp) {
            _this.officers = resp;
        });
    };
    SearchTimerKohsComponent.prototype.handleDropdownClick = function () {
        var _this = this;
        this.filteredOfficers = [];
        //mimic remote call
        setTimeout(function () {
            _this.filteredOfficers = _this.officers;
        }, 100);
    };
    SearchTimerKohsComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo);
        params.set("formType", this.search.formTypeStop);
        params.set("start", this.search.start);
        params.set("end", this.search.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get("/api/stop-duration-k", { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    SearchTimerKohsComponent.prototype.clickStart = function (stopDurationK) {
        var _this = this;
        this.http.post('/api/stop-duration-k/start', stopDurationK).subscribe(function (data) {
            var pageEvent = { currentPage: _this.currentPage + 1, pageSize: _this.pageSize };
            _this.toastr.success('เริ่มนับเวลาเเล้ว');
            _this.searchAction(pageEvent);
        });
    };
    SearchTimerKohsComponent.prototype.clear = function () {
        this.search = new search_k_1.SearchK();
        this.searchAction();
    };
    SearchTimerKohsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "search-timer-kohs",
            templateUrl: "search_timer_kohs.html"
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, ng2_toastr_1.ToastsManager])
    ], SearchTimerKohsComponent);
    return SearchTimerKohsComponent;
}());
exports.SearchTimerKohsComponent = SearchTimerKohsComponent;
//# sourceMappingURL=search_timer_kohs.component.js.map