import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Http, URLSearchParams} from "@angular/http";
import {InformMessage} from "./inform_message";
import {Page} from "../../shared/page";
import {PageEvent} from "../../shared/paging/page_event";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
declare var jQuery:any;

/**
 * Created by best on 19/10/2559.
 */
@Component({
    moduleId: module.id,
    selector: 'inform-message',
    templateUrl: 'inform_message.html'
})
export class InformMessageComponent implements OnInit {
    informMessage:InformMessage = new InformMessage();
    pageData:Page<InformMessage> = new Page<InformMessage>();
    deleteId:string;
    @ViewChild('confirm_delete')
    confirmDelete:ElementRef;
    currentPage:number = 0;
    pageSize:number = 10;

    constructor(private http:Http, public toastr:ToastsManager) {

    }

    ngOnInit():void {
        this.searchAction();
    }

    searchAction(pageEvent:PageEvent = {currentPage: 1, pageSize: 10}):void {
        this.currentPage = pageEvent.currentPage-1;
        this.pageSize = pageEvent.pageSize;
        let params = new URLSearchParams();
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        params.set("sort",'id,desc');
        this.http.get('/api/message-print-inform', {search: params})
            .map(data=>data.json() as Page<InformMessage>)
            .subscribe(data=> {
                this.pageData = data;
                console.log(data)
            });
    }

    save():void {
        this.http.post('/api/message-print-inform', this.informMessage).subscribe(data=> {
            this.toastr.success('บันทึกข้อมูลสำเร็จ');
            this.searchAction();
            this.clear();
        });
    }

    clickUpdate(value:any):void {
        this.informMessage = value;
    }

    clickDelete(value:any):void {
        this.deleteId = value.id + '';
        jQuery(this.confirmDelete.nativeElement).modal({observeChanges: false}).modal({closable: false}).modal('toggle');
    }

    delete():void {
        let params = new URLSearchParams();
        params.set('id', this.deleteId || null);
        this.http.delete('/api/message-print-inform', {search: params}).subscribe(data=> {
            this.toastr.info('ลบข้อมูลสำเร็จ');
            this.searchAction();
        });
    }

    clear():void {
        this.informMessage = new InformMessage();
    }
}