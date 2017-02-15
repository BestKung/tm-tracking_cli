/**
 * Created by best on 29/11/2559.
 */
import {Component, OnInit} from "@angular/core";
import {ManageStopDuration} from "./manage_stop_duration";
import {Page} from "../../shared/page";
import {Http} from "@angular/http";
import {PageEvent} from "../../shared/paging/page_event";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {ToastsManager, Toast} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: 'manage-stop-duration',
    templateUrl: 'manage_stop_duration.html'
})
export class ManageStopDurationComponent implements OnInit {

    pageData: Page<ManageStopDuration> = new Page<ManageStopDuration>();
    manageStopDuration: ManageStopDuration = new ManageStopDuration();
    private currentPage: number = 0;
    private pageSize: number = 10;

    constructor(public http: Http, public toastr: ToastsManager) {

    }

    ngOnInit(): void {
        this.searchAction();
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        let params = new DateSupportURLSearchParams();
        params.set('sort', 'id,desc');
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get('/api/manage-stop-duration', {search: params})
            .map(data=> data.json() as Page<ManageStopDuration>)
            .subscribe(data=>this.pageData = data);
    }

    save(): void {
        this.manageStopDuration.createDate = new Date();
        this.http.post('/api/manage-stop-duration', this.manageStopDuration)
            .subscribe(data=> {
                this.manageStopDuration = new ManageStopDuration();
                this.toastr.success('บันทึกข้อมูลสำเร็จ')
                this.searchAction();
            })
    }

}