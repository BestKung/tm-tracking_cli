import {Injectable} from "@angular/core";
import {FollowSearch} from "../follow_search";
import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {PageEvent} from "../paging/page_event";
import {DateSupportURLSearchParams} from "../date-support-url-search-params";
import {Observable} from "rxjs";
import {Page} from "../page";
import {FollowTranfer} from "../../follow-case/follow-transfer-legacy/follow_tranfer";
import {FollowApprove} from "../../follow-case/follow-approve/follow_approve";
import {InterceptHttp} from "../intercept_http";
/**
 * Created by neng on 16/11/2559.
 */
@Injectable()
export class FollowApproveRestObjectService {

    public searchRequest: FollowSearch = new FollowSearch();
    public stepDesc = {
        '101': 'ตรวจสอบเอกสารรับคำขอ',
        '201': 'นายทะเบียนพิจารณา',
        '307': 'ออกหนังสือแจ้งให้ผู้ขอชำระค่าธรรมเนียมสัญญาอนุญาตให้ใช้เครื่องหมายการค้า',
        '308': 'รับจดทะเบียนและออกหนังสือแจ้งการรับจดทะเบียนสัญญาอนุญาตให้ใช้เครื่องหมายการค้า'
    };

    constructor(private http: InterceptHttp) {
    }

    public searchFollowApprove(pageEvent: PageEvent): Observable<Page<FollowTranfer>> {
        let params = new DateSupportURLSearchParams();
        params.set('trNo', this.searchRequest.trNo || null);
        params.set('stepCode', this.searchRequest.stepCode || null);
        params.set('startDate', this.searchRequest.startDateStr || null);
        params.set('endDate', this.searchRequest.endDateStr || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        return this.http.get('/api/follow-approve/search', {search: params}).map(data => data.json() as Page<FollowApprove>);
    }

    clearParam(): void {
        this.searchRequest = new FollowSearch();
    }
}