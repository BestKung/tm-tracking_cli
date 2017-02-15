"use strict";
/**
 * Created by neng on 23/9/2559.
 */
var agency_model_1 = require("./agency-model");
var AbsenceAgreementModel = (function () {
    function AbsenceAgreementModel() {
        this.agency = new agency_model_1.AgencyModel();
        // officer: OfficerViewModel=new OfficerViewModel();
        this.absenceEvidenceList = [];
        this.createBy = null;
        this.updateBy = null;
        this.agreementContract = new Contract();
        this.verifyEvidencePks = [];
        this.formSeq = '';
        this.ids = [];
        this.officerPosition = '';
    }
    return AbsenceAgreementModel;
}());
exports.AbsenceAgreementModel = AbsenceAgreementModel;
var Contract = (function () {
    function Contract() {
    }
    return Contract;
}());
exports.Contract = Contract;
//# sourceMappingURL=absence-agreement-model.js.map