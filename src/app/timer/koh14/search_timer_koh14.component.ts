/**
 * Created by neng on 2/8/17.
 */
import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {InterceptHttp} from "../../shared/intercept_http";
import {Page} from "../../shared/page";
import {VK14, StopDurationK} from "./v_k14";
import {DateSupportURLSearchParams} from "../../shared/date-support-url-search-params";
import {PageEvent} from "../../shared/paging/page_event";
import {SearchVK14} from "./search_vk14";
import {ToastsManager} from "ng2-toastr/ng2-toastr";
@Component({
    moduleId: module.id,
    selector: "search-timer-koh14",
    templateUrl: "search_timer_koh14.html"
})
export class SearchTimerKoh14Component implements OnInit {

    private officers: string[] = []
    private filteredOfficers: string[] = [];
    pageData: Page<VK14> = new Page<VK14>();
    private currentPage: number = 0;
    private pageSize: number = 10;
    searchVK14: SearchVK14 = new SearchVK14();

    constructor(private http: InterceptHttp,public toastr:ToastsManager) {

    }

    ngOnInit(): void {
        this.loadOfficerFromServer();
        this.searchVK14.status = '';
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

    searchAction(pageEvent: PageEvent = {currentPage: 1, pageSize: 10}): void {
        this.currentPage = pageEvent.currentPage - 1;
        this.pageSize = pageEvent.pageSize;
        let params = new DateSupportURLSearchParams();
        params.set("trNo", this.searchVK14.trNo);
        params.set("status", this.searchVK14.status);
        params.set("start", this.searchVK14.start);
        params.set("end", this.searchVK14.end);
        params.set("page", "" + (pageEvent.currentPage - 1));
        params.set("size", "" + pageEvent.pageSize);
        this.http.get("/api/k14", {search: params})
            .map(data => data.json() as Page<VK14>)
            .subscribe(data => {
                this.pageData = data;
            });
    }

    handleDropdownClick() {
        this.filteredOfficers = [];
         setTimeout(() => {
            this.filteredOfficers = this.officers;
        }, 100)
    }

    clickStopDuration(trNo: number, kId: number): void {
        let data = {trNo: trNo, kId: kId};
        this.http.post("/api/k14/stop", data).subscribe(data => {
            console.log('save success');
            let pageEvent: PageEvent = {currentPage: this.currentPage + 1, pageSize: this.pageSize};
            this.toastr.success('หยุดเวลาเเล้ว');
            this.searchAction(pageEvent);
        });
    }

    clickStartDuration(data: VK14): void {
        this.http.post("/api/k14/start", this.setStopDurationK(data)).subscribe(data => {
            console.log('start success');
            let pageEvent: PageEvent = {currentPage: this.currentPage + 1, pageSize: this.pageSize};
            this.toastr.success('เริ่มนับเวลาเเล้ว');
            this.searchAction(pageEvent);
        });
    }

    clickSuccess(data: VK14): void {
         this.http.post("/api/k14/success", this.setStopDurationK(data)).subscribe(data => {
            console.log('start success');
            let pageEvent: PageEvent = {currentPage: this.currentPage + 1, pageSize: this.pageSize};
            this.toastr.success('บันทึกข้อมูลเเล้ว');
            this.searchAction(pageEvent);
        });
    }

    isStopDuration(stopDurationK: StopDurationK): boolean {
        if (stopDurationK) {
            return stopDurationK.flagStart == 'stop' ? true : false;
        }
        else {
            return false;
        }
    }

    clear() {
        this.searchVK14 = new SearchVK14();
        this.searchAction();
    }

    setStopDurationK(vk14: VK14): StopDurationK {
        let k = new StopDurationK();
        k.flagStart = vk14.flagStart;
        k.formType = vk14.formType;
        k.id = vk14.stopDurationKId;
        k.kId = vk14.id;
        k.numberOfDuration = vk14.numberOfDuration;
        k.startDate = vk14.startDate;
        k.stopDate = vk14.stopDate;
        k.totalDate = vk14.totalDate;
        k.trNo = vk14.trNo;
        return k;
    }
}