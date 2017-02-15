import {Component, OnInit} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {FollowTrademark} from "../follow_trademark";
import {Page} from "../../../shared/page";
import {Category} from "../../../shared/category";
import {Step} from "../../../administrator/effectivedate_act_facilitate/step";
import {StepForShow} from "../../../shared/step_for_show";
import {InterceptHttp} from "../../../shared/intercept_http";

@Component({
    moduleId: module.id,
    selector: 'datail-of-operation',
    templateUrl: 'detail_of_operation.html'
})
export class DetailOfOperation implements OnInit {

    trNo: number;
    conName: string;
    requestDate: Date;
    followTrademarks: Page<FollowTrademark> = new Page<FollowTrademark>();
    category: Category = new Category();
    steps: Array<StepForShow> = new Array<StepForShow>();
    isComplete: boolean = false;

    constructor(private http: InterceptHttp, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(): void {
        this.findTrademark();
    }

    findTrademark(): void {
        this.isComplete = false;
        this.route.params.forEach((params: Params) => {
            this.trNo = params['trNo'];
        });
        let params = new URLSearchParams();
        params.set("trNo", this.trNo.toString());
        this.http.get('/api/follow-trademark/search-by-trno', {search: params})
            .map(data => <Page<FollowTrademark>>data.json())
            .subscribe(data => {
                if (data.content.length == 0) {
                    let url = ['follow/trademark']
                    this.router.navigate(url);
                    return;
                }
                this.followTrademarks = data;
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.getCategory(data.content[0].actId);
                this.isComplete = true;
                let params = new URLSearchParams();
                params.set('trNo', this.trNo.toString());
                this.http.get('/api/follow-trademark/is-status-r', {search: params}).subscribe(data => {
                    console.log('data------------->', +data.json());
                    if (data.json()) {
                        let redirectToUrl = ['follow/trademark'];
                        this.router.navigate(redirectToUrl);
                    }
                });
            });
    }

    getCategory(actId: string): void {
        let params = new URLSearchParams();
        params.set("description", "คำขอจดทะเบียนเครื่องหมายการค้า");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', {search: params})
            .map(data => data.json()) .subscribe(data => {
            this.category = data.content[0];
            this.getStepByCategory(this.category.id);
        });
    }

    private getStepByCategory(value: number): void {
        let params = new URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', {search: params})
            .map(data => <Page<Step>>data.json())
            .subscribe(data => {
                this.setStepForShow(data.content);
            });
    }

    setStepForShow(step: Array<Step>): void {
        let sizeOfTrademark: number = this.followTrademarks.content.length;
        for (let i = 0; i < step.length; i++) {
            let stepForShow: StepForShow = new StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (let j = 0; j < sizeOfTrademark; j++) {
                if (step[i].statusCode == this.followTrademarks.content[j].stepCode) {
                    stepForShow.personName = this.followTrademarks.content[j].personName;
                    stepForShow.receiptDate = this.followTrademarks.content[j].receiptDate;
                    stepForShow.successDate = this.followTrademarks.content[j].successDate;
                    stepForShow.status = this.followTrademarks.content[j].processStatus;
                    stepForShow.useDuration = this.followTrademarks.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    }

    findStepDescByStepCode(stepCode: string): string {
        let stepDesc: string = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('201' == stepCode) {
            stepDesc = 'ตรวจสอบเครื่องหมาย';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('301' == stepCode) {
            stepDesc = 'จัดทำหนังสือประกาศโฆษณา';
        }
        else if ('304' == stepCode) {
            stepDesc = 'ประกาศโฆษณา';
        }
        else if ('307' == stepCode) {
            stepDesc = 'ออกหนังสือแจ้งให้ผู้ขอ ชำระค่าธรรมเนียมการจดทะเบียน';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือสำคัญแสดงการจดทะเบียน';
        }
        return stepDesc;
    }

    back() {
        window.history.back();
    }
}
