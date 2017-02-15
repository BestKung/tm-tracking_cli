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
var page_1 = require("../../shared/page");
var rest_object_service_1 = require("../../core/rest_object.service");
var absence_agreement_service_1 = require("../../core/absence-agreement.service");
var Floor3Search = (function () {
    function Floor3Search(_absenceAgreementService, _restObjService) {
        this._absenceAgreementService = _absenceAgreementService;
        this._restObjService = _restObjService;
        this.pageData = new page_1.Page();
        this.currentPage = 0;
        this.pageSize = 10;
    }
    Floor3Search.prototype.ngOnInit = function () {
        // this.searchAction();
    };
    Floor3Search.prototype.hideSaveDocModal = function () {
        this.currentAbsenceAgreement.kor20Date = this.currentKor20Date;
        console.log("date = ", this.currentAbsenceAgreement.kor20Date);
        jQuery(this.saveDocumentModal.nativeElement).modal("hide");
    };
    Floor3Search.prototype.searchAction = function (pageEvent) {
        var _this = this;
        if (pageEvent === void 0) { pageEvent = { currentPage: 1, pageSize: 10 }; }
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this._restObjService.searchAction(pageEvent).subscribe(function (resp) {
            _this.pageData = resp;
        });
    };
    Floor3Search.prototype.save = function (absenceAgreement) {
        this._absenceAgreementService.saveAbsenceAgreementByThirdFloor(absenceAgreement).subscribe();
    };
    Floor3Search.prototype.clearSearchFields = function () {
        this._restObjService.trNo = undefined;
        this._restObjService.reqDateFrom = '';
        this._restObjService.reqDateTo = '';
    };
    Floor3Search.prototype.applyLabelColor = function (color) {
        var labelClass = ['ui', 'label'];
        labelClass.push(color);
        return labelClass;
    };
    __decorate([
        core_1.ViewChild("save_document_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], Floor3Search.prototype, "saveDocumentModal", void 0);
    Floor3Search = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'floor3-search',
            templateUrl: 'floor3_search.html'
        }), 
        __metadata('design:paramtypes', [absence_agreement_service_1.AbsenceAgreementService, rest_object_service_1.RestObjectService])
    ], Floor3Search);
    return Floor3Search;
}());
exports.Floor3Search = Floor3Search;
//# sourceMappingURL=floor3_search.component.js.map