/**
 * Created by neng on 3/9/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Params, ActivatedRoute} from "@angular/router";
import {Http, URLSearchParams} from "@angular/http";
import {CancelRegistrationTracking} from "../../../model/cancel-registration-tracking";
import {DateSupportURLSearchParams} from "../../../shared/date-support-url-search-params";
import {Page} from "../../../shared/page";
import {StepForShow} from "../../../shared/step_for_show";
import {Category} from "../../../shared/category";
import {FollowCancelRegisteration} from "../follow_cancel_registeration";
import {Step} from "../../../administrator/effectivedate_act_facilitate/step";
@Component({
    moduleId: module.id,
    selector: "cancel-operation-details",
    templateUrl: "cancel_operation_details.html"
})

export class CancelOperationDetailsComponent implements OnInit {

    trNo:string;
    categorys:Page<Category> = new Page<Category>();
    steps:Array<StepForShow> = new Array<StepForShow>();
    approve:Page<FollowCancelRegisteration> = new Page<FollowCancelRegisteration>();
    conName:string;
    requestDate:Date;
    isComplete:boolean = false;


    constructor(private http:Http, private route:ActivatedRoute) {

    }

    ngOnInit():void {
        this.findCancel();
    }

    findCancel():void {
        this.isComplete = false;
        this.route.params.forEach((params:Params)=> {
            this.trNo = params['trNo'];
        })
        let params = new URLSearchParams();
        params.set('trNo', this.trNo);
        this.http.get('/api/follow-cancel-registration/get-by-trno', {search: params})
            .map(data=><Page<FollowCancelRegisteration>>data.json())
            .subscribe(data=> {
                this.approve = data;
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.getCategory(data.content[0].actId);
                this.isComplete = true;
            });
    }

    getCategory(actId:string):void {
        let params = new URLSearchParams();
        params.set("description", "คำขอให้เพิกถอนการจดทะเบียน");
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
        let sizeOfChanges:number = this.approve.content.length;
        for (let i = 0; i < step.length; i++) {
            let stepForShow:StepForShow = new StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (let j = 0; j < sizeOfChanges; j++) {
                console.log(this.approve.content[j].stepCode);
                if (step[i].statusCode == this.approve.content[j].stepCode) {
                    stepForShow.personName = this.approve.content[j].personName;
                    stepForShow.receiptDate = this.approve.content[j].receiptDate;
                    stepForShow.successDate = this.approve.content[j].successDate;
                    stepForShow.status = this.approve.content[j].processStatus;
                    stepForShow.useDuration = this.approve.content[j].useDuration;
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
        return stepDesc;
    }

    black():void {
        window.history.back();
    }
}
