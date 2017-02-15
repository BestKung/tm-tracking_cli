/**
 * Created by neng on 4/9/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {AbsenceAgreement} from "../../follow-case/absence_agreement";
import {Page} from "../../shared/page";
import {PageEvent} from "../../shared/paging/page_event";
import {ServiceAndExamineStatistic} from "../../model/service-and-examine-model";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: "search-services-and-examine-statistics",
    templateUrl: "search_services_and_examine_statistics.html"
})

export class SearchServicesAndExamineStatistics implements OnInit {

    pageData: Page<ServiceAndExamineStatistic> = new Page<ServiceAndExamineStatistic>();
    search: SearchServiceAndExamineStatistic = new SearchServiceAndExamineStatistic();
    private currentPage: number = 0;
    private pageSize: number = 10;
    private reportType: string = '';

    private formTypes: Object[] = [
        {'id': '01', 'desc': 'ก.01'},
        {'id': '04', 'desc': 'ก.04'},
        {'id': '05', 'desc': 'ก.05'},
        {'id': '06', 'desc': 'ก.06'},
        {'id': '07', 'desc': 'ก.07'},
        {'id': '08', 'desc': 'ก.08'}
    ];

    constructor(private _http: InterceptHttp) {

    }

    ngOnInit(): void {
        this.search.reportType = '';
        this.search.formType = '';
        this.search.organize = '1';
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}) {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new URLSearchParams();
        params.set('reportType', this.search.reportType || null);
        params.set('formType', this.search.formType || null);
        params.set('trNo', this.search.trNo || null);
        params.set('organize', this.search.organize || null);
        params.set('createDateFrom', (this.search.createDateFrom == undefined ? null : this.search.createDateFrom + "") || null);
        params.set('createDateTo', (this.search.createDateTo == undefined ? null : this.search.createDateTo + "") || null);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this._http.get('/api/service-examine/search', {search: params}).map(resp => resp.json()).subscribe(resp => {
            this.pageData = resp;
            console.log("search ServiceAndExamineStatistic ", this.pageData);
        });
        if (Number(this.search.reportType) === 1) {
            this.reportType = 'รายงานสถิติการบันทึกข้อตกลง';
        } else if (Number(this.search.reportType) === 2) {
            this.reportType = 'รายงานสถิติการแจ้งคืนคำขอ';
        } else if (Number(this.search.reportType) === 3) {
            this.reportType = 'รายงานสถิติการยื่นอุทธรณ์';
        } else if (Number(this.search.reportType) === 4) {
            this.reportType = 'รายงานสถิติการบันทึก ก.20';
        }
    }

    exportTo(type: string) {

        let outputFileName: string = '';
        if (type == 'pdf') {
            outputFileName = 'service_and_examine_statistic.pdf';
        }

        if (type == 'xlsx') {
            outputFileName = 'service_and_examine_statistic.xlsx';
        }
        let orgParam: string = '';
        let reportName: string = 'รายงานสถิติการบันทึกข้อตกลง';
        if (this.search.organize == '1' || this.search.organize == undefined) {
            orgParam = 'กรมทรัพย์สินทางปัญญา';
        }
        if (this.search.organize == '2') {
            orgParam = 'สำนักงานพาณิชย์จังหวัด';
        }
        if (this.search.reportType == '1') {
            reportName = 'รายงานสถิติการบันทึกข้อตกลง';
        }
        if (this.search.reportType == '2') {
            reportName = 'รายงานสถิติการแจ้งคืนคำขอ';
        }
        if (this.search.reportType == '3') {
            reportName = 'รายงานสถิติการยื่นอุทธรณ์';
        }
        if (this.search.reportType == '4') {
            reportName = 'รายงานสถิติการบันทึก ก.20';
        }
        jQuery(window.open('/report/' + outputFileName + '?reportPath=/report/statistic/statistic_floor3.jasper&report_name=' + reportName + '' + (this.search.formType == undefined ? '' : '&form_type=' + this.search.formType) + "" + (this.search.trNo == undefined ? '' : '&tr_no=' + this.search.trNo) + "&org=" + orgParam + "" + (this.search.createDateFrom == undefined ? '' : '&create_date_from=' + this.search.createDateFrom) + "" + (this.search.createDateTo == undefined ? '' : '&create_date_to=' + this.search.createDateTo) + "" + (this.search.reportType == undefined ? '' : '&report_type=' + this.search.reportType)));
    }

    reportChange(event: any) {
        this.search.reportType = event.target.value;
    }

    formTypeChange(event: any) {
        this.search.formType = event.target.value;
    }

    orgChange(event: any) {
        this.search.organize = event.target.value;
    }

    clear(): void {
        this.search = new SearchServiceAndExamineStatistic();
        this.search.reportType = '';
        this.search.formType = '';
        this.search.organize = '1';
    }
}

export class SearchServiceAndExamineStatistic {
    reportType: string;
    formType: string;
    trNo: string;
    organize: string;
    createDateFrom: Date|string;
    createDateTo: Date|string;
}