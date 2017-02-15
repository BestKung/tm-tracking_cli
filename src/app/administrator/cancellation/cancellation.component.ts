/**
 * Created by best on 9/12/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Cancellation} from "./cancellation";
import {Page} from "../../shared/page";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {PageEvent} from "../../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: 'cancellation',
    templateUrl: 'cancellation.html'
})
export class CancellationComponent implements OnInit {

    pageData: Page<Cancellation> = new Page<Cancellation>();
    expireDate: string|Date;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(public http: Http, public toaStr: ToastsManager) {
    }

    ngOnInit(): void {
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        let params = new DateSupportURLSearchParams();
        params.set('expireDate', this.expireDate);
        params.set('sort', 'trNo,DESC');
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-matra56', {search: params})
            .map(data=>data.json() as Page<Cancellation>)
            .subscribe(data=>{
                this.pageData = data;
            });
    }

    cancellation(trNo: number): void {
        let params = {trNo:null};
        params.trNo = trNo;
        this.http.post('/api/test-matra56', params).subscribe(data=> {
            this.searchAction();
            this.toaStr.success('เพิกถอนเลข '+trNo+' เเล้ว');
        })
    }

}