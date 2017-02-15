/**
 * Created by pramoth on 8/29/2016 AD.
 */
import {Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../shared/page";
import {AgencyModel, Location} from "../../model/agency-model";
import {AbsenceAgreementModel, Contract} from "../../model/absence-agreement-model";
import {RestObjectService} from "../../core/rest_object.service";
import {FormTypeModel} from "../../model/form-type-model";
import {EvidenceModel} from "../../model/evidence-model";
import {Router} from "@angular/router";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import * as moment from "moment";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {LocationAutocompleteService} from "../../shared/service/location-autocomplete.service";
import {Observable, Operator} from 'rxjs';
import {CtltLocation} from "../../model/ctltlocation-model";
import {HttpStatusBus} from "../../shared/http_status_bus";
import {AuthenService} from "../../authen/shared/authen.service";
import {User} from "../../authen/shared/User";
import {ContractView} from "../../model/contract-view-model";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'document-agreement',
    templateUrl: 'agreement.html'
})
export class AgreementComponent implements OnInit,AfterViewInit {

    @Input()
    private reqAgencyName: string;

    @ViewChild("tumbon_search") tumbonSearch: ElementRef;

    @ViewChild("confirm_modal") confirmModal: ElementRef;

    @ViewChild("add_contract_modal") addContractModal: ElementRef;

    @ViewChild("confirmBtn") confirmBtn: ElementRef;

    private resp: Page<AgencyModel> = new Page<AgencyModel>();
    private agreement: AbsenceAgreementModel = new AbsenceAgreementModel();
    private agreementsSaved: AbsenceAgreementModel[] = [];
    private formTypes: FormTypeModel[];
    private trNo: number;
    private storage: EvidenceModel[] = []; // for hold absence-evidence list
    private formSeq: string = '';
    private contract: Contract = new Contract();
    private savedAgreementIds: number[] = [];
    private dateThai: string;
    private selectedLocation: CtltLocation;
    private currentUser: User = new User();
    private showPrintBtn: boolean = false;

    constructor(private http: InterceptHttp,
                private restObjectService: RestObjectService,
                private locationService: LocationAutocompleteService,
                public toastr: ToastsManager,
                private authenService:AuthenService) {
    }

    ngOnInit(): void {
        console.log("agreementId restObj " + this.restObjectService.agreementId);
        this.authenService.getUser().subscribe(authen => {
            this.currentUser = authen;
        });
        if (!this.restObjectService.pk[0]) {
            window.history.back();
        } else {
            if(this.restObjectService.agreementId || this.restObjectService.ids.length > 0) {
                console.log('{1}');
                this.editAgreement();
                this.showPrintBtn = true;
            } else {
                console.log('{2}');
                this.generateAgreement();
            }
            this.loadFormType();
        }
    }

    ngAfterViewInit(): void {
    }

    private editAgreement() {
        this.agreement = new AbsenceAgreementModel();
        let param = new DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        param.set('agreementId', this.restObjectService.agreementId || null);
        this.http.get('/api/absence-agreement/generateAbsenceAgreement', {search: param})
            .map(resp => resp.json())
            .do(e=>console.log(e))
            .subscribe(result => {
                this.agreement = result  as AbsenceAgreementModel;
                console.log('this is agreement ', this.agreement);
                this.resettingContractFields(this.agreement.agreementContract);
                this.agreement.officerName = this.agreement.officerName;
                this.agreement.officerPosition = this.agreement.officerPosition;
                this.getDateThaiFromServer(this.agreement.agreementDueDate);
            });
    }

    private generateAgreement() {
        let param = new DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        param.set('agreementId', this.restObjectService.agreementId || null);
        this.http.get('/api/absence-agreement/generateAbsenceAgreement', {search: param})
            .map(resp => resp.json())
            .do(e=>console.log(e))
            .map(resp => this.notNullLocation(resp as AbsenceAgreementModel))
            .subscribe(result => {
                this.agreement = result as AbsenceAgreementModel;
                console.log('this is agreement ', this.agreement);
                if (!this.restObjectService.contract.contractName) {
                    this.storeAgencyContractToRestObjectService(this.agreement.agency);
                    this.restObjectService.officerName = this.agreement.officerName;
                    this.restObjectService.officerPosition = this.agreement.officerPosition;
                }
                console.log('this is agreement due date ', this.agreement.agreementDueDate);
                this.getDateThaiFromServer(this.agreement.agreementDueDate);
            });
    }

    private notNullLocation(model: AbsenceAgreementModel): AbsenceAgreementModel {
        if (!model.agency.ctltLocation) {
            model.agency.ctltLocation = new Location();
        }
        return model;
    }

