import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {Http, URLSearchParams} from "@angular/http";
import {Category} from "../../../shared/category";
import {StepForShow} from "../../../shared/step_for_show";
import {Page} from "../../../shared/page";
import {FollowRenew} from "../follow_renew";
import {Step} from "../../../administrator/effectivedate_act_facilitate/step";

@Component({
    moduleId: module.id,
    selector: 'renew-operational-detail',
    templateUrl: 'renew_operational_detail.html'
})
export class RenewOperationalDetailComponent implements OnInit {
    trNo:string;
    conName:string;
    requestDate:Date;
    categorys:Page<Category> = new Page<Category>();
    steps:Array<StepForShow> = new Array<StepForShow>();
    renew:Page<FollowRenew> = new Page<FollowRenew>();
    isComplete:boolean = false;

    constructor(private http:Http, private route:ActivatedRoute) {

    }

    ngOnInit():void {
        this.findRenew();
    }

    findRenew():void {
        this.isComplete = false;
        this.route.params.forEach((params:Params)=> {
            this.trNo = params['trNo'];
        })
        let params = new URLSearchParams();
        params.set('trNo', this.trNo);
        this.http.get('/api/follow-renew/search-by-trno', {search: params})
            .map(data=><Page<FollowRenew>>data.json())
            .subscribe(data=> {
                this.renew = data;
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.getCategory(data.content[0].actId);
                this.isComplete = true;
            });
    }

    getCategory(actId:string):void {
        let params = new URLSearchParams();
        params.set("description", "คำขอต่ออายุการจดทะเบียน");
        params.set("actId", actId.toString());
        this.http.get('/api/category/get-by-description-and-act-id', {search: params})
            .map(data=>data.json()) .subscribe(data=> {
            this.categorys = data.content[0];
            this.getStepByCategory(data.content[0].id);
        });
    }

    private getStepByCategory(value:number):void {
        let params = new URLSearchParams();
        params.set("categoryId", value.toString() || "");
        this.http.get('/api/step/search-by-category', {search: params})
            .map(data=><Page<Step>>data.json())
            .subscribe(data=> {
                this.setStepForShow(data.content);
            });
    }

    setStepForShow(step:Array<Step>):void {
        let sizeOfRenew:number = this.renew.content.length;
        for (let i = 0; i < step.length; i++) {
            let stepForShow:StepForShow = new StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (let j = 0; j < sizeOfRenew; j++) {
                console.log(this.renew.content[j].stepCode);
                if (step[i].statusCode == this.renew.content[j].stepCode) {
                    stepForShow.personName = this.renew.content[j].personName;
                    stepForShow.receiptDate = this.renew.content[j].receiptDate;
                    stepForShow.successDate = this.renew.content[j].successDate;
                    stepForShow.status = this.renew.content[j].processStatus;
                    stepForShow.useDuration = this.renew.content[j].useDuration;
                    break;
                }
            }
            this.steps.push(stepForShow);
        }
    }

    findStepDescByStepCode(stepCode:string):string {
        let stepDesc:string = '';
        if ('101' == stepCode) {
            stepDesc = 'ตรวจสอบเอกสารรับคำขอ';
        }
        else if ('202' == stepCode) {
            stepDesc = 'นายทะเบียนพิจารณา';
        }
        else if ('308' == stepCode) {
            stepDesc = 'ออกหนังสือสำคัญแสดงการจดทะเบียน';
        }
        return stepDesc;
    }

    black():void {
        window.history.back();
    }
}
