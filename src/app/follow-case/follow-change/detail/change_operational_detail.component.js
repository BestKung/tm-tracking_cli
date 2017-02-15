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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var page_1 = require("../../../shared/page");
var step_for_show_1 = require("../../../shared/step_for_show");
var intercept_http_1 = require("../../../shared/intercept_http");
var ChangeOperationalDetailComponent = (function () {
    function ChangeOperationalDetailComponent(http, route) {
        this.http = http;
        this.route = route;
        this.changes = new page_1.Page();
        this.categorys = new page_1.Page();
        this.steps = new Array();
        this.isComplete = false;
    }
    ChangeOperationalDetailComponent.prototype.ngOnInit = function () {
        this.findChange();
    };
    ChangeOperationalDetailComponent.prototype.findChange = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.trNo = params['trNo'];
        });
        this.isComplete = false;
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo.toString());
        this.http.get('/api/follow-change/search-by-trno', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.changes = data;
            _this.conName = data.content[0].conName;
            _this.requestDate = data.content[0].requestDate;
            _this.getCategory(data.content[0].actId);
            _this.isComplete = true;
        });
    };
    ChangeOperationalDetailComponent.prototype.getCategory = function (actId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("description", "คำขอเเก้ไขเปลี่ยนเเปลงรายการจดทะเบียน");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', { search: params })
            .map(function (data) { return data.json(); }).subscribe(function (data) {
            _this.categorys = data.content[0];
            _this.getStepByCategory(data.content[0].id);
        });
    };
    ChangeOperationalDetailComponent.prototype.getStepByCategory = function (value) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.setStepForShow(data.content);
        });
    };
    ChangeOperationalDetailComponent.prototype.setStepForShow = function (step) {
        var sizeOfChanges = this.changes.content.length;
        for (var i = 0; i < step.length; i++) {
            var stepForShow = new step_for_show_1.StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (var j = 0; j < sizeOfChanges; j++) {
                console.log(this.changes.content[j].stepCode);
                if (step[i].statusCode == this.changes.content[j].stepCode) {
                    stepForShow.personName = this.changes.content[j].personName;
                    stepForShow.receiptDate = this.changes.content[j].receiptDate;
                    stepForShow.successDate = this.changes.content[j].successDate;
                    stepForShow.status = this.changes.content[j].processStatus;
                    stepForShow.useDuration = this.changes.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    };
    ChangeOperationalDetailComponent.prototype.findStepDescByStepCode = function (stepCode) {
        var stepDesc = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'การพิจารณาตรวจสอบเครื่องหมาย';
        }
        return stepDesc;
    };
    ChangeOperationalDetailComponent.prototype.black = function () {
        window.history.back();
    };
    ChangeOperationalDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'change-operational-detail',
            templateUrl: 'change_operational_detail.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, router_1.ActivatedRoute])
    ], ChangeOperationalDetailComponent);
    return ChangeOperationalDetailComponent;
}());
exports.ChangeOperationalDetailComponent = ChangeOperationalDetailComponent;
//# sourceMappingURL=change_operational_detail.component.js.map