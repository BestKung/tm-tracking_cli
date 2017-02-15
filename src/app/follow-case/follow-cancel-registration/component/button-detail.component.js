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
 * Created by neng on 6/10/2559.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DetailButtonComponent = (function () {
    function DetailButtonComponent(router) {
        this.router = router;
    }
    DetailButtonComponent.prototype.redirectToDetailPage = function () {
        var redirectUrl = ['cancel-registration/detail', this.trNo];
        this.router.navigate(redirectUrl);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DetailButtonComponent.prototype, "trNo", void 0);
    DetailButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'detail-button',
            template: "<a class=\"ui primary mini button\" style=\"font-size: 10px\" (click)=\"redirectToDetailPage()\">\n                \u0E23\u0E32\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14\n               </a>"
        }), 
        __metadata('design:paramtypes', [router_1.Router])
    ], DetailButtonComponent);
    return DetailButtonComponent;
}());
exports.DetailButtonComponent = DetailButtonComponent;
//# sourceMappingURL=button-detail.component.js.map