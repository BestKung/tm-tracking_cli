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
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var common_1 = require("@angular/common");
var ng_semantic_1 = require("ng-semantic");
var authen_routing_1 = require("./authen.routing");
var authen_service_1 = require("./shared/authen.service");
var auth_guard_service_1 = require("./auth-guard.service");
var login_component_1 = require("./login.component");
var hasanyrole_directive_1 = require("./hasanyrole.directive");
var user_service_1 = require("./shared/user.service");
var is_not_authen_directive_1 = require("./is_not_authen.directive");
/**
 * Created by pramoth on 8/31/2016 AD.
 */
var AuthenModule = (function () {
    function AuthenModule() {
    }
    AuthenModule = __decorate([
        core_1.NgModule({
            imports: [forms_1.FormsModule, http_1.HttpModule, common_1.CommonModule, ng_semantic_1.NgSemanticModule, authen_routing_1.routing],
            declarations: [login_component_1.LoginComponent, hasanyrole_directive_1.HasAnyRoleDirective, is_not_authen_directive_1.IsNotAuthenDirective],
            exports: [hasanyrole_directive_1.HasAnyRoleDirective, is_not_authen_directive_1.IsNotAuthenDirective],
            providers: [authen_service_1.AuthenService, auth_guard_service_1.AuthGuard, user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthenModule);
    return AuthenModule;
}());
exports.AuthenModule = AuthenModule;
//# sourceMappingURL=authen.module.js.map