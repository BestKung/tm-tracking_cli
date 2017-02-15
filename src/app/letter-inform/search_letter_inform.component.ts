import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {ReturnedRequestWithLetter} from "../model/return-request";
import {Page} from "../shared/page";
import {PageEvent} from "../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {DateSupportURLSearchParams} from "../shared/date-support-url-search-params";
import {InterceptHttp} from "../shared/intercept_http";
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'search-letter-inform',
    templateUrl: 'search_letter_inform.html'
})
export class SearchLetterInformComponent implements OnInit {

    private pageData: Page<ReturnedRequestWithLetter> = new Page<ReturnedRequestWithLetter>();
    private saveLetters: ReturnedRequestWithLetter[] = [];
    private search: SearchLetterInform = new SearchLetterInform();
    private bookDate: Date = new Date();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private chkListAll: boolean = false;
    @ViewChild("confirm_modal") confirmModal: ElementRef;

    constructor(private http: InterceptHttp, public toastr: ToastsManager) {

    }

    ngOnInit(): void {
        this.searchAction();
    }

    private saveAction() {
        if (!this._getOnlyCheckItemToSave()) {
            return;
        } else {
            console.log("letters select before save  ", this.saveLetters);
            this.http.post('/api/letter/save-inform', this.saveLetters).subscribe(resp => {
                console.log(resp);
                this.closeConfirmDialog();
                if (resp.status = 200) {
                    this.toastr.success('บันทึกข้อมูลสำเร็จ');
                    this.searchAction();
                }
            });
        }
    }

    private checkAll(event: any): void {
        for (let itm of this.pageData.content) {
            itm.chk = event.target.checked;
        }
    }

    private check(value: any): void {
        let count: number = 0;
        if (!value.target.checked) {
            this.chkListAll = false;
        }
        else {
            for (let i = 0; i < this.pageData.content.length; i++) {
                if (this.pageData.content[i].chk) {
                    count++;
                    if (count == this.pageData.content.length - 1) {
                        this.chkListAll = true;
                    }
                }
            }
        }
    }

    private printLetterInformCard(): void {
        if (!this._getOnlyCheckItemToSave()) {
            return;
        } else {
            let outputFileName = "letter_inform_card.pdf";
            let ids: number[] = [];
            for (let itm of this.saveLetters) {
                if (itm.chk) {
                    ids.push(itm.id);
                }
            }
            if (ids == undefined || ids.length == 0) {
                this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
                this.closeConfirmDialog();
                return;
            } else {
                jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/return/letterinform-card.jasper&return_req_id=' + ids));
            }
        }
    }

    private printWaybill() {
        if (!this._getOnlyCheckItemToSave()) {
            return;
        } else {
            let ids: number[] = [];
            for (let itm of this.saveLetters) {
                if (itm.chk) {
                    ids.push(itm.id);
                }
            }
            if (ids == undefined || ids.length == 0) {
                this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
                this.closeConfirmDialog();
                return;
            } else {
                jQuery(window.open('/api/return-request/letter-inform/export-to-xls?ids=' + (ids.length > 0 ? ids.toString() : null)));
            }
        }
    }

    private _getOnlyCheckItemToSave(): boolean {
        this.saveLetters = [];
        for (let itm of this.pageData.content) {
            if (itm.chk == true) {
                console.log("itm.receivedMethod >>> ", itm.receivedMethod);
                if ((itm.receivedMethod == false) && !itm.trackingNo) {
                    this.toastr.warning("กรุณาเลือกการดำเนินการ");
                    this.closeConfirmDialog();
                    return false;
                } else {
                    itm.bookDate = this.bookDate;
                    this.saveLetters.push(itm);
                }
            }
        }
        if (this.saveLetters == undefined || this.saveLetters.length == 0) {
            this.toastr.warning("กรุณาเลือกอย่างน้อย 1 รายการ");
            this.closeConfirmDialog();
            return false;
        } else {
            return true;
        }
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}) {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("bookDateFrom", this.search.bookDateFrom || null);
        params.set("bookDateTo", this.search.bookDateTo || null);
        params.set("status", this.search.status || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/return-request/letter-inform/search', {search: params}).map(resp => resp.json())
            .subscribe(resp => {
                this.pageData = resp;
                if(this.pageData.content.length < 1 && this.chkListAll == true) {
                    this.chkListAll = false;
                }
                console.log("return request search result ", this.pageData);
                // this._unpackData();
            });
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

    private statusChange(event: any) {
        this.search.status = event.target.value;
    }

    private clearInputs() {
        console.log("clear input ...");
        this.search = new SearchLetterInform();
    }

    private showConfirmDialog() {
        jQuery(this.confirmModal.nativeElement).modal('toggle');
    }

    private closeConfirmDialog() {
        jQuery(this.confirmModal.nativeElement).modal('hide');
    }

}

export class SearchLetterInform {

    trNo: number;
    bookDateFrom: Date;
    bookDateTo: Date;
    bookAdmin: string;
    status: string|number = 2;
}