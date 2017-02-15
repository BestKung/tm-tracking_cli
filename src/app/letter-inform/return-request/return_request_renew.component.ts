import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Http} from "@angular/http";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: 'return-request-renew',
    templateUrl: 'return_request_renew.html'
})

export class ReturnRequestRenewComponent implements OnInit {

    @ViewChild("confirm_modal") confirmModal: ElementRef;

    public letterId: number;
    public returnRequestRenew: ReturnRequestRenew = new ReturnRequestRenew();

    constructor(private activateRoute: ActivatedRoute,
                private http: Http,
                private router: Router,
                private toasts:ToastsManager) {
    }

    ngOnInit(): void {
        this.activateRoute.params.subscribe(param => this.letterId = param['letter-id']);
        this.loadReturnRequestFromLetterId(this.letterId);
    }

    public loadReturnRequestFromLetterId(letterId: number) {
        let params = new DateSupportURLSearchParams();
        params.set('letterId', letterId);
        this.http.get('/api/letter/return-request-renew', {search: params})
            .map(resp => resp.json())
            .subscribe(result => this.returnRequestRenew = result);
    }

    public save() {
        this.http.post('/api/return-request/save-renew', this.returnRequestRenew)
            .subscribe(result => {
                if(result.ok) {
                    this.toasts.info("บันทึกข้อมูลสำเร็จ");
                    this.router.navigate(['/list-acknowledgement/search']);
                }
            });
    }
}


export class ReturnRequestRenew {

    id: number;

    agreementDueDate: Date|string;

    bookNo: number;

    receiver: string;

    referenceTo: string;

    title: string;

    trNo: number;

    attachedItem: string;

    detail: string;

    renewState: string;
}