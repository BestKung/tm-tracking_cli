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
var TransferOperationalDetailComponent = (function () {
    function TransferOperationalDetailComponent(http, route) {
        this.http = http;
        this.route = route;
        this.followTranfers = new page_1.Page();
        this.categorys = new page_1.Page();
        this.steps = new Array();
        this.isComplete = false;
    }
    TransferOperationalDetailComponent.prototype.ngOnInit = function () {
        this.findTranfer();
    };
    TransferOperationalDetailComponent.prototype.findTranfer = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            _this.trNo = params['trNo'];
        });
        this.isComplete = false;
        var params = new http_1.URLSearchParams();
        params.set('trNo', this.trNo);
        this.http.get('/api/follow-tranfer/search-by-trno', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.followTranfers = data;
            _this.getCategory(data.content[0].actId);
            _this.conName = data.content[0].conName;
            _this.requestDate = data.content[0].requestDate;
            _this.isComplete = true;
        });
    };
    TransferOperationalDetailComponent.prototype.getCategory = function (actId) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("description", "คำขอโอนหรือรับมรดกสิทธิ");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', { search: params })
            .map(function (data) { return data.json(); }).subscribe(function (data) {
            _this.categorys = data.content[0];
            _this.getStepByCategory(data.content[0].id);
        });
    };
    TransferOperationalDetailComponent.prototype.getStepByCategory = function (value) {
        var _this = this;
        var params = new http_1.URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.setStepForShow(data.content);
        });
    };
    TransferOperationalDetailComponent.prototype.setStepForShow = function (step) {
        var sizeOfChanges = this.followTranfers.content.length;
        for (var i = 0; i < step.length; i++) {
            var stepForShow = new step_for_show_1.StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (var j = 0; j < sizeOfChanges; j++) {
                console.log(this.followTranfers.content[j].stepCode);
                if (step[i].statusCode == this.followTranfers.content[j].stepCode) {
                    stepForShow.personName = this.followTranfers.content[j].personName;
                    stepForShow.receiptDate = this.followTranfers.content[j].receiptDate;
                    stepForShow.successDate = this.followTranfers.content[j].successDate;
                    stepForShow.status = this.followTranfers.content[j].processStatus;
                    stepForShow.useDuration = this.followTranfers.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    };
    TransferOperationalDetailComponent.prototype.findStepDescByStepCode = function (stepCode) {
        var stepDesc = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือแสดงรายการการโอนหรือรับมรดก';
        }
        return stepDesc;
    };
    TransferOperationalDetailComponent.prototype.black = function () {
        window.history.back();
    };
    TransferOperationalDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'transfer-operational-detail',
            templateUrl: 'transfer_operational_detail.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute])
    ], TransferOperationalDetailComponent);
    return TransferOperationalDetailComponent;
}());
exports.TransferOperationalDetailComponent = TransferOperationalDetailComponent;
//# sourceMappingURL=transfer_operation_details.component.js.map