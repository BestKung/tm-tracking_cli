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
 * Created by pramoth on 8/11/2016 AD.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var authen_service_1 = require("./shared/authen.service");
var User_1 = require("./shared/User");
var http_1 = require("@angular/http");
var LoginComponent = (function () {
    function LoginComponent(router, authenService, http) {
        this.router = router;
        this.authenService = authenService;
        this.http = http;
        this.failMessage = '';
    }
    LoginComponent.prototype.doLogin = function (event) {
        this.failMessage = '';
        event.preventDefault();
        this.login(this.username, this.password);
    };
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        var userReturn = new User_1.User();
        var user = new User_1.User();
        user.username = username;
        user.password = password;
        this.http.post('api/auth/login', user)
            .do(function (response) { return console.log('response: ', response.headers.getAll("authorization")); })
            .map(function (response) { return response.json(); })
            .subscribe(function (user) {
            _this.authenService.updateCurrentUser(user);
            _this.router.navigate(['/home']);
        }, function (err) {
            _this.failMessage = 'Failed to sign in! Please check your credentials and try again.';
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gt-login',
            templateUrl: 'login.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, authen_service_1.AuthenService, http_1.Http])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map