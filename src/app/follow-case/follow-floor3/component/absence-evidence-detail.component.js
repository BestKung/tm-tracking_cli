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
 * Created by neng on 14/10/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var authen_service_1 = require("../../../authen/shared/authen.service");
var User_1 = require("../../../authen/shared/User");
var rest_object_service_1 = require("../../../core/rest_object.service");
var absence_agreement_model_1 = require("../../../model/absence-agreement-model");
var verify_evidence_model_1 = require("../../../model/verify-evidence-model");
var AbsenceEvidenceDetailComponent = (function () {
    function AbsenceEvidenceDetailComponent(http, router, authenService, restObject) {
        this.http = http;
        this.router = router;
        this.authenService = authenService;
        this.restObject = restObject;
        this.evidences = {};
        this.currentUser = new User_1.User();
    }
    AbsenceEvidenceDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenService.getUser().subscribe(function (authen) {
            _this.currentUser = authen;
        });
    };
    AbsenceEvidenceDetailComponent.prototype.showDetailModal = function () {
        var _this = this;
        this.http.get("/api/absence-evidence/" + this.agreementId).map(function (result) { return result.json(); }).subscribe(function (resp) {
            _this.groupEvidence(resp);
        });
        jQuery(this.detailModal.nativeElement).modal({ observeChanges: true }).modal('toggle');
    };
    AbsenceEvidenceDetailComponent.prototype.exportReport = function () {
        var outputFileName = 'agreement_' + this.trNo + ".pdf";
        jQuery(this.detailModal.nativeElement).modal({ observeChanges: true }).modal('toggle');
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/agreement/agreement_parent.jasper&agreement_id=' + this.agreementId + "&current_user=" + this.currentUser.userName));
    };
    AbsenceEvidenceDetailComponent.prototype.groupEvidence = function (evidences) {
        this.evidences = {};
        for (var _i = 0, evidences_1 = evidences; _i < evidences_1.length; _i++) {
            var evd = evidences_1[_i];
            if (this.evidences.hasOwnProperty(evd.formType.formDesc)) {
                this.evidences[evd.formType.formDesc].push(evd);
            }
            else {
                this.evidences[evd.formType.formDesc] = [];
                this.evidences[evd.formType.formDesc].push(evd);
            }
        }
        console.log(this.evidences);
    };
    AbsenceEvidenceDetailComponent.prototype.transformMapToArrayBeforeInteration = function () {
        return Object.keys(this.evidences);
    };
    AbsenceEvidenceDetailComponent.prototype.editVerifyEvidenceSelected = function () {
        var pk = new verify_evidence_model_1.VerifyEvidencePk();
        pk.reqDate = this.reqDate;
        pk.trNo = this.trNo;
        this.restObject.agreementId = undefined;
        this.restObject.agreementId = this.agreementId;
        this.restObject.pk = [];
        this.restObject.evidences = {};
        this.restObject.contract = new absence_agreement_model_1.Contract();
        this.restObject.pk.push(pk);
        jQuery(this.detailModal.nativeElement).modal({ observeChanges: true }).modal('toggle');
        var redirectToUrl = ['verify-evidences/agreement/'];
        this.router.navigate(redirectToUrl);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AbsenceEvidenceDetailComponent.prototype, "agreementId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AbsenceEvidenceDetailComponent.prototype, "trNo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], AbsenceEvidenceDetailComponent.prototype, "reqDate", void 0);
    __decorate([
        core_1.ViewChild("absence_evidence_detail_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], AbsenceEvidenceDetailComponent.prototype, "detailModal", void 0);
    AbsenceEvidenceDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'absence-evidence-detail',
            templateUrl: 'absence-evidence-detail.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, authen_service_1.AuthenService, rest_object_service_1.RestObjectService])
    ], AbsenceEvidenceDetailComponent);
    return AbsenceEvidenceDetailComponent;
}());
exports.AbsenceEvidenceDetailComponent = AbsenceEvidenceDetailComponent;
//# sourceMappingURL=absence-evidence-detail.component.js.map