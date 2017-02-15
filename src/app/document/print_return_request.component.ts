import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ReturnedRequest} from "../model/return-request";
import {Page} from "../shared/page";
import {PageEvent} from "../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {DateSupportURLSearchParams} from "../shared/date-support-url-search-params";
import {AuthenService} from "../authen/shared/authen.service";
import {User} from "../authen/shared/User";
import {InterceptHttp} from "../shared/intercept_http";
/**
 * Created by neng on 21/10/2559.
 */
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'print-return-request',
    templateUrl: './print_return_request.html'
})
export class PrintReturnRequestComponent implements OnInit {

    @ViewChild("chkAll") chkAll: ElementRef;

    @ViewChild("book_admin_status_selection") statusSelection: ElementRef;

    @ViewChild("confirm_modal") confirmModal: ElementRef;

    pageData: Page<ReturnedRequest> = new Page<ReturnedRequest>();
    search: SearchReturnRequest = new SearchReturnRequest();
    private bookDate: Date;
    private saveItems: ReturnedRequest[];
    private chkListAll: boolean = false;
    private currentPage: number = 0;
    private pageSize: number = 10;

    private currentUser: User = new User();
    private officerName: string;
    private officerPosition: string;

    constructor(private _http: InterceptHttp,
                public toastr: ToastsManager,
                private authenService: AuthenService) {

    }

    ngOnInit(): void {
        this.authenService.getUser().subscribe(authen => {
            this.currentUser = authen;
        });
        console.log("current user ", this.currentUser);
        this.loadOfficerFromServer();

        this.chkListAll = false;
        this.searchAction();
    }

    private loadOfficerFromServer() {
        this._http.get('/api/officer/').map(reps => reps.json()).subscribe(reps => {
            this.officerName = reps.personName;
            this.officerPosition = reps.positionName;
            console.log("current_Officer .   ", this.officerName + " " + this.officerPosition);
        });
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}) {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("returnDateFrom", this.search.returnDateFrom || null);
        params.set("returnDateTo", this.search.returnDateTo || null);
        params.set("status", this.search.status || null);
        params.set("bookStatus", this.search.bookStatus || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this._http.get('/api/return-request/search', {search: params}).map(resp => resp.json()).subscribe(resp => {
            this.pageData = resp;
            console.log(this.pageData);
        })
    }

    private checkAll(event: any) {
        for (let itm of this.pageData.content) {
            itm.chk = event.target.checked;
        }
        console.log('check all');
    }

    private isCheckboxAll(): boolean {

        let countItem: number = 0;
        this.pageData.content.forEach(itm => {
            if(itm.chk) {
                countItem += 1;
            }
        });
        return (countItem == this.pageData.content.length) && (this.pageData.content.length > 0);
    }

    private saveCancel() {
        this._extractData('cancel');
        if (this.saveItems.length > 0) {
            this.closeConfirmModal();
            this._http.post('/api/return-request/save-cancel', this.saveItems).subscribe(resp => {
                this.toastr.info('ยกเลิกหนังสือสำเร็จ');
                this.searchAction();
            });
        }
    }

    private closeConfirmModal() {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    }

    private showConfirmModal() {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private printAndReleaseBookM() {
        this._extractData('print');
        if (!this.bookDate) {
            this.toastr.warning("กรุณากรอก วันที่ออกหนังสือ");
            return;
        }
        if (this.saveItems.length > 0) {
            this._setBookDate();
            console.log("this is save itm ", this.saveItems);
            this._http.post('/api/print-document/return-request', this.saveItems).subscribe(resp => {
                if (resp.status == 200) {
                    this._extractData('print');
                    console.log('page data ', this.pageData.content);
                    let outputFileName = 'return.pdf';
                    let ids: number[] = [];
                    for (let itm of this.pageData.content) {
                        if (itm.chk) {
                            ids.push(itm.id);
                        }
                    }
                    this.closeConfirmModal();
                    jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + ids + "&officerName=" + this.officerName + "&officerPosition=" + this.officerPosition));
                    this.searchAction();
                }
            });
        }
    }

    private printAgain() {
        console.log('page data ', this.pageData.content);
        let outputFileName = 'return.pdf';
        let ids: number[] = [];
        for (let itm of this.pageData.content) {
            if (itm.chk == true) {
                ids.push(itm.id);
            }
        }
        if (ids.length == 0) {
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/return.jasper&id=' + ids + "&officerName=" + this.officerName + "&officerPosition=" + this.officerPosition));
        this.searchAction();
    }

    private bookAdminStatusChange(event: any) {
        this.search.status = event.target.value;
        console.log(this.search.status);
    }

    private bookStatusChange(event: any) {
        this.search.bookStatus = event.target.value;
        if(event.target.value == 2) {
            this.search.status = 2;
        }
        console.log("this is book status > ", this.search.bookStatus);
    }

    private _setBookDate() {
        for (let itm of this.saveItems) {
            itm.bookDate = this.bookDate;
        }
        console.log("save item , ", this.saveItems);
    }

    private _extractData(btnAction: string) {
        this.saveItems = new Array<ReturnedRequest>();
        for (let itm of this.pageData.content) {
            if (itm.chk) {
                if ("cancel" == btnAction) {
                    if (!itm.canceledFlag) {
                        this.closeConfirmModal();
                        this.toastr.warning('กรุณาเลือกหนังสือที่ต้องการยกเลิก');
                        return;
                    }
                }

                this.saveItems.push(itm);
            }
        }
        if (this.saveItems.length < 1) {
            this.closeConfirmModal();
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
    }

    private onCheck(itm: ReturnedRequest, chk: any) {
        itm.chk = chk;
        let count: number = 0;
        for (let val of this.pageData.content) {
            if (val.chk) {
                count += 1;
            }
        }
        console.log("count " + count + " this.returnRequests.content.length " + this.pageData.content.length);
        if (count == this.pageData.content.length) {
            jQuery(this.chkAll.nativeElement).checked = true;
        } else {
            jQuery(this.chkAll.nativeElement).checked = false;
        }
    }

    private clear() {
        this.search = new SearchReturnRequest();
        jQuery(this.statusSelection.nativeElement).val('');
        console.log(jQuery(this.statusSelection.nativeElement).val());
    }
}

export class SearchReturnRequest {

    trNo: number;
    returnDateFrom: Date;
    returnDateTo: Date;
    bookAdmin: string;
    status: number = 1;
    bookStatus: number = 1;
}