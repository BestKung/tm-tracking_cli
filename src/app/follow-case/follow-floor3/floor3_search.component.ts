import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {AbsenceAgreement} from "../absence_agreement";
import {Page} from "../../shared/page";
import {IDocument} from "../../shared/document";
import {Http} from "@angular/http";
import {PageEvent} from "../../shared/paging/page_event";
import {RestObjectService} from "../../core/rest_object.service";
import {AbsenceAgreementService} from "../../core/absence-agreement.service";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery:any;

@Component({
    moduleId: module.id,
    selector: 'floor3-search',
    templateUrl: 'floor3_search.html'
})

export class Floor3Search implements OnInit {

    @ViewChild("save_document_modal") saveDocumentModal:ElementRef;

    requestNumber:string;
    startDate:Date | string;
    endDate:Date | string;
    pageData:Page<AbsenceAgreement> = new Page<AbsenceAgreement>();
    currentMissingDocs:IDocument[];
    currentAbsenceAgreement:AbsenceAgreement;
    currentKor20Date:Date;

    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(private _absenceAgreementService:AbsenceAgreementService,
                private _restObjService: RestObjectService) {
    }

    ngOnInit():void {
        // this.searchAction();
    }

    hideSaveDocModal() {
        this.currentAbsenceAgreement.kor20Date = this.currentKor20Date;
        console.log("date = ", this.currentAbsenceAgreement.kor20Date);
        jQuery(this.saveDocumentModal.nativeElement).modal("hide");
    }

    private searchAction(pageEvent:PageEvent = {currentPage: 1, pageSize: 10}):void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this._restObjService.searchAction(pageEvent).subscribe(resp => {
            this.pageData = resp;
        });
    }

    save(absenceAgreement:AbsenceAgreement):void {
        this._absenceAgreementService.saveAbsenceAgreementByThirdFloor(absenceAgreement).subscribe();
    }

    clearSearchFields():void {
        this._restObjService.trNo = undefined;
        this._restObjService.reqDateFrom = '';
        this._restObjService.reqDateTo = '';
    }

    applyLabelColor(color:string):string[] {
        let labelClass:string[] = ['ui', 'label'];
        labelClass.push(color);
        return labelClass;
    }
}
