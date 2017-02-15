import {Component} from "@angular/core";
import {Page} from "../../../shared/page";
import {Matra40} from "./matra40";
import {Http} from "@angular/http";
import {DateSupportURLSearchParams} from "../../../shared/date-support-url-search-params";
import {PageEvent} from "../../../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
/**
 * Created by best on 15/12/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'cancellation-matra-40',
    templateUrl: 'matra40.html'
})
export class CancellationMatra40Component {
    pageData: Page<Matra40> = new Page<Matra40>();
    expireDate: Date;
    currentPage: number = 0;
    pageSize: number = 10;

    constructor(public http: Http, public toastr: ToastsManager) {
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        let params = new DateSupportURLSearchParams();
        params.set('expireDate', this.expireDate);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/test-matra40', {search: params})
            .map(data=>data.json() as Page<Matra40>)
            .subscribe(data=>this.pageData = data);
    }


    cancellation(trNo: number): void {
        this.http.post('/api/test-matra40', {'trNo': trNo})
            .subscribe(data=> {
                this.searchAction();
                this.toastr.success('จำหน่ายเลขคำขอ ' + trNo + ' เรีบยร้อย');
            })
    }
}