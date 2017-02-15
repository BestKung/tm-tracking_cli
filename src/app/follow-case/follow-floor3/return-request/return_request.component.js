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
var absence_agreement_service_1 = require("../../../core/absence-agreement.service");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var return_request_1 = require("../../../model/return-request");
var authen_service_1 = require("../../../authen/shared/authen.service");
var User_1 = require("../../../authen/shared/User");
var ReturnRequestComponent = (function () {
    function ReturnRequestComponent(_absenceAgreementService, _route, _http, authenService) {
        this._absenceAgreementService = _absenceAgreementService;
        this._route = _route;
        this._http = _http;
        this.authenService = authenService;
        this.currentUser = new User_1.User();
        this.showPrintBtn = false;
    }
    ReturnRequestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authenService.getUser().subscribe(function (authen) {
            _this.currentUser = authen;
        });
        console.log("current user ", this.currentUser);
        this.loadOfficerFromServer();
        var param = this._route.snapshot.params['id'];
        var urlSearchParams = new http_1.URLSearchParams();
        urlSearchParams.set('agreementId', param);
        this._absenceAgreementService.searchReturnRequest(urlSearchParams).subscribe(function (r) {
            _this.absenceAgreement = r;
            _this.returnedRequest = _this.absenceAgreement.returnRequest;
            _this.initializeData();
        });
    };
    ReturnRequestComponent.prototype.loadOfficerFromServer = function () {
        var _this = this;
        this._http.get('/api/officer/').map(function (reps) { return reps.json(); }).subscribe(function (reps) {
            _this.officerName = reps.personName;
            _this.officerPosition = reps.positionName;
            console.log("current_Officer .   ", _this.officerName + " " + _this.officerPosition);
        });
    };
    ReturnRequestComponent.prototype.onSave = function () {
        var _this = this;
        this.closeConfirmDialog();
        this.returnedRequest.bookAdmin = this.bookAdmin;
        this.returnedRequest.returnedDate = this.returnedDate;
        this.returnedRequest.title = this.title;
        this.returnedRequest.receiver = this.receiver;
        this.returnedRequest.referenceTo = this.referenceTo;
        this.returnedRequest.attachedItem = this.attachedItem;
        this.returnedRequest.detail = this.detail;
        this.returnedRequest.agreementId = this.absenceAgreement.id;
        this._absenceAgreementService.saveReturnedRequest(this.returnedRequest).subscribe(function (resp) {
            _this.returnedRequest = resp;
        });
        this.showPrintBtn = true;
    };
    ReturnRequestComponent.prototype.initializeData = function () {
        console.log("agreement > ,", this.absenceAgreement);
        console.log("returnRequest > ,", this.returnedRequest);
        if (!this.returnedRequest) {
            this.returnedRequest = new return_request_1.ReturnedRequest();
        }
        this.bookAdmin = this.returnedRequest.bookAdmin;
        this.returnedDate = this.returnedRequest.returnedDate;
        this.title = this.returnedRequest.title;
        this.receiver = this.returnedRequest.receiver;
        this.attachedItem = this.returnedRequest.attachedItem;
        this.detail = (this.returnedRequest.detail) ? this.returnedRequest.detail : 'บัดนี้ ท่านมิได้มายื่นเอกสารที่แก้ไข หรือยื่นเอกสารเพิ่มเติมภายในเวลาที่กำหนดไว้ในบันทึก ข้อตกลงการยื่นคำขอได้สิ้นสุดแล้ว โดยท่านมิได้ดำเนินการแก้ไข หรือยื่นเอกสารเพิ่มเติมซึ่งตาม พระราชบัญญัติการอำนวยความสะดวก ในการพิจารณาอนุญาตของทางราชการ พ.ศ. 2558 มาตรา 9 ในกรณีที่ ผู้ยื่นคำขอไม่แก้ไขเพิ่มเติมคำขอหรือไม่ส่งเอกสารหรือหลักฐานเพิ่มเติม ตามที่เจ้าหน้าที่แจ้งให้ทราบ หรือตามที่ปรากฎในบันทึกที่จัดทำตามมาตรา ๘ วรรคหนึ่ง ให้พนักงานเจ้าหน้าที่คืนคำขอให้แก่ผู้ยื่นคำขอ พร้อมทั้งแจ้งเป็นหนังสือถึงเหตุแห่งการคืนคำขอให้ทราบด้วย พนักงานเจ้าหน้าที่จึงขอจัดส่งคำขอพร้อม เอกสารประกอบคืนมาพร้อมหนังสือฉบับนี้';
        this.requestNumber = this.absenceAgreement.requestNumber;
        this.receiver = this.absenceAgreement.contractName;
        this.referenceTo = this.absenceAgreement.referenceTo;
        if (this.returnedRequest != null && this.returnedRequest.id != null) {
            this.showPrintBtn = true;
        }
    };
    ReturnRequestComponent.prototype.clearReturnRequestFields = function () {
        console.log('in clear');
        this.returnedDate = null;
        this.title = '';
        this.receiver = '';
        this.referenceTo = '';
        this.attachedItem = '';
        this.detail = '';
    };
    ReturnRequestComponent.prototype.printReturnRequestReport = function () {
        var outputFileName = 'return_' + this.absenceAgreement.requestNumber + ".pdf";
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + this.returnedRequest.id + "&officerName=" + this.officerName + "&officerPosition=" + this.officerPosition));
    };
    ReturnRequestComponent.prototype.showConfirmDialog = function () {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    };
    ReturnRequestComponent.prototype.closeConfirmDialog = function () {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    };
    __decorate([
        core_1.ViewChild("confirm_modal"), 
        __metadata('design:type', core_1.ElementRef)
    ], ReturnRequestComponent.prototype, "confirmModal", void 0);
    ReturnRequestComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'return-request',
            templateUrl: 'return_request.html'
        }), 
        __metadata('design:paramtypes', [absence_agreement_service_1.AbsenceAgreementService, router_1.ActivatedRoute, http_1.Http, authen_service_1.AuthenService])
    ], ReturnRequestComponent);
    return ReturnRequestComponent;
}());
exports.ReturnRequestComponent = ReturnRequestComponent;
//# sourceMappingURL=return_request.component.js.map