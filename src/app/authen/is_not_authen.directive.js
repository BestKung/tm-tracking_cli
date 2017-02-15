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
var User_1 = require("./shared/User");
var IsNotAuthenDirective = (function () {
    function IsNotAuthenDirective(_templateRef, _viewContainer, _authenService) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._authenService = _authenService;
    }
    Object.defineProperty(IsNotAuthenDirective.prototype, "isNotAuthen", {
        set: function (_user) {
            if (!_user) {
                this._viewContainer.createEmbeddedView(this._templateRef);
            }
            else {
                this._viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input("isNotAuthen"), 
        __metadata('design:type', User_1.User), 
        __metadata('design:paramtypes', [User_1.User])
    ], IsNotAuthenDirective.prototype, "isNotAuthen", null);
    IsNotAuthenDirective = __decorate([
        core_1.Directive({
            selector: '[isNotAuthen]'
        }), 
        __metadata('design:paramtypes', [core_1.TemplateRef, core_1.ViewContainerRef, authen_service_1.AuthenService])
    ], IsNotAuthenDirective);
    return IsNotAuthenDirective;
}());
exports.IsNotAuthenDirective = IsNotAuthenDirective;
//# sourceMappingURL=is_not_authen.directive.js.map