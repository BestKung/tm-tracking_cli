///<reference path="inform_template.ts"/>
import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Inform} from "./inform";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../shared/page";
import {InformMessage} from "../administrator/inform_message/inform_message";
import {InformTemplate} from "./inform_template";
import {PrintBookInform} from "./print_book_inform/print_book_inform";
import {PageEvent} from "../shared/paging/page_event";
import {AuthenService} from "../authen/shared/authen.service";
import {User} from "../authen/shared/User";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {InterceptHttp} from "../shared/intercept_http";
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'search-inform',
    templateUrl: './search_inform.html'
})
export class SearchInformComponent implements OnInit {

    @ViewChild('add_message')
    addMessage: ElementRef;
    trNo: string;
    formType: string;
    pageData: Page<Inform> = new Page<Inform>();
    informMessages: Page<InformMessage> = new Page<InformMessage>();
    pageModal: number = 0;
    totalPageModal: number = 0;
    informTemplate: InformTemplate = new InformTemplate();
    informTemplatePrint: PrintBookInform = new PrintBookInform();
    isClickMessageAll = false;
    chkAll: boolean = false;
    isNotChackMessageBook: boolean = false;
    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(private http: InterceptHttp, public toastr: ToastsManager) {

    }

    ngOnInit(): void {
        this.formType = '';
        this.chkAll = false;
        this.isNotChackMessageBook = false;
    }

    clear(): void {
        this.trNo = '';
        this.formType = '';
        this.searchAction();
    }

    search(): void {
        console.log('click----------');
        let params = new URLSearchParams();
        params.set('trNo', this.trNo || null);
        params.set('formType', this.formType || null);
        params.set("page", "" + 1);
        params.set("size", "" + 10);
        this.http.get('/api/nontification-delayed', {search: params})
            .map(data => data.json() as Page<Inform>)
            .subscribe(data => {
                this.pageData = data;
            });
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.chkAll = false;
        let params = new URLSearchParams();
        params.set('trNo', this.trNo || null);
        params.set('formType', this.formType || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed', {search: params})
            .map(data => data.json() as Page<Inform>)
            .subscribe(data => {
                this.pageData = data;
            });
    }

    clickMessage(inform: Inform): void {
        this.isClickMessageAll = false;
        this.pageModal = 0;
        this.totalPageModal = 0;
        this.getInformMessage();
        this.informTemplatePrint.formType = inform.formType;
        this.informTemplatePrint.trNo = inform.trNo;
        this.informTemplatePrint.textRemark = 'ตามที่(ผู้ยื่นคำขอ/บริษัท) ' + inform.conName + ' ได้ยื่นจดทะเบียนเลขที่คำขอ ' + inform.trNo + ' เเละพนักงานเจ้าหน้าที่ได้รับคำขอของท่านเพื่อดำเนินการเเล้ว นั้น';
        this.informTemplatePrint.conName = inform.conName;
        jQuery(this.addMessage.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
    }

    getInformMessage(): void {
        let params = new URLSearchParams();
        params.set('size', '5');
        params.set('page', this.pageModal + '');
        this.http.get('/api/message-print-inform', {search: params})
            .map(data => data.json() as Page<InformMessage>)
            .subscribe(data => {
                this.informMessages = data;
                this.totalPageModal = data.totalPages;
            })
    }


    nextPageModal(): void {
        ++this.pageModal;
        this.getInformMessage();
    }

    prePageModal(): void {
        --this.pageModal;
        this.getInformMessage();
    }

    selectMessage(message: string): void {
        if (this.informTemplatePrint.text) {
            message = '\n' + message;
        }
        this.informTemplatePrint.text = (this.informTemplatePrint.text || '') + message;
    }

    saveMessage(): void {
        this.http.post('/api/nontification-delayed-template', this.informTemplatePrint)
            .subscribe(data => {
                this.toastr.success('บันทึกข้อมูลสำเร็จ');
                this.searchAction();
                this.informTemplatePrint = new PrintBookInform();
            });
    }

    clearMessage(): void {
        this.informTemplatePrint = new PrintBookInform();
    }

    checkAll(value: any): void {
        for (let i = 0; i < this.pageData.content.length; i++) {
            this.pageData.content[i].chk = value.target.checked;
        }
    }

    cancelCheckAll(value: any): void {
        if (!value.target.checked) {
            this.chkAll = false;
        }
    }

    clickMessageAll(inform: Inform): void {
        let countSelect: number = 0;
        for (let i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                countSelect++;
            }
        }
        if (countSelect == 0) {
            this.isNotChackMessageBook = true;
            this.toastr.warning('เลือกข้อความที่ต้องการบันทึกอย่างน้อย 1');
            return;
        }
        else {
            this.isNotChackMessageBook = false;
        }
        this.isClickMessageAll = true;
        this.informTemplate = new InformTemplate();
        this.pageModal = 0;
        this.totalPageModal = 0;
        this.getInformMessage();
        jQuery(this.addMessage.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
    }

    saveAll(): void {
        let printInformTemplates: Array<PrintBookInform> = new Array<PrintBookInform>();
        for (let i = 0; i < this.pageData.content.length; i++) {
            if (this.pageData.content[i].chk) {
                let printBookInform: PrintBookInform = new PrintBookInform();
                printBookInform.text = this.informTemplatePrint.text;
                printBookInform.conName = this.pageData.content[i].conName;
                printBookInform.textRemark = 'ตามที่(ผู้ยื่นคำขอ/บริษัท) ' + this.pageData.content[i].conName + ' ดำเนิน สมเกียรติและบุญมา จำกัด ได้ยื่นจดทะเบียนเลขที่คำขอ ' + this.pageData.content[i].trNo + ' เเละพนักงานเจ้าหน้าที่ได้รับคำขอของท่านเพื่อดำเนินการเเล้ว นั้น';
                printBookInform.trNo = this.pageData.content[i].trNo;
                printBookInform.formType = this.pageData.content[i].formType;
                printInformTemplates.push(printBookInform);
            }
        }
        this.http.post('/api/nontification-delayed-template/list', printInformTemplates)
            .subscribe(data => {
                this.informTemplatePrint = new PrintBookInform();
                this.toastr.success('บันทึกข้อมูลสำเร็จ');
                this.searchAction();
            });
    }

    clickPrintInform(inform: Inform): void {
        let params = new URLSearchParams();
        params.set('trNo', inform.trNo.toString());
        params.set('formType', inform.formType);
        this.http.get('/api/inform-template/print', {search: params})
            .map(data => data.json() as Page<InformTemplate>)
            .subscribe(data => {
                let response: InformTemplate = data.content[0] || new InformTemplate();
                this.informTemplatePrint.bookDate = response.bookDate;
                this.informTemplatePrint.formType = response.formType;
                this.informTemplatePrint.text = response.message;
                this.informTemplatePrint.textRemark = response.remark;
                this.informTemplatePrint.trNo = response.trNo;
                this.informTemplatePrint.conName = inform.conName;
                this.http.post('/api/nontification-delayed-template', this.informTemplatePrint)
                    .map(data => data.json() as PrintBookInform)
                    .subscribe(data => {
                        jQuery(window.open('/report/inform.pdf?reportPath=/report/inform/inform.jasper&book_admin=' + data.bookAdmin));
                    });
            });
    }

}
