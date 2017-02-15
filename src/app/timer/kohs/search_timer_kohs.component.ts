/**
 * Created by neng on 2/8/17.
 */
import {Component, OnInit} from "@angular/core";
import {SelectItem} from 'primeng/primeng';
import {InterceptHttp} from "../../shared/intercept_http";
import {Page} from "../../shared/page";
import {StopDurationK} from "./stop_duration_k";
import {PageEvent} from "../../shared/paging/page_event";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {SearchK} from "./search_k";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: "search-timer-kohs",
    templateUrl: "search_timer_kohs.html"
})
export class SearchTimerKohsComponent implements OnInit {

    private officers: string[] = []
    private filteredOfficers: string[] = [];
    private selectedOfficer: string;
    pageData: Page<StopDurationK> = new Page<StopDurationK>();
    private currentPage: number = 0;
    private pageSize: number = 10;
    search:SearchK = new SearchK();

    constructor(private http: InterceptHttp,public toastr:ToastsManager) {

    }

    ngOnInit(): void {
        this.search.formTypeStop = "";
        this.loadOfficerFromServer();
        this.searchAction();
    }

    filterOfficers(event) {
        this.filteredOfficers = [];
        for (let i = 0; i < this.officers.length; i++) {
            let selectedOfficer = this.officers[i];
            if (selectedOfficer.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredOfficers.push(selectedOfficer);
            }
        }
    }

    loadOfficerFromServer() {

        this.http.get("/api/officer/timer-koh14")
            .map(resp => resp.json())
            .subscribe(resp => {
                this.officers = resp;
            });
    }

    handleDropdownClick() {
        this.filteredOfficers = [];
        //mimic remote call
        setTimeout(() => {
            this.filteredOfficers = this.officers;
        }, 100)
    }

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}) {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new DateSupportURLSearchParams();
        params.set("trNo",this.search.trNo);
        params.set("formType",this.search.formTypeStop);
        params.set("start",this.search.start);
        params.set("end",this.search.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get("/api/stop-duration-k", {search : params})
            .map(data => data.json() as Page<StopDurationK>)
            .subscribe(data => this.pageData = data);
    }

    clickStart(stopDurationK:StopDurationK):void{
        this.http.post('/api/stop-duration-k/start' , stopDurationK).subscribe(data=>{
           let pageEvent: PageEvent = {currentPage: this.currentPage+1, pageSize: this.pageSize};
            this.toastr.success('เริ่มนับเวลาเเล้ว');
            this.searchAction(pageEvent);
        });
    }

    clear(){
        this.search = new SearchK();
        this.searchAction();
    }
}