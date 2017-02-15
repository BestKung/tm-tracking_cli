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
 * Created by neng on 3/9/2559.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var page_1 = require("../../../shared/page");
var step_for_show_1 = require("../../../shared/step_for_show");
var CancelOperationDetailsComponent = (function () {
    function CancelOperationDetailsComponent(http, route) {
        this.http = http;
        this.route = route;
        this.categorys = new page_1.Page();
        this.steps = new Array();
        this.approve = new page_1.Page();
        this.isComplete = false;
    }
    CancelOperationDetailsComponent.prototype.ngOnInit = function () {
        this.findCancel();
    };
    CancelOperationDetailsComponent.prototype.findCancel = function () {
        var _this = this;
        this.isComplete = false;
        this.route.params.forEach(function (params) {
            _this.trNo = params['trNo'];
        });
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo);
        this.http.get('/api/follow-cancel-registration/get-by-trno', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.approve = data;
            _this.conName = data.content[0].conName;
            _this.requestDate = data.content[0].requestDate;
            _this.getCategory(data.content[0].actId);
            _this.isComplete = true;
        });
    };
    CancelOperationDetailsComponent.prototype.getCategory = function (actId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("description", "คำขอให้เพิกถอนการจดทะเบียน");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', { search: params })
            .map(function (data) { return data.json(); }).subscribe(function (data) {
            _this.categorys = data.content[0];
            _this.getStepByCategory(data.content[0].id);
        });
    };
    CancelOperationDetailsComponent.prototype.getStepByCategory = function (value) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.setStepForShow(data.content);
        });
    };
    CancelOperationDetailsComponent.prototype.setStepForShow = function (step) {
        var sizeOfChanges = this.approve.content.length;
        for (var i = 0; i < step.length; i++) {
            var stepForShow = new step_for_show_1.StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (var j = 0; j < sizeOfChanges; j++) {
                console.log(this.approve.content[j].stepCode);
                if (step[i].statusCode == this.approve.content[j].stepCode) {
                    stepForShow.personName = this.approve.content[j].personName;
                    stepForShow.receiptDate = this.approve.content[j].receiptDate;
                    stepForShow.successDate = this.approve.content[j].successDate;
                    stepForShow.status = this.approve.content[j].processStatus;
                    stepForShow.useDuration = this.approve.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    };
    CancelOperationDetailsComponent.prototype.findStepDescByStepCode = function (stepCode) {
        var stepDesc = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        return stepDesc;
    };
    CancelOperationDetailsComponent.prototype.black = function () {
        window.history.back();
    };
    CancelOperationDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "cancel-operation-details",
            templateUrl: "cancel_operation_details.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], CancelOperationDetailsComponent);
    return CancelOperationDetailsComponent;
}());
exports.CancelOperationDetailsComponent = CancelOperationDetailsComponent;
//# sourceMappingURL=cancel_operation_details.component.js.map