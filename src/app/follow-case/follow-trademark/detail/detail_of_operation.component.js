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
var router_1 = require("@angular/router");
var page_1 = require("../../../shared/page");
var category_1 = require("../../../shared/category");
var step_for_show_1 = require("../../../shared/step_for_show");
var intercept_http_1 = require("../../../shared/intercept_http");
var DetailOfOperation = (function () {
    function DetailOfOperation(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.followTrademarks = new page_1.Page();
        this.category = new category_1.Category();
        this.steps = new Array();
        this.isComplete = false;
    }
    DetailOfOperation.prototype.ngOnInit = function () {
        this.findTrademark();
    };
    DetailOfOperation.prototype.findTrademark = function () {
        var _this = this;
        this.isComplete = false;
        this.route.params.forEach(function (params) {
            _this.trNo = params['trNo'];
        });
        var params = new http_1.URLSearchParams();
        params.set("trNo", this.trNo.toString());
        this.http.get('/api/follow-trademark/search-by-trno', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            if (data.content.length == 0) {
                var url = ['follow/trademark'];
                _this.router.navigate(url);
                return;
            }
            _this.followTrademarks = data;
            _this.conName = data.content[0].conName;
            _this.requestDate = data.content[0].requestDate;
            _this.getCategory(data.content[0].actId);
            _this.isComplete = true;
            var params = new http_1.URLSearchParams();
            params.set('trNo', _this.trNo.toString());
            _this.http.get('/api/follow-trademark/is-status-r', { search: params }).subscribe(function (data) {
                console.log('data------------->', +data.json());
                if (data.json()) {
                    var redirectToUrl = ['follow/trademark'];
                    _this.router.navigate(redirectToUrl);
                }
            });
        });
    };
    DetailOfOperation.prototype.getCategory = function (actId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("description", "คำขอจดทะเบียนเครื่องหมายการค้า");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', { search: params })
            .map(function (data) { return data.json(); }).subscribe(function (data) {
            _this.category = data.content[0];
            _this.getStepByCategory(_this.category.id);
        });
    };
    DetailOfOperation.prototype.getStepByCategory = function (value) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.setStepForShow(data.content);
        });
    };
    DetailOfOperation.prototype.setStepForShow = function (step) {
        var sizeOfTrademark = this.followTrademarks.content.length;
        for (var i = 0; i < step.length; i++) {
            var stepForShow = new step_for_show_1.StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (var j = 0; j < sizeOfTrademark; j++) {
                if (step[i].statusCode == this.followTrademarks.content[j].stepCode) {
                    stepForShow.personName = this.followTrademarks.content[j].personName;
                    stepForShow.receiptDate = this.followTrademarks.content[j].receiptDate;
                    stepForShow.successDate = this.followTrademarks.content[j].successDate;
                    stepForShow.status = this.followTrademarks.content[j].processStatus;
                    stepForShow.useDuration = this.followTrademarks.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    };
    DetailOfOperation.prototype.findStepDescByStepCode = function (stepCode) {
        var stepDesc = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('201' == stepCode) {
            stepDesc = 'ตรวจสอบเครื่องหมาย';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('301' == stepCode) {
            stepDesc = 'จัดทำหนังสือประกาศโฆษณา';
        }
        else if ('304' == stepCode) {
            stepDesc = 'ประกาศโฆษณา';
        }
        else if ('307' == stepCode) {
            stepDesc = 'ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือสำคัญแสดงการจดทะเบียน';
        }
        return stepDesc;
    };
    DetailOfOperation.prototype.back = function () {
        window.history.back();
    };
    DetailOfOperation = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'datail-of-operation',
            templateUrl: 'detail_of_operation.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, router_1.ActivatedRoute, router_1.Router])
    ], DetailOfOperation);
    return DetailOfOperation;
}());
exports.DetailOfOperation = DetailOfOperation;
//# sourceMappingURL=detail_of_operation.component.js.map