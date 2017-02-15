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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
/**
 * Created by best on 2/10/2559.
 */
var DetailTrademarkButton = (function () {
    function DetailTrademarkButton(router) {
        this.router = router;
        this.label = 'รายละเอียด';
    }
    DetailTrademarkButton.prototype.goToDetailTrademark = function () {
        var redirectToUrl = ['follow/trademark/detail', this.trNo];
        this.router.navigate(redirectToUrl);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DetailTrademarkButton.prototype, "trNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DetailTrademarkButton.prototype, "label", void 0);
    DetailTrademarkButton = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'detail-trademark-button',
            template: " <a class=\"ui button blue\" style=\"font-size: 10px\" (click)=\"goToDetailTrademark()\">{{label}}</a>"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DetailTrademarkButton);
    return DetailTrademarkButton;
}());
exports.DetailTrademarkButton = DetailTrademarkButton;
//# sourceMappingURL=detail_trademark_button.js.map