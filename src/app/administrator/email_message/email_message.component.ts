import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {Page} from "../../shared/page";
import {EmailMessageConf} from "./email_message";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var jQuery:any;
/**
 * Created by best on 16/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'email-message',
    templateUrl: 'email_message.html'
})
export class EmailMessageComponent implements OnInit {

    emailMessages:Page<EmailMessageConf> = new Page<EmailMessageConf>();
    emailMessage:EmailMessageConf = new EmailMessageConf();
    deleteId:number;
    @ViewChild('confirm_delete') confirmDeleteModal:ElementRef
    private currentPage:number = 0;
    private pageSize:number = 10;

    ngOnInit():void {
        this.emailMessage = new EmailMessageConf();
        this.emailMessage.type = '';
        this.get();
    }

    constructor(private http:Http, public toastr:ToastsManager) {

    }

    clickMapText(value:any) {
        this.emailMessage.text = value;
    }

    save():void {
        this.http.post('/api/email-message-setting', this.emailMessage).subscribe(data=> {
            this.toastr.success('บันทุกข้อมูลสำเร็จ');
            this.get();
        });
    }

    get():void {
        this.http.get('/api/email-message-setting')
            .map(data=>data.json() as Page<EmailMessageConf>)
            .subscribe(data=> {
                this.emailMessages = data;
            });
    }

    edit(value:EmailMessageConf):void {
        this.emailMessage = value;
    }

    clickDelete(value:EmailMessageConf):void {
        this.deleteId = value.id;
        jQuery(this.confirmDeleteModal.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
        console.log(value.id);
    }

    delete():void {
        let params = new URLSearchParams();
        params.set('id', this.deleteId + "" || null);
        this.http.delete('/api/email-message-setting', {search: params}).subscribe(data=> {
            this.toastr.info('ลบข้อมูลสำเร็จ');
            this.get();
        });
    };

    clear():void {
        this.emailMessage = new EmailMessageConf();
        this.emailMessage.type = '';
    }
}