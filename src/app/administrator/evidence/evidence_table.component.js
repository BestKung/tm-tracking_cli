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
var evidence_model_1 = require("../../model/evidence-model");
var form_type_model_1 = require("../../model/form-type-model");
var http_1 = require("@angular/http");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
/**
 * Created by pramoth on 10/1/2016 AD.
 */
var EvidenceTableComponent = (function () {
    function EvidenceTableComponent(http, toasts) {
        this.http = http;
        this.toasts = toasts;
        this.deleteCompleted = new core_1.EventEmitter();
    }
    EvidenceTableComponent.prototype.ngOnInit = function () {
    };
    EvidenceTableComponent.prototype.addMainEvidence = function (evidences) {
        var evd = new evidence_model_1.EvidenceModel();
        evd.formType = this.formType;
        evd.formType = this.formType;
        evd.delPermit = true;
        evd.visible = true;
        evd.isCategory = false;
        evidences.push(evd);
        console.log('add new main evidence, ', evd);
    };
    EvidenceTableComponent.prototype.addSubEvidence = function (evidence) {
        var evd = new evidence_model_1.EvidenceModel();
        evd.formType = this.formType;
        evd.delPermit = true;
        evd.visible = true;
        evd.isCategory = false;
        evidence.child.push(evd);
        console.log('add new sub evidence, ', evd);
    };
    EvidenceTableComponent.prototype.removeEvidence = function (evidences, removeItem) {
        var _this = this;
        console.log('evidence remove ,', evidences);
        for (var idx = 0; idx < evidences.length; idx++) {
            if (evidences[idx] === removeItem) {
                evidences[idx].delState = true;
                if (evidences[idx].id == null) {
                    evidences.splice(idx, 1);
                    return;
                }
                this.http.post('/api/evidence/delete', evidences[idx]).subscribe(function (resp) {
                    if (resp.ok) {
                        _this.toasts.warning("ลบข้อมูลสำเร็จ");
                        _this.deleteCompleted.emit(_this.formType.id);
                    }
                }, function (err) {
                    if (err.json().exception.includes('DataIntegrityViolationException')) {
                        _this.toasts.warning("ไม่สามารถลบข้อมูลนี้ได้ เนื่องจากมีการใช้งานอยู่");
                    }
                });
                // evidences.splice(idx, 1);
                return;
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], EvidenceTableComponent.prototype, "evidences", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', form_type_model_1.FormTypeModel)
    ], EvidenceTableComponent.prototype, "formType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], EvidenceTableComponent.prototype, "deleteCompleted", void 0);
    EvidenceTableComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'evidence-table',
            templateUrl: 'evidence_table.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], EvidenceTableComponent);
    return EvidenceTableComponent;
}());
exports.EvidenceTableComponent = EvidenceTableComponent;
//# sourceMappingURL=evidence_table.component.js.map