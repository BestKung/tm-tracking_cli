import {Component, ViewChild, ElementRef} from "@angular/core";
import {Page} from "../../shared/page";
import {CancellationBackup} from "../cancellation_backup";
import {SearchCancellation} from "../search_cancellation";
import {Http} from "@angular/http";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import {PageEvent} from "../../shared/paging/page_event";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
/**
 * Created by best on 16/12/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'matra40',
    templateUrl: 'matra40.html'
})
export class Matra40Component {

    pageData: Page<CancellationBackup> = new Page<CancellationBackup>();
    search: SearchCancellation = new SearchCancellation();
    @ViewChild('confirm')
    confirm: ElementRef;
    @ViewChild('confirm_all')
    confirmAll: ElementRef;
    backStatus: CancellationBackup = new CancellationBackup();
    currentPage: number = 0;
    pageSize: number = 10;


    constructor(public http: InterceptHttp, public toastr: ToastsManager) {

    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.search.trNo);
        params.set('start', this.search.start);
        params.set('end', this.search.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/matra40', {search: params})
            .map(data => data.json() as Page<CancellationBackup>)
            .subscribe(data => this.pageData = data);
    }

    clear(): void {
        this.search = new SearchCancellation();
    }

    clickBackStatus(): void {
        this.http.post('/api/matra40', this.backStatus)
            .subscribe(data => {
                this.searchAction();
                this.toastr.success('ถอยสถานะเรียบร้อย');
            });
    }

    clickBackStatusAll(): void {
        this.http.post('/api/matra40/all', this.search)
            .subscribe(data => {
                this.searchAction();
                this.toastr.success('ถอยสถานะเรียบร้อย');
            });
    }

    openModalConfirm(blackCancellation: CancellationBackup): void {
        this.backStatus = blackCancellation;
        jQuery(this.confirm.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
    }

    openModalConfirmAll(): void {
        jQuery(this.confirmAll.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
    }
}