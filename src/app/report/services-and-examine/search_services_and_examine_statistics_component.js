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
 * Created by neng on 4/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var intercept_http_1 = require("../../shared/intercept_http");
var SearchServicesAndExamineStatistics = (function () {
    function SearchServicesAndExamineStatistics(_http) {
        this._http = _http;
        this.pageData = new page_1.Page();
        this.search = new SearchServiceAndExamineStatistic();
        this.currentPage = 0;
        this.pageSize = 10;
        this.reportType = '';
        this.formTypes = [
            { 'id': '01', 'desc': 'ก.01' },
            { 'id': '04', 'desc': 'ก.04' },
            { 'id': '05', 'desc': 'ก.05' },
            { 'id': '06', 'desc': 'ก.06' },
            { 'id': '07', 'desc': 'ก.07' },
            { 'id': '08', 'desc': 'ก.08' }
        ];
    }
    SearchServicesAndExamineStatistics.prototype.ngOnInit = function () {
        this.search.reportType = '';
        this.search.formType = '';
        this.search.organize = '1';
    };
    SearchServicesAndExamineStatistics.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        var params = new http_1.URLSearchParams();
        params.set('reportType', this.search.reportType || null);
        params.set('formType', this.search.formType || null);
        params.set('trNo', this.search.trNo || null);
        params.set('organize', this.search.organize || null);
        params.set('createDateFrom', (this.search.createDateFrom == undefined ? null : this.search.createDateFrom + "") || null);
        params.set('createDateTo', (this.search.createDateTo == undefined ? null : this.search.createDateTo + "") || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this._http.get('/api/service-examine/search', { search: params }).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            _this.pageData = resp;
            console.log("search ServiceAndExamineStatistic ", _this.pageData);
        });
        if (Number(this.search.reportType) === 1) {
            this.reportType = 'รายงานสถิติการบันทึกข้อตกลง';
        }
        else if (Number(this.search.reportType) === 2) {
            this.reportType = 'รายงานสถิติการแจ้งคืนคำขอ';
        }
        else if (Number(this.search.reportType) === 3) {
            this.reportType = 'รายงานสถิติการยื่นอุทธรณ์';
        }
        else if (Number(this.search.reportType) === 4) {
            this.reportType = 'รายงานสถิติการบันทึก ก.20';
        }
    };
    SearchServicesAndExamineStatistics.prototype.exportTo = function (type) {
        var outputFileName = '';
        if (type == 'pdf') {
            outputFileName = 'service_and_examine_statistic.pdf';
        }
        if (type == 'xlsx') {
            outputFileName = 'service_and_examine_statistic.xlsx';
        }
        var orgParam = '';
        var reportName = 'รายงานสถิติการบันทึกข้อตกลง';
        if (this.search.organize == '1' || this.search.organize == undefined) {
            orgParam = 'กรมทรัพย์สินทางปัญญา';
        }
        if (this.search.organize == '2') {
            orgParam = 'สำนักงานพาณิชย์จังหวัด';
        }
        if (this.search.reportType == '1') {
            reportName = 'รายงานสถิติการบันทึกข้อตกลง';
        }
        if (this.search.reportType == '2') {
            reportName = 'รายงานสถิติการแจ้งคืนคำขอ';
        }
        if (this.search.reportType == '3') {
            reportName = 'รายงานสถิติการยื่นอุทธรณ์';
        }
        if (this.search.reportType == '4') {
            reportName = 'รายงานสถิติการบันทึก ก.20';
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/statistic/statistic_floor3.jasper&report_name=' + reportName + '' + (this.search.formType == undefined ? '' : '&form_type=' + this.search.formType) + "" + (this.search.trNo == undefined ? '' : '&tr_no=' + this.search.trNo) + "&org=" + orgParam + "" + (this.search.createDateFrom == undefined ? '' : '&create_date_from=' + this.search.createDateFrom) + "" + (this.search.createDateTo == undefined ? '' : '&create_date_to=' + this.search.createDateTo) + "" + (this.search.reportType == undefined ? '' : '&report_type=' + this.search.reportType)));
    };
    SearchServicesAndExamineStatistics.prototype.reportChange = function (event) {
        this.search.reportType = event.target.value;
    };
    SearchServicesAndExamineStatistics.prototype.formTypeChange = function (event) {
        this.search.formType = event.target.value;
    };
    SearchServicesAndExamineStatistics.prototype.orgChange = function (event) {
        this.search.organize = event.target.value;
    };
    SearchServicesAndExamineStatistics.prototype.clear = function () {
        this.search = new SearchServiceAndExamineStatistic();
        this.search.reportType = '';
        this.search.formType = '';
        this.search.organize = '1';
    };
    SearchServicesAndExamineStatistics = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "search-services-and-examine-statistics",
            templateUrl: "search_services_and_examine_statistics.html"
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp])
    ], SearchServicesAndExamineStatistics);
    return SearchServicesAndExamineStatistics;
}());
exports.SearchServicesAndExamineStatistics = SearchServicesAndExamineStatistics;
var SearchServiceAndExamineStatistic = (function () {
    function SearchServiceAndExamineStatistic() {
    }
    return SearchServiceAndExamineStatistic;
}());
exports.SearchServiceAndExamineStatistic = SearchServiceAndExamineStatistic;
//# sourceMappingURL=search_services_and_examine_statistics_component.js.map