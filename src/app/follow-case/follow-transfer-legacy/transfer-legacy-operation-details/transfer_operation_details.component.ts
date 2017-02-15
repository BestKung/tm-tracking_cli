import {Component, OnInit} from "@angular/core";
import {TransferOperationalDetail} from "./transfer_operational_detail";
import {ActivatedRoute, Params} from "@angular/router";
import {Http, URLSearchParams} from "@angular/http";
import {FollowTranfer} from "../follow_tranfer";
import {Page} from "../../../shared/page";
import {StepForShow} from "../../../shared/step_for_show";
import {Step} from "../../../administrator/effectivedate_act_facilitate/step";
import {Category} from "../../../shared/category";

@Component({
    moduleId: module.id,
    selector: 'transfer-operational-detail',
    templateUrl: 'transfer_operational_detail.html'
})
export class TransferOperationalDetailComponent implements OnInit {
    trNo:string;
    conName:string;
    requestDate:Date;
    followTranfers:Page<FollowTranfer> = new Page<FollowTranfer>();
    categorys:Page<Category> = new Page<Category>();
    steps:Array<StepForShow> = new Array<StepForShow>();
    isComplete:boolean = false;

    constructor(private http:Http, private route:ActivatedRoute) {

    }

    ngOnInit():void {
        this.findTranfer();
    }

    findTranfer():void {
        this.route.params.forEach((params:Params) => {
            this.trNo = params['trNo'];
        });
        this.isComplete = false;
        let params = new URLSearchParams();
        params.set('trNo', this.trNo);
        this.http.get('/api/follow-tranfer/search-by-trno', {search: params})
            .map(data=><Page<FollowTranfer>>data.json())
            .subscribe(data=> {
                this.followTranfers = data;
                this.getCategory(data.content[0].actId);
                this.conName = data.content[0].conName;
                this.requestDate = data.content[0].requestDate;
                this.isComplete = true;
            });
    }

    getCategory(actId:string):void {
        let params = new URLSearchParams();
        params.set("description", "คำขอโอนหรือรับมรดกสิทธิ");
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
        let sizeOfChanges:number = this.followTranfers.content.length;
        for (let i = 0; i < step.length; i++) {
            let stepForShow:StepForShow = new StepForShow();
            stepForShow.stepProcess = step[i].statusCode;
            stepForShow.duration = step[i].totalDuration;
            stepForShow.durationType = step[i].durationType;
            for (let j = 0; j < sizeOfChanges; j++) {
                console.log(this.followTranfers.content[j].stepCode);
                if (step[i].statusCode == this.followTranfers.content[j].stepCode) {
                    stepForShow.personName = this.followTranfers.content[j].personName;
                    stepForShow.receiptDate = this.followTranfers.content[j].receiptDate;
                    stepForShow.successDate = this.followTranfers.content[j].successDate;
                    stepForShow.status = this.followTranfers.content[j].processStatus;
                    stepForShow.useDuration = this.followTranfers.content[j].useDuration;
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
            stepDesc = 'ออกหนังสือแสดงรายการการโอนหรือรับมรดก';
        }
        return stepDesc;
    }

    private black():void {
        window.history.back();
    }
}
