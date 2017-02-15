import {Injectable} from "@angular/core";
import {SearchReport} from "../../report/search_report";
import {Http, URLSearchParams} from "@angular/http";
import {Router} from "@angular/router";
import {PageEvent} from "../paging/page_event";
import {Observable} from "rxjs";
import {ReportFollow} from "../../report/report_follow";
import {Page} from "../page";
/**
 * Created by neng on 21/11/2559.
 */
@Injectable()
export class NotificationRestObjectService {

    public searchReport:SearchReport = new SearchReport();
    public reqNo:string;
    public name:string;
    public requestDate:Date;

    constructor(private http: Http) {
    }

    clearParam(): void {
        this.searchReport = new SearchReport();
    }

    public searchNotification(pageEvent: PageEvent): Observable<Page<ReportFollow>> {

        let params = new URLSearchParams();
        params.set('trNo', this.searchReport.trNo || null);
        params.set('formType', this.searchReport.formType || null);
        params.set('startDate', this.searchReport.startDate || null);
        params.set('endDate', this.searchReport.endDate || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/report-follow', {search: params}).map(data=>data.json() as Page<ReportFollow>);
    }
}