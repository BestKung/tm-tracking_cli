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
 * Created by best on 26/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../../shared/page");
var date_support_url_search_params_1 = require("../../../shared/date-support-url-search-params");
var EmailTestComponent = (function () {
    function EmailTestComponent(http) {
        this.http = http;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    EmailTestComponent.prototype.ngOnInit = function () {
        this.searchAction();
    };
    EmailTestComponent.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-mail', { search: params })
            .map(function (data) { return data.json(); })
            .subscribe(function (data) { return _this.pageData = data; });
    };
    EmailTestComponent.prototype.setMail = function () {
        var _this = this;
        this.http.get('/api/test-mail/set-mail')
            .subscribe(function (data) {
            _this.searchAction();
        });
    };
    EmailTestComponent.prototype.sendMail = function () {
        var _this = this;
        this.http.get('/api/test-mail/send-mail')
            .subscribe(function (data) {
            _this.searchAction();
        });
    };
    EmailTestComponent.prototype.save = function (email) {
        var _this = this;
        console.log(email);
        this.http.post('/api/test-mail', email).subscribe(function (data) {
            _this.searchAction();
        });
    };
    EmailTestComponent.prototype.message = function (email) {
        var _this = this;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('id', email.id);
        this.http.get('/api/test-mail/message', { search: params }).subscribe(function (data) {
            _this.searchAction();
        });
    };
    EmailTestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'email-test',
            templateUrl: 'email.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], EmailTestComponent);
    return EmailTestComponent;
}());
exports.EmailTestComponent = EmailTestComponent;
//# sourceMappingURL=email_test.component.js.map