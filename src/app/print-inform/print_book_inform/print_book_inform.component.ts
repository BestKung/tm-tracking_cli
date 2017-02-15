import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {PrintBookInform} from "./print_book_inform";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../shared/page";
import {SearchPrintBookInform} from "./search_print_book_inform";
import {PageEvent} from "../../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
/**
 * Created by best on 21/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'print-book-inform',
    templateUrl: 'print_book_inform.html'
})
export class PrintBookInformComponent implements OnInit {

    pageData: Page<PrintBookInform> = new Page<PrintBookInform>();
    searchPrintBookInform: SearchPrintBookInform = new SearchPrintBookInform();
    @ViewChild("modal_confirm_cancel")
    modalConfirmCancel: ElementRef;
    printBookInform: PrintBookInform = new PrintBookInform();
    bookDate: Date;
    chkAll: boolean;
    isNotSpecBookDate: boolean = false;
    isNotSelectBook: boolean = false;
    private currentPage: number = 0;
    private pageSize: number = 10;

    ngOnInit(): void {
        this.searchPrintBookInform.whereBookAdmin = '0';
        this.searchPrintBookInform.formType = '';
        this.chkAll = false;
        this.isNotSpecBookDate = false;
    }

    constructor(private http: InterceptHttp, public toastr: ToastsManager) {

    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.chkAll = false;
        let params = new URLSearchParams();
        params.set('trNo', this.searchPrintBookInform.trNo || null);
        params.set('whereBookAdmin', this.searchPrintBookInform.whereBookAdmin || null);
        params.set('formType', this.searchPrintBookInform.formType || null);
        params.set('startDateStr', this.searchPrintBookInform.startDate || null);
        params.set('endDateStr', this.searchPrintBookInform.endDate || null)
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed-template', {search: params})
            .map(data => data.json() as Page<PrintBookInform>)
            .subscribe(data => this.pageData = data);
    }

    clickCancelBook(value: PrintBookInform): void {
        this.printBookInform = value;
        jQuery(this.modalConfirmCancel.nativeElement).modal({closable: false}).modal('toggle');
    }

    cancelBook(): void {
        this.printBookInform.flagCancleBook = true;
        this.http.post('/api/nontification-delayed-template', this.printBookInform)
            .subscribe(data => {
                this.toastr.info('ยกเลิกหนังสือสำเร็จ');
                this.searchAction();
            });
    }

    draftBook(data: PrintBookInform): void {
        let countSelect: number = 0;
        jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + data.id));
    }


    draftBookAll(): void {
        let countSelect: number = 0;
        let ids: Array<string> = new Array<string>();
        let printBookInforms: Array < PrintBookInform > = new Array<PrintBookInform>();
        for (let i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                this.pageData.content[i].bookDate = this.bookDate;
                printBookInforms.push(this.pageData.content[i]);
                ids.push(this.pageData.content[i].id + '');
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.toastr.warning('เลื่อกหนังสืออย่างน้อย 1');
            this.isNotSelectBook = true;
            return;
        }
        else {
            this.isNotSelectBook = false;
        }
        jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + ids));
    }

    clear() {
        this.searchPrintBookInform = new SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
        this.searchPrintBookInform.whereBookAdmin = '0';
        this.searchAction();
    }

    checkAll(data: any): void {
        console.log(data);
        for (let i = 0; i < this.pageData.content.length; i++) {
            this.pageData.content[i].chk = data.target.checked;
        }
    }

    cancelCheckAll(value: any): void {
        if (!value.target.checked) {
            this.chkAll = false;
        }
    }

    clickPrintBook(inform: PrintBookInform): void {
        if (!this.bookDate) {
            this.isNotSpecBookDate = true;
            this.toastr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        inform.bookDate = this.bookDate;
        this.http.post('/api/nontification-delayed-template/print', inform).subscribe(data => {
            this.searchAction();
            this.toastr.success('บันทึกเลข พณ สำเร็จ');
            jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + inform.id));
        });
    }

    clickPrintBookAll(): void {
        let countSelect: number = 0;
        if (!this.bookDate) {
            this.isNotSpecBookDate = true;
            this.toastr.warning('กรอกข้อมูลให้ครบถ้วน');
            return;
        }
        let ids: Array<string> = new Array<string>();
        let printBookInforms: Array < PrintBookInform > = new Array<PrintBookInform>();
        for (let i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                this.pageData.content[i].bookDate = this.bookDate;
                printBookInforms.push(this.pageData.content[i]);
                ids.push(this.pageData.content[i].id + '');
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.toastr.warning('เลื่อกหนังสืออย่างน้อย 1');
            this.isNotSelectBook = true;
            return;
        }
        else {
            this.isNotSelectBook = false;
        }
        this.http.post('/api/nontification-delayed-template/print-list', printBookInforms).subscribe(data => {
            this.searchAction();
            this.toastr.success('บันทึกเลข พณ สำเร็จ');
            jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&id=' + ids));
        });
    }

}