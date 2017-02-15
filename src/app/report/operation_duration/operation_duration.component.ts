import {Component, OnInit, OnDestroy} from "@angular/core";
import {SearchReport} from "../search_report";
import {Page} from "../../shared/page";
import {ReportFollow} from "../report_follow";
import {Http, URLSearchParams} from "@angular/http";
import {PageEvent} from "../../shared/paging/page_event";
import {NotificationRestObjectService} from "../../shared/service/notification-rest-obj.service";
import {Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'operation-duration',
    templateUrl: 'operation_duration.html'
})
export class OperationDurationComponent implements OnInit, OnDestroy {
    pageData: Page<ReportFollow> = new Page<ReportFollow>();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private subscription: Subscription;

    constructor(private http: InterceptHttp,
                private notifRestService: NotificationRestObjectService,
                private _route: Router) {

    }

    ngOnInit(): void {
        this.subscription = this._route.events.filter(event => event instanceof NavigationEnd)
            .subscribe((val) => {

                if (this.notifRestService.searchReport.trNo
                    || this.notifRestService.searchReport.endDate
                    || this.notifRestService.searchReport.startDate
                    || this.notifRestService.searchReport.formType) {

                    if (val.url.startsWith("/reports/operation-duration")) {
                        this.searchAction();
                    } else {
                        this.notifRestService.clearParam();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        this.notifRestService.searchNotification(pageEvent).subscribe(data => {
            this.pageData = data;
        });
    }

    clear(): void {
        this.notifRestService.searchReport = new SearchReport();
        this.notifRestService.searchReport.formType = '';
    }


    excelDownload(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.notifRestService.searchReport.trNo || null);
        params.set('form_type', this.notifRestService.searchReport.formType || null);
        params.set('start_date', this.notifRestService.searchReport.startDate || null);
        params.set('end_date', this.notifRestService.searchReport.endDate || null)
        jQuery(window.open('/report/flow.xlsx?reportPath=/report/report_flow/report_flow.jasper&'
            + params.toString()));
    }

    pdfDownload(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.notifRestService.searchReport.trNo || null);
        params.set('form_type', this.notifRestService.searchReport.formType || null);
        params.set('start_date', this.notifRestService.searchReport.startDate || null);
        params.set('end_date', this.notifRestService.searchReport.endDate || null)
        jQuery(window.open('/report/flow.pdf?reportPath=/report/report_flow/report_flow.jasper&'
            + params.toString()));
    }
}
