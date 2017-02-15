import {Component, OnInit} from "@angular/core";
import {ChangeOperationalDetail} from "./change_operational_detail";
import {ActivatedRoute, Params} from "@angular/router";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../../shared/page";
import {FollowChange} from "../follow_change";
import {Category} from "../../../shared/category";
import {Step} from "../../../administrator/effectivedate_act_facilitate/step";
import {StepForShow} from "../../../shared/step_for_show";
import {InterceptHttp} from "../../../shared/intercept_http";

@Component({
    moduleId: module.id,
    selector: 'change-operational-detail',
    templateUrl: 'change_operational_detail.html'
})
export class ChangeOperationalDetailComponent implements OnInit {
    trNo: number;
    conName: string;
    requestDate: Date;
    changes: Page<FollowChange> = new Page<FollowChange>();
    categorys: Page<Category> = new Page<Category>();
    steps: Array<StepForShow> = new Array<StepForShow>();
    isComplete: boolean = false;

    constructor(private http: InterceptHttp, private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.findChange();
    }

    findChange() {
        this.route.params.forEach((params: Params) => {
            this.trNo = params['trNo'];
        });
        this.isComplete = false;
        let params = new URLSearchParams();
        params.set('trNo', this.trNo.toString());
        this.http.get('/api/follow-change/search-by-trno', {search: params})
            .map(data => <Page<FollowChange>>data.json())
            .subscribe(data => {
                this.changes = data;
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.getCategory(data.content[0].actId);
                this.isComplete = true;
            });
    }

    getCategory(actId: string): void {
        let params = new URLSearchParams();
        params.set("description", "คำขอเเก้ไขเปลี่ยนเเปลงรายการจดทะเบียน");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', {search: params})
            .map(data => data.json()) .subscribe(data => {
            this.categorys = data.content[0];
            this.getStepByCategory(data.content[0].id);
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
        let sizeOfChanges: number = this.changes.content.length;
        for (let i = 0; i < step.length; i++) {
            let stepForShow: StepForShow = new StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (let j = 0; j < sizeOfChanges; j++) {
                console.log(this.changes.content[j].stepCode);
                if (step[i].statusCode == this.changes.content[j].stepCode) {
                    stepForShow.personName = this.changes.content[j].personName;
                    stepForShow.receiptDate = this.changes.content[j].receiptDate;
                    stepForShow.successDate = this.changes.content[j].successDate;
                    stepForShow.status = this.changes.content[j].processStatus;
                    stepForShow.useDuration = this.changes.content[j].useDuration;
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
        else if ('202' == stepCode) {
            stepDesc = 'การพิจารณาตรวจสอบเครื่องหมาย';
        }
        return stepDesc;
    }

    private black(): void {
        window.history.back();
    }
}
