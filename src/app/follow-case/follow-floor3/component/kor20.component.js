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
 * Created by neng on 15/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var Kor20Component = (function () {
    function Kor20Component(http, toastsManager) {
        this.http = http;
        this.toastsManager = toastsManager;
        this.completed = new core_1.EventEmitter();
    }
    Kor20Component.prototype.showKor20Modal = function () {
        jQuery(this.kor20Modal.nativeElement).modal({ observeChanges: true }).modal('toggle');
    };
    Kor20Component.prototype.saveKor20Date = function () {
        var _this = this;
        this.http.post('/api/absence-agreement/3nd-save-kor20', {
            agreementId: this.ageementId,
            kor20Date: this.recvKor20Date
        }).filter(function (resp) { return resp.status === 200; })
            .subscribe(function (resp) {
            console.log(resp);
            _this.completed.emit(_this.ageementId);
            _this.toastsManager.success("บันทึกข้อมูลสำเร็จ");
            jQuery(_this.confirmModal.nativeElement).modal('hide');
        });
    };
    Kor20Component.prototype.showConfirmDialog = function () {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    Kor20Component.prototype.cancelSaveKor20Date = function () {
        jQuery(this.kor20Modal.nativeElement).modal('show');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Kor20Component.prototype, "ageementId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Kor20Component.prototype, "requestNo", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], Kor20Component.prototype, "completed", void 0);
    __decorate([
        core_1.ViewChild("kor20_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], Kor20Component.prototype, "kor20Modal", void 0);
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], Kor20Component.prototype, "confirmModal", void 0);
    Kor20Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'kor20',
            templateUrl: 'kor20.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], Kor20Component);
    return Kor20Component;
}());
exports.Kor20Component = Kor20Component;
//# sourceMappingURL=kor20.component.js.map