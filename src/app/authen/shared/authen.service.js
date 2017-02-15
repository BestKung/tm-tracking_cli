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
var rxjs_1 = require("rxjs");
var User_1 = require("./User");
var http_1 = require("@angular/http");
/**
 * Created by pramoth on 8/25/2016 AD.
 */
var AuthenService = (function () {
    function AuthenService(_http) {
        this._http = _http;
        this._isAuthen = new rxjs_1.BehaviorSubject(false);
        this._isHasAnyRole = new rxjs_1.BehaviorSubject(false);
        this.user = new rxjs_1.BehaviorSubject(null);
        var tmpUser = JSON.parse(localStorage.getItem('user'));
        this.user.next(tmpUser);
    }
    AuthenService.prototype.isAuthen = function () {
        var isAuthen = localStorage.getItem("isAuthen");
        this._isAuthen = new rxjs_1.BehaviorSubject(!!isAuthen);
        return this._isAuthen;
    };
    AuthenService.prototype.authen = function (username, password) {
        var _this = this;
        var user = new User_1.User();
        user.username = username;
        user.password = password;
        this._subscription = this._http.post('api/auth/login', user)
            .do(function (response) { return console.log('response: ', response.headers.getAll("authorization")); })
            .map(function (response) { return response.json(); })
            .subscribe(function (user) { return _this.updateCurrentUser(user); });
        return this.user;
    };
    AuthenService.prototype.logout = function () {
        this._http.get("api/auth/logout").subscribe(function (e) {
            console.log("logout successful.");
        });
        localStorage.removeItem("isAuthen");
        localStorage.removeItem("user");
        this._isAuthen.next(false);
        this.user.next(null);
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        console.log("logout successful.");
    };
    AuthenService.prototype.hasAnyRole = function (roles) {
        if (!this.user.getValue()) {
            return false;
        }
        if (roles.indexOf("*") > -1) {
            return true;
        }
        var validRole = this.user.getValue().authorities.some(function (authority) { return roles.some(function (role) { return role == authority; }); });
        return validRole;
    };
    AuthenService.prototype.getUser = function () {
        return this.user;
    };
    AuthenService.prototype.updateCurrentUser = function (user) {
        console.log("::::::::::::::::::USER UPDATED:::::::::::::");
        this.user.next(user);
        if (user) {
            console.log('in if');
            localStorage.setItem("isAuthen", "true");
            localStorage.setItem('user', JSON.stringify(user));
        }
    };
    AuthenService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenService);
    return AuthenService;
}());
exports.AuthenService = AuthenService;
//# sourceMappingURL=authen.service.js.map