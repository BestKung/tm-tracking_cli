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
/**
 * Created by best on 15/10/2559.
 */
var DetailRenewButtonComponent = (function () {
    function DetailRenewButtonComponent(router) {
        this.router = router;
        this.label = 'รายละเอียด';
    }
    DetailRenewButtonComponent.prototype.gotoDetailRenew = function () {
        var url = ['follow/renew/detail/', this.trNo];
        this.router.navigate(url);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DetailRenewButtonComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DetailRenewButtonComponent.prototype, "trNo", void 0);
    DetailRenewButtonComponent = __decorate([
        core_1.Component({
            selector: 'detail-renew-button',
            template: "\n            <a class=\"ui label blue\" style=\"font-size: 12px\" (click)=\"gotoDetailRenew()\">{{label}}</a>\n              "
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DetailRenewButtonComponent);
    return DetailRenewButtonComponent;
}());
exports.DetailRenewButtonComponent = DetailRenewButtonComponent;
//# sourceMappingURL=detail_renew_button.component.js.map