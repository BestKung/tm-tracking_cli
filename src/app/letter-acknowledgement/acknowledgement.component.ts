import {Component, OnInit, ViewChild} from "@angular/core";
import {Page} from "../shared/page";
import {Http, URLSearchParams} from "@angular/http";
import {Letter} from "../model/letter";
import {PageEvent} from "../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import * as moment from "moment";
import {SearchLetterInform} from "../letter-inform/search_letter_inform.component";
import {InterceptHttp} from "../shared/intercept_http";

@Component({
    moduleId: module.id,
    selector: 'acknowledgement',
    templateUrl: 'acknowledgement.html'
})
export class AcknowledgementComponent implements OnInit {

    pageData: Page<Letter> = new Page<Letter>();
    saveLetters: Letter[] = [];
    private letterStatus: string[] = [
        "ปกติ", "จดหมายตีกลับ", "ไม่ได้รับหนังสือ"
    ];
    private static DATE_PLUS_15: number = 15;
    private search: SearchLetterInform = new SearchLetterInform();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private cbAll: boolean = false;

    constructor(private http: InterceptHttp,
                public toastr: ToastsManager) {

    }

    ngOnInit(): void {
        // this.searchAction();
    }

    private saveAction() {
        if (!this._getOnlyCheckItemToSave()) {
            return false;
        }
        if (this.saveLetters.length == 0) {
            this.toastr.warning('กรุณาเลือกอย่างน้อย 1 รายการ');
            return;
        }
        this.http.post('/api/letter/save-ack', this.saveLetters).subscribe(resp => {
            console.log(resp);
            if (resp.status = 200) {
                this.toastr.success('บันทึกข้อมูลสำเร็จ');
                this.searchAction();
            }
        });
    }

    private searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}) {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new URLSearchParams();
        params.set("trNo", (this.search.trNo == undefined ? null : this.search.trNo + "" || null));
        params.set("bookDateFrom", (this.search.bookDateFrom == undefined ? null : this.search.bookDateFrom + "" || null));
        params.set("bookDateTo", (this.search.bookDateTo == undefined ? null : this.search.bookDateTo + "" || null));
        params.set("bookAdmin", (this.search.bookAdmin == undefined ? null : this.search.bookAdmin + "" || null));
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        params.set("status", (this.search.status == null ? null : this.search.status + ""));
        params.set("sort", "returnRequest.bookNo,ASC");
        this.http.get('/api/letter/search', {search: params})
            .map(resp => resp.json() as Page<Letter>)
            .subscribe(resp => {
                this.pageData = resp;
                if(this.pageData.content.length < 1 && this.cbAll == true) {
                    this.cbAll = false;
                }
                this._unpackResult();
            });
    }

    private _unpackResult() {
        for (let itm of this.pageData.content) {
            itm.flagRecv = (itm.letterStatus == null ? false : true);
        }
        console.log(this.pageData.content);
    }

    private _getOnlyCheckItemToSave(): boolean {
        this.saveLetters = [];
        for (let itm of this.pageData.content) {
            if (itm.chk == true) {
                if (!itm.status) {
                    this.toastr.warning('กรุณาเลือกสถานะใบตอบรับ');
                    return false;
                }
                if (!itm.recvDate) {
                    this.toastr.warning('กรุณาเลือกวันที่ตอบรับ');
                    return false;
                }
                itm.dueDate = null;
                this.saveLetters.push(itm);
            }
        }
        return true;
    }

    private checkAll(event: any) {
        for (let itm of this.pageData.content) {
            itm.chk = event.checked;
        }
    }

    private statusChange(event: any) {
        this.search.status = event.target.value;
    }

    check(letter: Letter, event: any) {
        letter.chk = event.checked;
    }

    setLetterStatus(letter: Letter, event: any) {
        console.log("selected letter status = ", event.target.value)
        letter.status = event.target.value;
        letter.dueDate = null;
    }

    changeReturnDueDate(itm: Letter) {

        if (itm.status == 'ปกติ' && itm.recvDate) {
            itm.dueDate = itm.recvDate;
            itm.dueDate = new Date(itm.dueDate.toString());
            itm.dueDate.setDate(new Date(
                    itm.dueDate.toString()).getDate() + AcknowledgementComponent.DATE_PLUS_15);
        }
    }

    clear(): void {
        this.search = new SearchLetterInform();
    }
}