    private getDateThaiFromServer(dueDate: Date | string) {
        let params = new DateSupportURLSearchParams();
        params.set('duedate', dueDate || null);
        this.http.get('/api/absence-agreement/agreement-due-date-thai', {search: params}).subscribe(resp => {
            this.dateThai = resp.text();
            console.log(resp.text());
        });
    }

    private loadFormType() {
        let param = new DateSupportURLSearchParams();
        param.set('trNo', this.restObjectService.pk[0].trNo || null);
        param.set('reqDate', this.restObjectService.pk[0].reqDate || null);
        this.http.get('/api/form-type/', {search: param}).map(resp => resp.json()).subscribe(result => {
            this.formTypes = result;
            for (let form of this.formTypes) {
                if (this.formSeq == '') {
                    this.formSeq = this.formSeq + '' + form.formDesc;
                } else {
                    this.formSeq = this.formSeq + ', ' + form.formDesc;
                }
            }
            console.log(this.formTypes);
        });
    }

    private storeAgencyContractToRestObjectService(agency: AgencyModel) {
        this.restObjectService.contract.contractName = agency.agenName;
        this.restObjectService.contract.cardNo = agency.agenCardNo;
        this.restObjectService.contract.address = agency.agenAddr;
        this.restObjectService.contract.tumbon = agency.ctltLocation.tumbonName;
        this.restObjectService.contract.aumbhur = agency.ctltLocation.locAbbrName;
        this.restObjectService.contract.province = agency.ctltLocation.provName;
        this.restObjectService.contract.postCode = agency.agenPostcode;
        this.restObjectService.contract.email = agency.agenEmail;
    }

    private searchAgencyByAgencyName() {
        let param = new DateSupportURLSearchParams();
        param.set('reqAgencyName', this.reqAgencyName || null);
        let observableObj = this.http.get('/api/searchAgency', {search: param}).map(resp => resp.json());
        observableObj.subscribe(result => {
            console.log(result);
            this.resp = result;
        });
    }

    private save() {
        jQuery(this.confirmBtn.nativeElement).prop("disabled", true);
        if(this.restObjectService.agreementId) {
            this.updateAgreement();
        } else {
            this.extractAbsenceEvidenceBeforeSave();
            if (!this.isCheckEvidence() && !this.restObjectService.agreementId) {
                this.closeModal();
                this.toastr.warning("กรุณา checklist เอกสาร");
            } else {
                this.extractVerifyEvidencePk();
                this.agreement.agreementContract = this.restObjectService.contract;
                this.agreement.absenceEvidenceList = this.storage;
                this.agreement.officerName = this.restObjectService.officerName;
                this.agreement.officerPosition = this.restObjectService.officerPosition || null;
                if(this.savedAgreementIds.length > 0) {
                    this.agreement.ids = this.savedAgreementIds;
                    this.restObjectService.ids = this.savedAgreementIds;
                }
                this.agreement.formSeq = this.formSeq;
                this.http.post('/api/absence-agreement/save', this.agreement).map(resp => resp.json()).subscribe(result => {
                    this.agreementsSaved = result;
                    if(this.agreementsSaved.length > 1) {
                        this.savedAgreementIds = [];
                        for(let itm of this.agreementsSaved) {
                            this.savedAgreementIds.push(itm.id);
                        }
                        this.restObjectService.ids = this.savedAgreementIds;
                    } else {
                        this.agreement = this.agreementsSaved[0];
                        this.restObjectService.agreementId = this.agreement.id;
                    }
                    this.showPrintBtn = true;
                    this.toastr.info("บันทึกข้อตกลงเรียบร้อยแล้ว");
                });
                this.closeModal();
            }
        }
    }

    private updateAgreement() {

        console.log('this restObject contract ', this.restObjectService.contract);
        this.extractAbsenceEvidenceBeforeSave();
        this.agreement.id = this.restObjectService.agreementId;
        this.agreement.agreementContract = this.restObjectService.contract;
        this.agreement.ids = this.restObjectService.ids;
        this.agreement.absenceEvidenceList = this.storage;
        this.agreement.formSeq = this.formSeq;
        this.agreement.officerName = this.restObjectService.officerName;
        this.agreement.officerPosition = this.restObjectService.officerPosition;
        this.http.post('/api/absence-agreement/save', this.agreement).map(resp => resp.json()).subscribe(result => {
            this.showPrintBtn = true;
            this.toastr.info("บันทึกข้อตกลงเรียบร้อยแล้ว");
        });
        this.closeModal();
    }

