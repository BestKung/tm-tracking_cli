import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {Page} from "../../shared/page";
import {PageEvent} from "../../shared/paging/page_event";
import {InterceptHttp} from "../../shared/intercept_http";
/**
 * Created by neng on 16/12/2559.
 */
declare var jQuery:any;
@Component({
    moduleId: module.id,
    selector: "search-discard",
    templateUrl: "search_discard.html"
})

export class SearchDiscard implements OnInit {

    private pageData: Page<SearchDiscardRequest> = new Page<SearchDiscardRequest>();
    private search:SearchDiscardRequest = new SearchDiscardRequest();
    private currentPage:number = 0;
    private pageSize:number = 10;

    ngOnInit(): void {
    }

    constructor(private http: InterceptHttp) {
    }

    private searchAction(pageEvent:PageEvent = {currentPage: 1, pageSize: 10}) {
        let params = new DateSupportURLSearchParams();
        params.set("trNo", this.search.trNo || null);
        params.set("matra", this.search.type || null);
        params.set("expireDate", this.search.expireDate || null);
        params.set("extraExpireDate", this.search.extraExpireDate || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/discard-report/search', {search: params}).map(resp => resp.json()).subscribe(resp => {
            this.pageData = resp;
        });
    }

    private exportTo(type:string) {
        let outputFileName = '';

        if("pdf" == type) {
            outputFileName = 'discard.pdf';
            jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/cancelation/discard.jasper&tr_no=' + (this.search.trNo == undefined? '':this.search.trNo ) + '&matra=' + (this.search.type == undefined?'': this.search.type) + '&expire_date=' + (this.search.expireDate==undefined? '':this.search.expireDate) + "&extra_expire_date=" + (this.search.extraExpireDate == undefined? '': this.search.extraExpireDate)));
        }
        if("xls" == type) {
            outputFileName = 'discard.xls';
            jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/cancelation/discard.jasper&tr_no=' + (this.search.trNo || null) + '&matra=' + (this.search.type || null) + '&expire_date=' + (this.search.expireDate || null) + "&extra_expire_date=" + (this.search.extraExpireDate || null)));
        }
    }

    private clear():void {
        this.search = new SearchDiscardRequest();
    }

    private matraChange(event: any) {
        this.search.type = event.target.value;
    }
}

export class SearchDiscardRequest {

    trNo: string|number;

    type: string|number = '56';

    expireDate: Date|string;

    extraExpireDate: Date|string;
}