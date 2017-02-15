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
var authen_service_1 = require("./shared/authen.service");
/**
 * Created by pramoth on 9/7/2016 AD.
 */
var HasAnyRoleDirective = (function () {
    function HasAnyRoleDirective(templateRef, viewContainer, authenService) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.authenService = authenService;
    }
    Object.defineProperty(HasAnyRoleDirective.prototype, "hasAnyRole", {
        set: function (_roles) {
            var _this = this;
            this.roles = _roles || [];
            this.subscription = this.authenService.getUser().subscribe(function (user) {
                _this.hasRole = _this.authenService.hasAnyRole(_this.roles);
                if (_this.hasRole) {
                    _this.viewContainer.createEmbeddedView(_this.templateRef);
                }
                else {
                    _this.viewContainer.clear();
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    HasAnyRoleDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    __decorate([
        core_1.Input("hasAnyRole"), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], HasAnyRoleDirective.prototype, "hasAnyRole", null);
    HasAnyRoleDirective = __decorate([
        core_1.Directive({
            selector: '[hasAnyRole]',
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, authen_service_1.AuthenService])
    ], HasAnyRoleDirective);
    return HasAnyRoleDirective;
}());
exports.HasAnyRoleDirective = HasAnyRoleDirective;
//# sourceMappingURL=hasanyrole.directive.js.map