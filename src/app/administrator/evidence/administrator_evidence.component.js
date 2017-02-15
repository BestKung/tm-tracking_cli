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
 * Created by best on 10/9/2559.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var evidence_model_1 = require("../../model/evidence-model");
var page_1 = require("../../shared/page");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var EvidenceComponent = (function () {
    function EvidenceComponent(http, toastr) {
        this.http = http;
        this.toastr = toastr;
        this.resp = new page_1.Page();
    }
    EvidenceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get("/api/form-type")
            .map(function (response) { return response.json(); })
            .subscribe(function (formTypes) {
            _this.formTypes = formTypes;
        });
    };
    EvidenceComponent.prototype.findByFormTypeId = function (id) {
        var _this = this;
        console.log(id);
        this.http.get("/api/evidence/" + id).map(function (resp) { return resp.json(); }).subscribe(function (evidence) {
            console.log('this is evidences of formtype, ', evidence);
            _this.evidence = evidence;
        });
    };
    EvidenceComponent.prototype.saveEvidence = function () {
        var _this = this;
        this.http.post('/api/administrator/evidence', this.evidence).subscribe(function (resp) {
            console.log(resp);
            _this.toastr.success('บันทึกข้อมูลสำเร็จ');
            _this.fetchDataTable();
        });
    };
    EvidenceComponent.prototype.saveEvidences = function () {
        var _this = this;
        this.http.post('/api/evidence/', this.evidence).subscribe(function (resp) {
            console.log(resp);
            _this.evidence = new evidence_model_1.EvidenceModel();
            _this.onChangeFormType(_this.currentFormTypeId);
        });
    };
    EvidenceComponent.prototype.fetchDataTable = function () {
        var _this = this;
        this.http.get('/api/administrator/evidence').map(function (resp) { return resp.json(); }).subscribe(function (result) {
            _this.resp = result;
        });
    };
    EvidenceComponent.prototype.delete = function (id) {
        this.http.post('/api/administrator/evidence/delete/', { "id": id }).subscribe(function (result) {
            console.log(result);
        });
        this.fetchDataTable();
    };
    EvidenceComponent.prototype.onChangeFormType = function (id) {
        this.currentFormTypeId = id;
        this.findByFormTypeId(this.currentFormTypeId);
    };
    EvidenceComponent.prototype.back = function () {
        window.history.back();
    };
    EvidenceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'administrator-evidence',
            templateUrl: 'administrator_evidence.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, ng2_toastr_1.ToastsManager])
    ], EvidenceComponent);
    return EvidenceComponent;
}());
exports.EvidenceComponent = EvidenceComponent;
//# sourceMappingURL=administrator_evidence.component.js.map