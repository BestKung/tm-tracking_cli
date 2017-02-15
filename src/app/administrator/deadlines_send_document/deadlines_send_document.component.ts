import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {DeadlineSendDocumentSetting} from "./deadline_send_document_setting";
import {Observable} from "rxjs/Rx";
import {Page} from "../../shared/page";
import {Act} from "../model/act";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: 'deadlines-send-document',
    templateUrl: 'deadlines_send_document.html'
})
export class DeadlinesSendDocument implements OnInit {

    deadLineDoc:DeadlineSendDocumentSetting = new DeadlineSendDocumentSetting();

    deadlinesSendDocuments:Page<DeadlineSendDocumentSetting> = new Page<DeadlineSendDocumentSetting>();
    acts:Page<Act> = new Page<Act>();

    constructor(private http:Http, public toastr:ToastsManager) {

    }

    ngOnInit():void {
        this.getDeadlinesSendDocument();
        this.getAct();
        this.deadLineDoc.act.actId = '';
    }

    private save() {
        this.http.post('/api/administrator/deadline-send-document/save', this.deadLineDoc).subscribe(data=> {
            this.getDeadlinesSendDocument();
            this.toastr.success('บันทึกข้อมูลสำเร็จ');
            this.clearData();
        });
    }

    private getDeadlinesSendDocument() {
        let response:Observable<Page<DeadlineSendDocumentSetting>>;
        response = this.http.get('/api/administrator/deadline-send-document/get').map(data=><Page<DeadlineSendDocumentSetting>>data.json());
        response.subscribe(data=>this.deadlinesSendDocuments = data);
    }

    private getAct() {
        let response:Observable<Page<Act>>;
        response = this.http.get('/api/act/get').map(data=><Page<Act>>data.json());
        response.subscribe(data=>this.acts = data);
    }

    clickUpdate(value) {
        console.log(value);
        this.deadLineDoc = value;
        this.deadLineDoc.act = new Act();
        this.deadLineDoc.act.actId = value.actId
        this.deadLineDoc.act.actDate = value.actDate;
    }

    private delete(value) {
        this.http.post('/api/administrator/deadline-send-document/delete', value).subscribe(data=>this.getDeadlinesSendDocument());
    }

    private clearData() {
        this.deadLineDoc = new DeadlineSendDocumentSetting();
    }

    test(value:any) {
        console.log(value);
    }

}
