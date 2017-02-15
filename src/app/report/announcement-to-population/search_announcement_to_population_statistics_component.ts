/**
 * Created by neng on 4/9/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../shared/page";
import {PrintBookInform} from "../../print-inform/print_book_inform/print_book_inform";
import {SearchPrintBookInform} from "../../print-inform/print_book_inform/search_print_book_inform";
import {PageEvent} from "../../shared/paging/page_event";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: "search-announcement-to-population-statistics",
    templateUrl: "search_announcement_to_population_statistics.html"
})

export class SearchAnnouncementToPopulationStatistics implements OnInit {

    searchPrintBookInform: SearchPrintBookInform = new SearchPrintBookInform();
    pageData: Page<PrintBookInform> = new Page<PrintBookInform>();
    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(private http: InterceptHttp) {

    }

    ngOnInit(): void {
        this.searchPrintBookInform = new SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new URLSearchParams();
        params.set('trNo', this.searchPrintBookInform.trNo || null);
        params.set('formType', this.searchPrintBookInform.formType || null);
        params.set('startDate', this.searchPrintBookInform.startDate || null);
        params.set('endDate', this.searchPrintBookInform.endDate || null);
        params.set('whereBookAdmin', '1');
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/nontification-delayed-template', {search: params})
            .map(data => data.json() as Page<PrintBookInform>)
            .subscribe(data => this.pageData = data);
    }

    printPdf(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.searchPrintBookInform.trNo || null);
        params.set('form_type', this.searchPrintBookInform.formType || null);
        params.set('start_date', this.searchPrintBookInform.startDate || null);
        params.set('end_date', this.searchPrintBookInform.endDate || null);
        jQuery(window.open('/report/statistict_population.pdf?reportPath=/report/nontification_population/nontification_population.jasper'
            + '&' + params.toString()));
    }

    printXlsx(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.searchPrintBookInform.trNo || null);
        params.set('form_type', this.searchPrintBookInform.formType || null);
        params.set('start_date', this.searchPrintBookInform.startDate || null);
        params.set('end_date', this.searchPrintBookInform.endDate || null);
        jQuery(window.open('/report/statistict_population.xlsx?reportPath=/report/nontification_population/nontification_population.jasper'
            + '&' + params.toString()));
    }

    clear(): void {
        this.searchPrintBookInform = new SearchPrintBookInform();
        this.searchPrintBookInform.formType = '';
    }
}