    private printAgreementReport() {
        let outputFileName = 'agreement.pdf';
        let ids: number[] = [];
        if(this.savedAgreementIds.length > 0) {
            ids = this.savedAgreementIds;
        }
        else {
            ids.push(this.agreement.id);
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/agreement/agreement_parent.jasper&agreement_id=' + ids + "&current_user=" + this.currentUser.userName));

    }

    private extractVerifyEvidencePk() {
        this.agreement.verifyEvidencePks = [];
        for (let idx = 0; idx < this.restObjectService.pk.length; idx++) {
            console.log(this.restObjectService.pk[idx]);
            this.agreement.verifyEvidencePks.push(this.restObjectService.pk[idx]);
        }
    }

    private extractAgencyDataToContract(agency: AgencyModel) {
        let contract = new Contract();
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
    }

    private extractAbsenceEvidenceBeforeSave() {
        this.storage = [];
        for (let id of RestObjectService.formIds) {
            if (this.restObjectService.evidences[id]) {
                this.filterDataNotCategory(this.restObjectService.evidences[id].child);
            }
        }
        this.agreement.trNo = this.restObjectService.pk[0].trNo;
        this.agreement.requestDate = this.restObjectService.pk[0].reqDate;
    }

    private filterDataNotCategory(evidences: EvidenceModel[]) {
        for (let e of evidences) {
            if (e.isCategory) {
                this.filterDataNotCategory(e.child);
            } else {
                this.getData(e.child);
            }
        }
    }

    private getData(evidences: EvidenceModel[]) {
        for (let evd of evidences) {
            if (evd.child) {
                this.storeData(evd);
                this.getData(evd.child);
            } else {
                this.storeData(evd);
            }
        }
    }

    private storeData(evidence: EvidenceModel) {
        this.storage.push(evidence);
    }

    //contract
    private addNewContract() {
        this.http.post('/api/contract/save', this.contract).map(resp => resp.json()).subscribe(resp => {
            console.log(resp);
            this.toastr.success('บันทึกรายชื่อผู้ติดต่อสำเร็จ');
            this.resettingContractFields(resp);
            jQuery(this.addContractModal.nativeElement).modal('hide');
        });
    }

    private clearNewContractField() {
        this.contract = new Contract();
    }

    private showConfirmDialog() {
        jQuery(this.confirmBtn.nativeElement).prop("disabled", false);
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private closeModal() {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private resettingContractFields(contract: Contract) {
        console.log('resetting contract field ', this.contract);
        this.restObjectService.contract.contractName = contract.contractName;
        this.restObjectService.contract.address = contract.address;
        this.restObjectService.contract.cardNo = contract.cardNo;
        this.restObjectService.contract.tumbon = contract.tumbon;
        this.restObjectService.contract.aumbhur = contract.aumbhur;
        this.restObjectService.contract.province = contract.province;
        this.restObjectService.contract.postCode  = contract.postCode;
        this.restObjectService.contract.email  = contract.email;
    }

    selectedContract(contract: any): void {
        this.restObjectService.contract.contractName = contract.contractViewPk.contractName;
        this.restObjectService.contract.address = contract.contractViewPk.address;
        this.restObjectService.contract.cardNo = contract.cardNo;
        this.restObjectService.contract.tumbon = contract.tumbon;
        this.restObjectService.contract.aumbhur = contract.aumbhur;
        this.restObjectService.contract.province = contract.province;
        this.restObjectService.contract.postCode = contract.postCode;
        console.log("selected contract : ", );
    }

    private isCheckEvidence(): boolean {
        for (let itm of this.storage) {
            if (itm.hasNo != undefined && itm.hasNo != null) {
                return true;
            }
        }

        return false;
    }

    private searchByTumbon(tumbonName: string, elem: any) {
        this.locationService.searchLocation(tumbonName);
        console.log("results , " + this.locationService.result);
        jQuery(this.tumbonSearch.nativeElement).search({error: {noReturnedValue: 'ไม่พบข้อมูล'}}).search({
            source: this.locationService.result
        });
    }

    private fillLocation(data: string) {
        this.locationService.searchFullLocationFromTumbonName(data);
    }

    selectedTumbon(tumbon: any): void {
        this.selectedLocation = tumbon;
        this.restObjectService.contract.tumbon = this.selectedLocation.tumbonName;
        this.restObjectService.contract.aumbhur = this.selectedLocation.locAbbrName;
        this.restObjectService.contract.province = this.selectedLocation.provName;
        console.log("selected location , ", this.selectedLocation);
    }

    private selectNewTumbon(loc: any): void {
        this.contract.tumbon = loc.tumbonName;
        this.contract.aumbhur = loc.locAbbrName;
        this.contract.province = loc.provName;
    }

    private showAddContractModal() {
        this.contract = new Contract();
        jQuery(this.addContractModal.nativeElement).modal('show');
    }

    private officerPositionChange(positionName: string) {
        this.restObjectService.officerPosition = positionName;
    }

    back() {
        window.history.back();
    }
}
