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
 * Created by best on 12/12/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var page_1 = require("../../shared/page");
var StopDurationComponent = (function () {
    function StopDurationComponent(http) {
        this.http = http;
        this.stopDuration = new page_1.Page();
        this.stopDurationK = new page_1.Page();
        this.stepDesc = {
            '101': 'ตรวจสอบเอกสารรับคำขอ',
            '201': 'ตรวจสอบเครื่องหมาย',
            '202': 'นายทะเบียนพิจารณา',
            '301': 'จัดทำหนังสือประกาศโฆษณา',
            '304': 'ประกาศโฆษณา',
            '307': 'ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน',
            '308': 'ออกหนังสือสำคัญแสดงการจดทะเบียน'
        };
    }
    StopDurationComponent.prototype.searchAction = function () {
        var _this = this;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        console.log('------' + this.today);
        params.set('trNo', this.trNo);
        params.set('today', this.today);
        this.http.get('/api/stop-doration-trademark', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) {
            _this.stopDuration = data;
            for (var i = 0; i < _this.stopDuration.content.length; i++) {
                if (!_this.stopDuration.content[i].restDurationForAct) {
                    _this.stopDuration.content[i].restDurationForAct = _this.stopDuration.content[i].followTrademark.restDurationForAct;
                    _this.stopDuration.content[i].stopDuration = _this.stopDuration.content[i].followTrademark.stopDuration;
                    _this.stopDuration.content[i].restDurationForStep = _this.stopDuration.content[i].followTrademark.restDurationForStep;
                    _this.stopDuration.content[i].restDorationPercenForAct = _this.stopDuration.content[i].followTrademark.restDorationPercenForAct;
                    _this.stopDuration.content[i].restDurationPercenForStep = _this.stopDuration.content[i].followTrademark.restDorationPercenForStep;
                    _this.stopDuration.content[i].overDuration = _this.stopDuration.content[i].followTrademark.overDuration;
                }
            }
        });
        this.http.get("/api/stop-doration-trademark/stop-duration-k", { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.stopDurationK = data; });
    };
    StopDurationComponent.prototype.clickStartDuration = function (duration) {
        var _this = this;
        this.http.post('/api/stop-doration-trademark/start-duration', duration).subscribe(function (data) {
            var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
            params.set('trNo', _this.trNo);
            _this.http.get("/api/stop-doration-trademark/stop-duration-k", { search: params })
                .map(function (data) { return data.json(); })
                .subscribe(function (data) { return _this.stopDurationK = data; });
        });
    };
    StopDurationComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stop-duration',
            templateUrl: 'stop_duration.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], StopDurationComponent);
    return StopDurationComponent;
}());
exports.StopDurationComponent = StopDurationComponent;
//# sourceMappingURL=stop_duration.component.js.map