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
var page_1 = require("../../shared/page");
var router_1 = require("@angular/router");
var intercept_http_1 = require("../../shared/intercept_http");
var OperationDurationDetailComponent = (function () {
    function OperationDurationDetailComponent(http, route) {
        this.http = http;
        this.route = route;
        this.reportFollowDetail = new page_1.Page();
        this.stepDesc = {
            "01": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "201": "นายทะเบียนพิจารณา",
                "202": "นายทะเบียนพิจารณา",
                "301": "จัดทำหนังสือประกาศโฆษณา",
                "304": "ประกาศโฆษณา",
                "307": "ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน",
                "308": "ออกหนังสือสำคัญแสดงการจดทะเบียน",
            },
            "04": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "202": "นายทะเบียนพิจารณา",
                "308": "ออกหนังสือแสดงรายการการโอนหรือรับมรดก"
            },
            "05": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "201": "นายทะเบียนพิจารณา",
                "307": "ออกหนังสือแจ้งให้ผู้ขอชำระค่าธรรมเนียมสัญญาอนุญาตให้ใช้เครื่องหมายการค้า",
                "308": "รับจดทะเบียนและออกหนังสือแจ้งการรับจดทะเบียนสัญญาอนุญาตให้ใช้เครื่องหมายการค้า"
            },
            "06": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "202": "นายทะเบียนพิจารณา"
            },
            "07": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "202": "นายทะเบียนพิจารณา",
                "308": "ออกหนังสือสำคัญแสดงการจดทะเบียน"
            },
            "08": {
                "101": "ตรวจสอบเอกสารรับคำขอ",
                "202": "นายทะเบียนพิจารณา"
            }
        };
    }
    OperationDurationDetailComponent.prototype.ngOnInit = function () {
        this.findDetail();
    };
    OperationDurationDetailComponent.prototype.findDetail = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.trNo = params['trNo'];
            _this.formType = params['formType'];
        });
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo.toString());
        params.set('formType', this.formType);
        this.http.get('api/report-follow-detail', { search: params })
            .map(function (data) {
            return data.json();
        })
            .subscribe(function (data) {
            _this.conName = data.content[0].conName;
            _this.requestDate = data.content[0].requestDate;
            _this.reportFollowDetail = data;
        });
    };
    OperationDurationDetailComponent.prototype.clear = function () {
    };
    OperationDurationDetailComponent.prototype.excelDownload = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.trNo.toString() || null);
        params.set('form_type', this.formType || null);
        jQuery(window.open('/report/flow_detail.xlsx?reportPath=/report/report_flow/flow_detail.jasper&'
            + params.toString()));
    };
    OperationDurationDetailComponent.prototype.pdfDownload = function () {
        var params = new http_1.URLSearchParams();
        params.set('tr_no', this.trNo.toString() || null);
        params.set('form_type', this.formType || null);
        jQuery(window.open('/report/flow_detail.pdf?reportPath=/report/report_flow/flow_detail.jasper&'
            + params.toString()));
    };
    OperationDurationDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'operation-duration-detail',
            templateUrl: 'operation_duration_detail.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, router_1.ActivatedRoute])
    ], OperationDurationDetailComponent);
    return OperationDurationDetailComponent;
}());
exports.OperationDurationDetailComponent = OperationDurationDetailComponent;
//# sourceMappingURL=operation_duration_detail.component.js.map