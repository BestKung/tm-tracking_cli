import {Injectable, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {FollowSearch} from "../follow_search";
import {PageEvent} from "../paging/page_event";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Page} from "../page";
import {FollowTrademark} from "../../follow-case/follow-trademark/follow_trademark";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {InterceptHttp} from "../intercept_http";
/**
 * Created by neng on 15/11/2559.
 */

@Injectable()
export class FollowTrademarkRestObjectService {

    public searchRequest: FollowSearch = new FollowSearch();
    public stepDesc = {
        '101': 'ตรวจสอบเอกสารรับคำขอ',
        '201': 'ตรวจสอบเครื่องหมาย',
        '202': 'นายทะเบียนพิจารณา',
        '301': 'จัดทำหนังสือประกาศโฆษณา',
        '304': 'ประกาศโฆษณา',
        '307': 'ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน',
        '308': 'ออกหนังสือสำคัญแสดงการจดทะเบียน'
    };

    constructor(private _http: InterceptHttp) {
    }

    clearParam(): void {
            this.searchRequest = new FollowSearch();
    }


    public searchFollowTrademark(pageEvent: PageEvent): Observable<Page<FollowTrademark>> {
        let params = new DateSupportURLSearchParams();
        params.set("trNo", this.searchRequest.trNo || null);
        params.set("stepCode", this.searchRequest.stepCode || null);
        params.set("startDate", this.searchRequest.startDateStr || null);
        params.set("endDate", this.searchRequest.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this._http.get('/api/follow-trademark', {search: params}).map(data=><Page<FollowTrademark>>data.json())
    }

}