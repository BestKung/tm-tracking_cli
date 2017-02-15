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
 * Created by best on 1/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var moment = require("moment");
var ManageAct = (function () {
    function ManageAct(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.acts = new page_1.Page();
        this.actId = '';
    }
    ManageAct.prototype.ngOnInit = function () {
        this.getAct();
    };
    ManageAct.prototype.getAct = function () {
        var _this = this;
        var actObserv;
        actObserv = this.http.get('/api/act/get').map(function (data) { return data.json(); });
        actObserv.subscribe(function (data) {
            for (var i = 0; i < data.content.length; i++) {
                data.content[i].actDate = moment(data.content[i].actDate, 'YYYY-MM-DD').toDate();
            }
            _this.acts = data;
        });
    };
    ManageAct.prototype.saveAct = function (act) {
        var _this = this;
        this.actId = act.actId;
        this.http.post('/api/act/save', act).subscribe(function (data) {
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.getAct();
        });
    };
    ManageAct = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'manage-act',
            templateUrl: 'manage_act.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], ManageAct);
    return ManageAct;
}());
exports.ManageAct = ManageAct;
//# sourceMappingURL=manage_act.component.js.map