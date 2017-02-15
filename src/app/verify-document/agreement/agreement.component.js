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
 * Created by pramoth on 8/29/2016 AD.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var page_1 = require("../../shared/page");
var router_1 = require("@angular/router");
var AgreementComponent = (function () {
    function AgreementComponent(http, router, route) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.resp = new page_1.Page();
    }
    AgreementComponent.prototype.ngOnInit = function () {
        this.loadFormType();
        this.initialAgreement();
    };
    AgreementComponent.prototype.initialAgreement = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var reqId = params['reqId'];
            _this.reqId = reqId;
        });
        var param = new http_1.URLSearchParams();
        param.set('recvId', this.reqId || "");
        console.log(this.reqId);
        var observableObj = this.http.get('/api/vertify-document/loadTemporaryAgreement', { search: param }).map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) {
            _this.temporaryAgreement = result;
        });
        observableObj.subscribe(function (result) { return console.log(_this.temporaryAgreement); });
    };
    AgreementComponent.prototype.loadFormType = function () {
        var _this = this;
        var observableObj = this.http.get('/api/vertify-document/loadFormType').map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) { return _this.formTypes = result; });
    };
    AgreementComponent.prototype.searchOwnerByOwnerName = function () {
        var _this = this;
        var param = new http_1.URLSearchParams();
        param.set('reqOwnerName', this.reqOwnerName || "");
        var observableObj = this.http.get('/api/vertify-document/searchOwner', { search: param }).map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) { return _this.resp = result; });
        observableObj.subscribe(function (result) { return console.log(result); });
    };
    AgreementComponent.prototype.back = function () {
        window.history.back();
    };
    return AgreementComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AgreementComponent.prototype, "reqOwnerName", void 0);
AgreementComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'document-agreement',
        templateUrl: 'agreement.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router,
        router_1.ActivatedRoute])
], AgreementComponent);
exports.AgreementComponent = AgreementComponent;
//# sourceMappingURL=agreement.component.js.map