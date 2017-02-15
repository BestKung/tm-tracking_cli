import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { AbsenceAgreementService } from "../../../core/absence-agreement.service";
import { ActivatedRoute } from "@angular/router";
import {URLSearchParams, Http} from "@angular/http";
import { ReturnedRequest } from "../../../model/return-request";
import { AbsenceAgreement } from "../../absence_agreement";
import {AuthenService} from "../../../authen/shared/authen.service";
import {User} from "../../../authen/shared/User";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'return-request',
    templateUrl: 'return_request.html'
})

export class ReturnRequestComponent implements OnInit {

    bookAdmin: string;
    returnedDate: Date;
    title: string;
    receiver: string;
    referenceTo: string;
    attachedItem: string;
    detail: string;
    requestNumber: number;
    returnedRequest: ReturnedRequest;
    absenceAgreement: AbsenceAgreement;

    private currentUser: User = new User();
    private officerName: string;
    private officerPosition: string;
    private showPrintBtn: boolean = false;
    @ViewChild("confirm_modal") confirmModal: ElementRef;

    constructor(private _absenceAgreementService: AbsenceAgreementService,
                private _route: ActivatedRoute,
                private _http: Http,
                private authenService: AuthenService
        ) {
    }

    ngOnInit(): void {
        this.authenService.getUser().subscribe(authen => {
            this.currentUser = authen;
        });
        console.log("current user ", this.currentUser);
        this.loadOfficerFromServer();

        let param = this._route.snapshot.params['id'];
        let urlSearchParams: URLSearchParams = new URLSearchParams();
        urlSearchParams.set('agreementId', param);
        this._absenceAgreementService.searchReturnRequest(urlSearchParams).subscribe(
            (r: AbsenceAgreement) => {
                this.absenceAgreement = r;
                this.returnedRequest = this.absenceAgreement.returnRequest;
                this.initializeData();
            }
        );
    }

    private loadOfficerFromServer() {
        this._http.get('/api/officer/').map(reps => reps.json()).subscribe(reps =>{
            this.officerName = reps.personName;
            this.officerPosition = reps.positionName;
            console.log("current_Officer .   ", this.officerName + " " + this.officerPosition);
        });
    }

    private onSave(): void {
        this.closeConfirmDialog();
        this.returnedRequest.bookAdmin = this.bookAdmin;
        this.returnedRequest.returnedDate = this.returnedDate;
        this.returnedRequest.title = this.title;
        this.returnedRequest.receiver = this.receiver;
        this.returnedRequest.referenceTo = this.referenceTo;
        this.returnedRequest.attachedItem = this.attachedItem;
        this.returnedRequest.detail = this.detail;
        this.returnedRequest.agreementId = this.absenceAgreement.id;
        this._absenceAgreementService.saveReturnedRequest(this.returnedRequest).subscribe(resp => {
            this.returnedRequest = resp;
        });
        this.showPrintBtn = true;
    }

    private initializeData(): void {
        console.log("agreement > ," , this.absenceAgreement);
        console.log("returnRequest > ,", this.returnedRequest);
        if (!this.returnedRequest) {
            this.returnedRequest = new ReturnedRequest();
        }
        this.bookAdmin = this.returnedRequest.bookAdmin;
        this.returnedDate = this.returnedRequest.returnedDate;
        this.title = this.returnedRequest.title;
        this.receiver = this.returnedRequest.receiver;
        this.attachedItem = this.returnedRequest.attachedItem;
        this.detail = (this.returnedRequest.detail)? this.returnedRequest.detail:'บัดนี้ ท่านมิได้มายื่นเอกสารที่แก้ไข หรือยื่นเอกสารเพิ่มเติมภายในเวลาที่กำหนดไว้ในบันทึก ข้อตกลงการยื่นคำขอได้สิ้นสุดแล้ว โดยท่านมิได้ดำเนินการแก้ไข หรือยื่นเอกสารเพิ่มเติมซึ่งตาม พระราชบัญญัติการอำนวยความสะดวก ในการพิจารณาอนุญาตของทางราชการ พ.ศ. 2558 มาตรา 9 ในกรณีที่ ผู้ยื่นคำขอไม่แก้ไขเพิ่มเติมคำขอหรือไม่ส่งเอกสารหรือหลักฐานเพิ่มเติม ตามที่เจ้าหน้าที่แจ้งให้ทราบ หรือตามที่ปรากฎในบันทึกที่จัดทำตามมาตรา ๘ วรรคหนึ่ง ให้พนักงานเจ้าหน้าที่คืนคำขอให้แก่ผู้ยื่นคำขอ พร้อมทั้งแจ้งเป็นหนังสือถึงเหตุแห่งการคืนคำขอให้ทราบด้วย พนักงานเจ้าหน้าที่จึงขอจัดส่งคำขอพร้อม เอกสารประกอบคืนมาพร้อมหนังสือฉบับนี้';
        this.requestNumber = this.absenceAgreement.requestNumber;
        this.receiver = this.absenceAgreement.contractName;
        this.referenceTo = this.absenceAgreement.referenceTo;
        if(this.returnedRequest != null && this.returnedRequest.id != null) {
            this.showPrintBtn = true;
        }
    }

    private clearReturnRequestFields() {
        console.log('in clear');
        this.returnedDate = null;
        this.title = '';
        this.receiver = '';
        this.referenceTo = '';
        this.attachedItem = '';
        this.detail = '';
    }

    private printReturnRequestReport() {
        let outputFileName = 'return_' + this.absenceAgreement.requestNumber + ".pdf";
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + this.returnedRequest.id + "&officerName=" + this.officerName + "&officerPosition=" + this.officerPosition));
    }

    private showConfirmDialog() {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private closeConfirmDialog() {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    }
}
