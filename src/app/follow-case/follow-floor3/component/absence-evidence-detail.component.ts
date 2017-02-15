/**
 * Created by neng on 14/10/2559.
 */
import {Component, Input, ElementRef, ViewChild, OnInit} from "@angular/core";
import {Http, URLSearchParams, Jsonp, Headers, RequestOptions} from "@angular/http";
import {EvidenceModel} from "../../../model/evidence-model";
import {Router} from "@angular/router";
import {AuthenService} from "../../../authen/shared/authen.service";
import {User} from "../../../authen/shared/User";
import {DateSupportURLSearchParams} from "../../../shared/date-support-url-search-params";
import {RestObjectService} from "../../../core/rest_object.service";
import {Contract} from "../../../model/absence-agreement-model";
import {VerifyEvidencePk} from "../../../model/verify-evidence-model";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'absence-evidence-detail',
    templateUrl: 'absence-evidence-detail.html'
})

export class AbsenceEvidenceDetailComponent implements OnInit {

    @Input()
    private agreementId;

    @Input()
    private trNo: number;

    @Input()
    private reqDate: Date;

    @ViewChild("absence_evidence_detail_modal") detailModal :ElementRef;

    private evidences: {[id: string]: EvidenceModel[]}={};
    private currentUser: User = new User();

    constructor(private http: Http,
                private router: Router,
                private authenService: AuthenService,
                private restObject: RestObjectService) {

    }

    ngOnInit(): void {
        this.authenService.getUser().subscribe(authen => {
            this.currentUser = authen;
        });
    }

    showDetailModal() {
        this.http.get(`/api/absence-evidence/${this.agreementId}`).map(result => result.json()).subscribe(resp => {
            this.groupEvidence(resp as EvidenceModel[]);
        });
        jQuery(this.detailModal.nativeElement).modal({observeChanges: true}).modal('toggle');
    }

    exportReport(){
        let outputFileName = 'agreement_' + this.trNo + ".pdf";
        jQuery(this.detailModal.nativeElement).modal({observeChanges: true}).modal('toggle');
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/agreement/agreement_parent.jasper&agreement_id=' + this.agreementId + "&current_user=" + this.currentUser.userName));
    }

    private groupEvidence(evidences: EvidenceModel[]) {
        this.evidences = {};
        for(let evd of evidences) {
            if(this.evidences.hasOwnProperty(evd.formType.formDesc)) {
                this.evidences[evd.formType.formDesc].push(evd);
            } else {
                this.evidences[evd.formType.formDesc] = [];
                this.evidences[evd.formType.formDesc].push(evd);
            }
        }
        console.log(this.evidences);
    }

    transformMapToArrayBeforeInteration() : Array<string> {
        return Object.keys(this.evidences);
    }


    private editVerifyEvidenceSelected() {
        let pk = new VerifyEvidencePk();
        pk.reqDate = this.reqDate;
        pk.trNo = this.trNo;
        this.restObject.agreementId = undefined;
        this.restObject.agreementId = this.agreementId;
        this.restObject.pk = [];
        this.restObject.evidences = {};
        this.restObject.contract = new Contract();
        this.restObject.pk.push(pk);
        jQuery(this.detailModal.nativeElement).modal({observeChanges: true}).modal('toggle');
        let redirectToUrl = ['verify-evidences/agreement/'];
        this.router.navigate(redirectToUrl);
    }
}