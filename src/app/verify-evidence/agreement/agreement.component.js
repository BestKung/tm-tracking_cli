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
var page_1 = require("../../shared/page");
var agency_model_1 = require("../../model/agency-model");
var absence_agreement_model_1 = require("../../model/absence-agreement-model");
var rest_object_service_1 = require("../../core/rest_object.service");
var ng2_toastr_1 = require("ng2-toastr/ng2-toastr");
var date_support_url_search_params_1 = require("../../shared/date-support-url-search-params");
var location_autocomplete_service_1 = require("../../shared/service/location-autocomplete.service");
var authen_service_1 = require("../../authen/shared/authen.service");
var User_1 = require("../../authen/shared/User");
var intercept_http_1 = require("../../shared/intercept_http");
var AgreementComponent = (function () {
    function AgreementComponent(http, restObjectService, locationService, toastr, authenService) {
        this.http = http;
        this.restObjectService = restObjectService;
        this.locationService = locationService;
        this.toastr = toastr;
        this.authenService = authenService;
        this.resp = new page_1.Page();
        this.agreement = new absence_agreement_model_1.AbsenceAgreementModel();
        this.agreementsSaved = [];
        this.storage = []; // for hold absence-evidence list
        this.formSeq = '';
        this.contract = new absence_agreement_model_1.Contract();
        this.savedAgreementIds = [];
        this.currentUser = new User_1.User();
        this.showPrintBtn = false;
    }
    AgreementComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("agreementId restObj " + this.restObjectService.agreementId);
        this.authenService.getUser().subscribe(function (authen) {
            _this.currentUser = authen;
        });
        if (!this.restObjectService.pk[0]) {
            window.history.back();
        }
        else {
            if (this.restObjectService.agreementId || this.restObjectService.ids.length > 0) {
                console.log('{1}');
                this.editAgreement();
                this.showPrintBtn = true;
            }
            else {
                console.log('{2}');
                this.generateAgreement();
            }
            this.loadFormType();
        }
    };
    AgreementComponent.prototype.ngAfterViewInit = function () {
    };
    AgreementComponent.prototype.editAgreement = function () {
        var _this = this;
        this.agreement = new absence_agreement_model_1.AbsenceAgreementModel();
        var param = new date_support_url_search_params_1.DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        param.set('agreementId', this.restObjectService.agreementId || null);
        this.http.get('/api/absence-agreement/generateAbsenceAgreement', { search: param })
            .map(function (resp) { return resp.json(); })
            .do(function (e) { return console.log(e); })
            .subscribe(function (result) {
            _this.agreement = result;
            console.log('this is agreement ', _this.agreement);
            _this.resettingContractFields(_this.agreement.agreementContract);
            _this.agreement.officerName = _this.agreement.officerName;
            _this.agreement.officerPosition = _this.agreement.officerPosition;
            _this.getDateThaiFromServer(_this.agreement.agreementDueDate);
        });
    };
    AgreementComponent.prototype.generateAgreement = function () {
        var _this = this;
        var param = new date_support_url_search_params_1.DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        param.set('agreementId', this.restObjectService.agreementId || null);
        this.http.get('/api/absence-agreement/generateAbsenceAgreement', { search: param })
            .map(function (resp) { return resp.json(); })
            .do(function (e) { return console.log(e); })
            .map(function (resp) { return _this.notNullLocation(resp); })
            .subscribe(function (result) {
            _this.agreement = result;
            console.log('this is agreement ', _this.agreement);
            if (!_this.restObjectService.contract.contractName) {
                _this.storeAgencyContractToRestObjectService(_this.agreement.agency);
                _this.restObjectService.officerName = _this.agreement.officerName;
                _this.restObjectService.officerPosition = _this.agreement.officerPosition;
            }
            console.log('this is agreement due date ', _this.agreement.agreementDueDate);
            _this.getDateThaiFromServer(_this.agreement.agreementDueDate);
        });
    };
    AgreementComponent.prototype.notNullLocation = function (model) {
        if (!model.agency.ctltLocation) {
            model.agency.ctltLocation = new agency_model_1.Location();
        }
        return model;
    };
    AgreementComponent.prototype.getDateThaiFromServer = function (dueDate) {
        var _this = this;
        var params = new date_support_url_search_params_1.DateSupportURLSearchParams();
        params.set('duedate', dueDate || null);
        this.http.get('/api/absence-agreement/agreement-due-date-thai', { search: params }).subscribe(function (resp) {
            _this.dateThai = resp.text();
            console.log(resp.text());
        });
    };
    AgreementComponent.prototype.loadFormType = function () {
        var _this = this;
        var param = new date_support_url_search_params_1.DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        this.http.get('/api/form-type/', { search: param }).map(function (resp) { return resp.json(); }).subscribe(function (result) {
            _this.formTypes = result;
            for (var _i = 0, _a = _this.formTypes; _i < _a.length; _i++) {
                var form = _a[_i];
                if (_this.formSeq == '') {
                    _this.formSeq = _this.formSeq + '' + form.formDesc;
                }
                else {
                    _this.formSeq = _this.formSeq + ', ' + form.formDesc;
                }
            }
            console.log(_this.formTypes);
        });
    };
    AgreementComponent.prototype.storeAgencyContractToRestObjectService = function (agency) {
        this.restObjectService.contract.contractName = agency.agenName;
        this.restObjectService.contract.cardNo = agency.agenCardNo;
        this.restObjectService.contract.address = agency.agenAddr;
        this.restObjectService.contract.tumbon = agency.ctltLocation.tumbonName;
        this.restObjectService.contract.aumbhur = agency.ctltLocation.locAbbrName;
        this.restObjectService.contract.province = agency.ctltLocation.provName;
        this.restObjectService.contract.postCode = agency.agenPostcode;
        this.restObjectService.contract.email = agency.agenEmail;
    };
    AgreementComponent.prototype.searchAgencyByAgencyName = function () {
        var _this = this;
        var param = new date_support_url_search_params_1.DateSupportURLSearchParams();
        param.set('reqAgencyName', this.reqAgencyName || null);
        var observableObj = this.http.get('/api/searchAgency', { search: param }).map(function (resp) { return resp.json(); });
        observableObj.subscribe(function (result) {
            console.log(result);
            _this.resp = result;
        });
    };
    AgreementComponent.prototype.save = function () {
        var _this = this;
        jQuery(this.confirmBtn.nativeElement).prop("disabled", true);
        if (this.restObjectService.agreementId) {
            this.updateAgreement();
        }
        else {
            this.extractAbsenceEvidenceBeforeSave();
            if (!this.isCheckEvidence() && !this.restObjectService.agreementId) {
                this.closeModal();
                this.toastr.warning("กรุณา checklist เอกสาร");
            }
            else {
                this.extractVerifyEvidencePk();
                this.agreement.agreementContract = this.restObjectService.contract;
                this.agreement.absenceEvidenceList = this.storage;
                this.agreement.officerName = this.restObjectService.officerName;
                this.agreement.officerPosition = this.restObjectService.officerPosition || null;
                if (this.savedAgreementIds.length > 0) {
                    this.agreement.ids = this.savedAgreementIds;
                    this.restObjectService.ids = this.savedAgreementIds;
                }
                this.agreement.formSeq = this.formSeq;
                this.http.post('/api/absence-agreement/save', this.agreement).map(function (resp) { return resp.json(); }).subscribe(function (result) {
                    _this.agreementsSaved = result;
                    if (_this.agreementsSaved.length > 1) {
                        _this.savedAgreementIds = [];
                        for (var _i = 0, _a = _this.agreementsSaved; _i < _a.length; _i++) {
                            var itm = _a[_i];
                            _this.savedAgreementIds.push(itm.id);
                        }
                        _this.restObjectService.ids = _this.savedAgreementIds;
                    }
                    else {
                        _this.agreement = _this.agreementsSaved[0];
                        _this.restObjectService.agreementId = _this.agreement.id;
                    }
                    _this.showPrintBtn = true;
                    _this.toastr.info("บันทึกข้อตกลงเรียบร้อยแล้ว");
                });
                this.closeModal();
            }
        }
    };
    AgreementComponent.prototype.updateAgreement = function () {
        var _this = this;
        console.log('this restObject contract ', this.restObjectService.contract);
        this.extractAbsenceEvidenceBeforeSave();
        this.agreement.id = this.restObjectService.agreementId;
        this.agreement.agreementContract = this.restObjectService.contract;
        this.agreement.ids = this.restObjectService.ids;
        this.agreement.absenceEvidenceList = this.storage;
        this.agreement.formSeq = this.formSeq;
        this.agreement.officerName = this.restObjectService.officerName;
        this.agreement.officerPosition = this.restObjectService.officerPosition;
        this.http.post('/api/absence-agreement/save', this.agreement).map(function (resp) { return resp.json(); }).subscribe(function (result) {
            _this.showPrintBtn = true;
            _this.toastr.info("บันทึกข้อตกลงเรียบร้อยแล้ว");
        });
        this.closeModal();
    };
    AgreementComponent.prototype.printAgreementReport = function () {
        var outputFileName = 'agreement.pdf';
        var ids = [];
        if (this.savedAgreementIds.length > 0) {
            ids = this.savedAgreementIds;
        }
        else {
            ids.push(this.agreement.id);
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/agreement/agreement_parent.jasper&agreement_id=' + ids + "&current_user=" + this.currentUser.userName));
    };
    AgreementComponent.prototype.extractVerifyEvidencePk = function () {
        this.agreement.verifyEvidencePks = [];
        for (var idx = 0; idx < this.restObjectService.pk.length; idx++) {
            console.log(this.restObjectService.pk[idx]);
            this.agreement.verifyEvidencePks.push(this.restObjectService.pk[idx]);
        }
    };
    AgreementComponent.prototype.extractAgencyDataToContract = function (agency) {
        var contract = new absence_agreement_model_1.Contract();
        contract.contractName = agency.agenName;
        contract.cardNo = agency.agenCardNo;
        contract.address = agency.agenAddr;
        contract.tumbon = agency.ctltLocation.tumbonName;
        contract.aumbhur = agency.ctltLocation.locAbbrName;
        contract.province = agency.ctltLocation.provName;
        contract.postCode = agency.agenPostcode;
        contract.email = agency.agenEmail;
        this.agreement.agreementContract = contract;
        console.log("Agency data , ", agency);
    };
    AgreementComponent.prototype.extractAbsenceEvidenceBeforeSave = function () {
        this.storage = [];
        for (var _i = 0, _a = rest_object_service_1.RestObjectService.formIds; _i < _a.length; _i++) {
            var id = _a[_i];
            if (this.restObjectService.evidences[id]) {
                this.filterDataNotCategory(this.restObjectService.evidences[id].child);
            }
        }
        this.agreement.trNo = this.restObjectService.pk[0].trNo;
        this.agreement.requestDate = this.restObjectService.pk[0].reqDate;
    };
    AgreementComponent.prototype.filterDataNotCategory = function (evidences) {
        for (var _i = 0, evidences_1 = evidences; _i < evidences_1.length; _i++) {
            var e = evidences_1[_i];
            if (e.isCategory) {
                this.filterDataNotCategory(e.child);
            }
            else {
                this.getData(e.child);
            }
        }
    };
    AgreementComponent.prototype.getData = function (evidences) {
        for (var _i = 0, evidences_2 = evidences; _i < evidences_2.length; _i++) {
            var evd = evidences_2[_i];
            if (evd.child) {
                this.storeData(evd);
                this.getData(evd.child);
            }
            else {
                this.storeData(evd);
            }
        }
    };
    AgreementComponent.prototype.storeData = function (evidence) {
        this.storage.push(evidence);
    };
    //contract
    AgreementComponent.prototype.addNewContract = function () {
        var _this = this;
        this.http.post('/api/contract/save', this.contract).map(function (resp) { return resp.json(); }).subscribe(function (resp) {
            console.log(resp);
            _this.toastr.success('บันทึกรายชื่อผู้ติดต่อสำเร็จ');
            _this.resettingContractFields(resp);
            jQuery(_this.addContractModal.nativeElement).modal('hide');
        });
    };
    AgreementComponent.prototype.clearNewContractField = function () {
        this.contract = new absence_agreement_model_1.Contract();
    };
    AgreementComponent.prototype.showConfirmDialog = function () {
        jQuery(this.confirmBtn.nativeElement).prop("disabled", false);
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    AgreementComponent.prototype.closeModal = function () {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    AgreementComponent.prototype.resettingContractFields = function (contract) {
        console.log('resetting contract field ', this.contract);
        this.restObjectService.contract.contractName = contract.contractName;
        this.restObjectService.contract.address = contract.address;
        this.restObjectService.contract.cardNo = contract.cardNo;
        this.restObjectService.contract.tumbon = contract.tumbon;
        this.restObjectService.contract.aumbhur = contract.aumbhur;
        this.restObjectService.contract.province = contract.province;
        this.restObjectService.contract.postCode = contract.postCode;
        this.restObjectService.contract.email = contract.email;
    };
    AgreementComponent.prototype.selectedContract = function (contract) {
        this.restObjectService.contract.contractName = contract.contractViewPk.contractName;
        this.restObjectService.contract.address = contract.contractViewPk.address;
        this.restObjectService.contract.cardNo = contract.cardNo;
        this.restObjectService.contract.tumbon = contract.tumbon;
        this.restObjectService.contract.aumbhur = contract.aumbhur;
        this.restObjectService.contract.province = contract.province;
        this.restObjectService.contract.postCode = contract.postCode;
        console.log("selected contract : ");
    };
    AgreementComponent.prototype.isCheckEvidence = function () {
        for (var _i = 0, _a = this.storage; _i < _a.length; _i++) {
            var itm = _a[_i];
            if (itm.hasNo != undefined && itm.hasNo != null) {
                return true;
            }
        }
        return false;
    };
    AgreementComponent.prototype.searchByTumbon = function (tumbonName, elem) {
        this.locationService.searchLocation(tumbonName);
        console.log("results , " + this.locationService.result);
        jQuery(this.tumbonSearch.nativeElement).search({ error: { noReturnedValue: 'ไม่พบข้อมูล' } }).search({
            source: this.locationService.result
        });
    };
    AgreementComponent.prototype.fillLocation = function (data) {
        this.locationService.searchFullLocationFromTumbonName(data);
    };
    AgreementComponent.prototype.selectedTumbon = function (tumbon) {
        this.selectedLocation = tumbon;
        this.restObjectService.contract.tumbon = this.selectedLocation.tumbonName;
        this.restObjectService.contract.aumbhur = this.selectedLocation.locAbbrName;
        this.restObjectService.contract.province = this.selectedLocation.provName;
        console.log("selected location , ", this.selectedLocation);
    };
    AgreementComponent.prototype.selectNewTumbon = function (loc) {
        this.contract.tumbon = loc.tumbonName;
        this.contract.aumbhur = loc.locAbbrName;
        this.contract.province = loc.provName;
    };
    AgreementComponent.prototype.showAddContractModal = function () {
        this.contract = new absence_agreement_model_1.Contract();
        jQuery(this.addContractModal.nativeElement).modal('show');
    };
    AgreementComponent.prototype.officerPositionChange = function (positionName) {
        this.restObjectService.officerPosition = positionName;
    };
    AgreementComponent.prototype.back = function () {
        window.history.back();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AgreementComponent.prototype, "reqAgencyName", void 0);
    __decorate([
        core_1.ViewChild("tumbon_search"), 
        __metadata('design:type', core_1.ElementRef)
    ], AgreementComponent.prototype, "tumbonSearch", void 0);
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], AgreementComponent.prototype, "confirmModal", void 0);
    __decorate([
        core_1.ViewChild("add_contract_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], AgreementComponent.prototype, "addContractModal", void 0);
    __decorate([
        core_1.ViewChild("confirmBtn"), 
        __metadata('design:type', core_1.ElementRef)
    ], AgreementComponent.prototype, "confirmBtn", void 0);
    AgreementComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'document-agreement',
            templateUrl: 'agreement.html'
        }), 
        __metadata('design:paramtypes', [intercept_http_1.InterceptHttp, rest_object_service_1.RestObjectService, location_autocomplete_service_1.LocationAutocompleteService, ng2_toastr_1.ToastsManager, authen_service_1.AuthenService])
    ], AgreementComponent);
    return AgreementComponent;
}());
exports.AgreementComponent = AgreementComponent;
//# sourceMappingURL=agreement.component.js.map