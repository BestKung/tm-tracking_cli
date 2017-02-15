/**
 * Created by best on 1/10/2559.
 */
import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {Page} from "../../shared/page";
import {Act} from "../model/act";
import {Observable} from "rxjs/Rx";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
import * as moment from "moment";
@Component({
    moduleId: module.id,
    selector: 'manage-act',
    templateUrl: 'manage_act.html'
})
export class ManageAct implements OnInit {

    acts:Page<Act> = new Page<Act>();

    actId:string = '';

    constructor(private http:Http, public toastr:ToastsManager) {

    }

    ngOnInit():void {
        this.getAct();
    }

    getAct():void {
        let actObserv:Observable<Page<Act>>;
        actObserv = this.http.get('/api/act/get').map(data=><Page<Act>>data.json());
        actObserv.subscribe(data=> {
            for (let i = 0; i < data.content.length; i++) {
                data.content[i].actDate = moment(data.content[i].actDate as string, 'YYYY-MM-DD').toDate()

            }
            this.acts = data;
        });
    }

    saveAct(act:Act):void {
        this.actId = act.actId;
        this.http.post('/api/act/save', act).subscribe(data=> {
            this.toastr.success('บันทึกข้อมูลสำเร็จ');
            this.getAct();
        });
    }
}
