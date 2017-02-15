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
var http_1 = require("@angular/http");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var ReturnRequestRenewComponent = (function () {
    function ReturnRequestRenewComponent(activateRoute, http, router, toasts) {
        this.activateRoute = activateRoute;
        this.http = http;
        this.router = router;
        this.toasts = toasts;
        this.returnRequestRenew = new ReturnRequestRenew();
    }
    ReturnRequestRenewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activateRoute.params.subscribe(function (param) { return _this.letterId = param['letter-id']; });
        this.loadReturnRequestFromLetterId(this.letterId);
    };
    ReturnRequestRenewComponent.prototype.loadReturnRequestFromLetterId = function (letterId) {
        var _this = this;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('letterId', letterId);
        this.http.get('/api/letter/return-request-renew', { search: params })
            .map(function (resp) { return resp.json(); })
            .subscribe(function (result) { return _this.returnRequestRenew = result; });
    };
    ReturnRequestRenewComponent.prototype.save = function () {
        var _this = this;
        this.http.post('/api/return-request/save-renew', this.returnRequestRenew)
            .subscribe(function (result) {
            if (result.ok) {
                _this.toasts.info("บันทึกข้อมูลสำเร็จ");
                _this.router.navigate(['/list-acknowledgement/search']);
            }
        });
    };
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], ReturnRequestRenewComponent.prototype, "confirmModal", void 0);
    ReturnRequestRenewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'return-request-renew',
            templateUrl: 'return_request_renew.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, router_1.Router, ng2_toastr_1.ToastsManager])
    ], ReturnRequestRenewComponent);
    return ReturnRequestRenewComponent;
}());
exports.ReturnRequestRenewComponent = ReturnRequestRenewComponent;
var ReturnRequestRenew = (function () {
    function ReturnRequestRenew() {
    }
    return ReturnRequestRenew;
}());
exports.ReturnRequestRenew = ReturnRequestRenew;
//# sourceMappingURL=return_request_renew.component.js.map