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
 * Created by neng on 13/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var DiscardRequestComponent = (function () {
    function DiscardRequestComponent(http, toastsManager) {
        this.http = http;
        this.toastsManager = toastsManager;
        this.completed = new core_1.EventEmitter();
        this.discard = new DiscardRequest();
    }
    DiscardRequestComponent.prototype.discardRequest = function () {
        var _this = this;
        this.discard.agreementId = this.agreementId;
        console.log(this.discard);
        if (!this.discard.discardDate) {
            this.toastsManager.warning('กรุณาเลือกวันที่ละทิ้ง');
            return;
        }
        this.http.post('/api/discard-request', this.discard).subscribe(function (resp) {
            console.log(resp);
            if (resp.status = 200) {
                _this.completed.emit(_this.agreementId);
                jQuery(_this.discardModal.nativeElement).modal('hide');
            }
        });
    };
    DiscardRequestComponent.prototype.showDiscardModal = function () {
        jQuery(this.discardModal.nativeElement).modal('toggle');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DiscardRequestComponent.prototype, "labelColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DiscardRequestComponent.prototype, "agreementId", void 0);
    __decorate([
        core_1.ViewChild("discard_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], DiscardRequestComponent.prototype, "discardModal", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], DiscardRequestComponent.prototype, "completed", void 0);
    DiscardRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'discard-request',
            templateUrl: 'discard-request.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], DiscardRequestComponent);
    return DiscardRequestComponent;
}());
exports.DiscardRequestComponent = DiscardRequestComponent;
var DiscardRequest = (function () {
    function DiscardRequest() {
    }
    return DiscardRequest;
}());
exports.DiscardRequest = DiscardRequest;
//# sourceMappingURL=discard-request.component.js.map