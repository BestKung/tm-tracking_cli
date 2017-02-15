import {Component, OnInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../shared/page";
import {ActivatedRoute, Params} from "@angular/router";
import {ReportFollowDetail} from "../report_follow_detail";
import {InterceptHttp} from "../../shared/intercept_http";
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'operation-duration-detail',
    templateUrl: 'operation_duration_detail.html'
})
export class OperationDurationDetailComponent implements OnInit {

    trNo: number;
    formType: string;
    conName: string;
    requestDate: Date;
    reportFollowDetail: Page<ReportFollowDetail> = new Page<ReportFollowDetail>();

    stepDesc = {
        "01": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "201": "นายทะเบียนพิจารณา",
            "202": "นายทะเบียนพิจารณา",
            "301": "จัดทำหนังสือประกาศโฆษณา",
            "304": "ประกาศโฆษณา",
            "307": "ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน",
            "308": "ออกหนังสือสำคัญแสดงการจดทะเบียน",
        },
        "04": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "202": "นายทะเบียนพิจารณา",
            "308": "ออกหนังสือแสดงรายการการโอนหรือรับมรดก"
        },
        "05": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "201": "นายทะเบียนพิจารณา",
            "307": "ออกหนังสือแจ้งให้ผู้ขอชำระค่าธรรมเนียมสัญญาอนุญาตให้ใช้เครื่องหมายการค้า",
            "308": "รับจดทะเบียนและออกหนังสือแจ้งการรับจดทะเบียนสัญญาอนุญาตให้ใช้เครื่องหมายการค้า"
        },
        "06": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "202": "นายทะเบียนพิจารณา"
        },
        "07": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "202": "นายทะเบียนพิจารณา",
            "308": "ออกหนังสือสำคัญแสดงการจดทะเบียน"
        },
        "08": {
            "101": "ตรวจสอบเอกสารรับคำขอ",
            "202": "นายทะเบียนพิจารณา"
        }
    };

    constructor(private http: InterceptHttp, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.findDetail();
    }


    findDetail(): void {
        this.route.params.forEach((params: Params) => {
            this.trNo = params['trNo'];
            this.formType = params['formType'];
        });
        let params = new URLSearchParams();
        params.set('trNo', this.trNo.toString());
        params.set('formType', this.formType);
        this.http.get('api/report-follow-detail', {search: params})
            .map(data => {
                return <Page<ReportFollowDetail>>data.json();
            })
            .subscribe(data => {
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.reportFollowDetail = data;
            });
    }

    clear(): void {

    }

    excelDownload(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.trNo.toString() || null);
        params.set('form_type', this.formType || null);
        jQuery(window.open('/report/flow_detail.xlsx?reportPath=/report/report_flow/flow_detail.jasper&'
            + params.toString()));
    }

    pdfDownload(): void {
        let params = new URLSearchParams();
        params.set('tr_no', this.trNo.toString() || null);
        params.set('form_type', this.formType || null);
        jQuery(window.open('/report/flow_detail.pdf?reportPath=/report/report_flow/flow_detail.jasper&'
            + params.toString()));
    }
}
