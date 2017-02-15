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
 * Created by best on 30/10/2559.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
/**
 * Created by best on 5/10/2559.
 */
var DetailCancelRegisterationButtonComponent = (function () {
    function DetailCancelRegisterationButtonComponent(router) {
        this.router = router;
        this.lebel = 'รายละเอียด';
    }
    DetailCancelRegisterationButtonComponent.prototype.gotoDetailCancel = function () {
        var url = ['follow/cancel-registration/search/detail/', this.trNo];
        this.router.navigate(url);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DetailCancelRegisterationButtonComponent.prototype, "lebel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DetailCancelRegisterationButtonComponent.prototype, "trNo", void 0);
    DetailCancelRegisterationButtonComponent = __decorate([
        core_1.Component({
            selector: 'detail-calcel-registeration-button',
            template: "\n     <div class=\"ui button blue\" style=\"font-size: 10px\" (click)=\"gotoDetailCancel()\">{{lebel}}</div>\n"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DetailCancelRegisterationButtonComponent);
    return DetailCancelRegisterationButtonComponent;
}());
exports.DetailCancelRegisterationButtonComponent = DetailCancelRegisterationButtonComponent;
//# sourceMappingURL=detail_cancel_registeration_button.component.js.map